/**
 * Intelligent, low side-effect way to restore scroll position
 * @param elementSelector: A document.querySelector to the scroll element. Selector over ref b/c ref is unreliable.
 * The scroll element MUST have a fixed height (i.e. 100vh)
 *
 * - Depends on a router that sets window.history.state.key (react-router, reach-router, etc.).
 * - window.history.state.key is a unique history ID that is populated by popular routers (react-router, reach-router)
 * - This approach is imperfect, but "good-enough".
 */
import React from 'react';

import { indexedDBSupported, KeyValueStore } from '@app/util/dist/indexedDb';
import { waitForTruthy } from '@app/util/dist/async';

const envIsSupported = window.scrollTo && indexedDBSupported;

const keyValueStore: KeyValueStore =
  envIsSupported &&
  new KeyValueStore({
    dbName: 'useScrollRestore',
    tableName: 'historyIdToScrollUps',
    maxAge: 48 * 60 * 60 * 1000,
  });

const getElement = (selector: string) => document.querySelector(selector) as HTMLDivElement;

export function useScrollRestore(elementSelector: string) {
  const recall = React.useCallback(async () => {
    const historyKey = window.history.state?.key ?? 'entry'; // is null on first page view
    let element = getElement(elementSelector);
    // If element not yet available, wait for it or bail
    if (!element)
      element = await waitForTruthy(() => getElement(elementSelector), {
        interval: 50,
        timeout: 2000,
      });
    element.style.visibility = 'hidden';
    const next = (await keyValueStore.get<number>(historyKey)) ?? 0;

    // Sometimes the page may not be fully loaded. If so, retry setting scroll position
    // many times until success.
    let success = false;
    const set = () => {
      if (!success) {
        element.scrollTop = next;
        if (element.scrollTop === next) {
          success = true;
          element.style.visibility = 'visible';
        }
      }
    };
    const waitTime = 3000;
    for (let i = 0; i < waitTime; i += 50) setTimeout(set, i);
    setTimeout(() => {
      element.style.visibility = 'visible';
    }, waitTime);
  }, [elementSelector]);
  const save = React.useCallback(async () => {
    const element = document.querySelector(elementSelector) as HTMLDivElement;
    if (!element) {
      console.warn('useScrollRestore.save: Element not found');
      return;
    }
    const historyKey = window.history.state?.key ?? 'entry'; // is null on first page view
    const scrollTopNow = element.scrollTop;
    // If 0, don't save and remove stale saves here to reduce memory footprint
    if (scrollTopNow === 0) {
      const scrollTopLast = await keyValueStore.get<number>(historyKey);
      // if scrollTopLast, is stale and remove it
      if (scrollTopLast !== undefined) {
        await keyValueStore.remove(historyKey);
      }
      // else save
    } else {
      await keyValueStore.set(historyKey, element.scrollTop);
    }
  }, [elementSelector]);

  React.useEffect(() => {
    if (!envIsSupported) return;
    recall();
    const savePoller = setInterval(save, 400);
    window.addEventListener('popstate', recall);
    return () => {
      // Add delay to popstate b/c race condition
      setTimeout(() => {
        clearInterval(savePoller);
        window.removeEventListener('popstate', recall);
      }, 100);
    };
  }, [elementSelector, recall, save]);
}

// export function scrollToTop() {
//   scrollRestoreDb.set(getUrlHash(), 0);
//   scrollElement.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// }
