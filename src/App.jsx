import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routers/routes";

const App = () => {
  return (
    <div>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
