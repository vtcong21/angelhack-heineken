import React, { Fragment, Suspense } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Routing from "./routes";
import "./index.css"
function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            {Routing.map((route, index) => {
              const Layout = route.Layout === null ? Fragment : route.Layout;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            <Route
              path="*"
              element={
                <Fragment>
                  <h1>404</h1>
                </Fragment>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
