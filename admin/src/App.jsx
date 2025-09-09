/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./routes/PrivateRoute";
import routesConfig from "./routes/routesConfig";

const App = () => {
  return (
    <Routes>
      <Route
        element={
          <PrivateRoute roles={["admin"]}>
            <Layout />
          </PrivateRoute>
        }
      >
        {routesConfig.private.map(({ path, element: Component }, i) => (
          <Route key={i} path={path} element={<Component />} />
        ))}
      </Route>

      {routesConfig.public.map(({ path, element: Component }, i) => (
        <Route key={i} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default App;
