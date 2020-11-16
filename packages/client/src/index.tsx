import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { ErrorBoundary } from "./layout/compounds/ErrorBoundary";
import LoadingLayout from "./layout/LoadingLayout";
import * as serviceWorker from "./serviceWorker";

const App = React.lazy(() => import("./App"));

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary showBack>
      <React.Suspense fallback={<LoadingLayout variant="outer" percentLoaded={1} />}>
        <App />
      </React.Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
