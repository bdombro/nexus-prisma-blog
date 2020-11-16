import React from "react";
import useMetaTags from "react-metatags-hook";
import { BrowserRouter } from "react-router-dom";

import PortalRoot from "./atoms/PortalRoot";
import LoadingLayout from "./layout/LoadingLayout";
import siteMeta from "./siteMeta";
import Providers from "./state";
const Routes = React.lazy(() => import("./routes"));

function App() {
  useMetaTags(siteMeta, []);
  return (
    <Providers>
      <BrowserRouter>
        <React.Suspense fallback={<LoadingLayout variant="outer" percentLoaded={33} />}>
          <PortalRoot />
          <Routes />
        </React.Suspense>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
