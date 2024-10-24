import { Route, Routes } from "react-router-dom";
import routes from "./routers/routes";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <div id="container" className="w-full h-full bg-white">
      <Layout>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
