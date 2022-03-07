import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loader } from "../components";
import { useUser } from "../context";

const Error = lazy(() => import("../components/HelperComponents/Error"));
const Logout = lazy(() => import("../components/HelperComponents/Logout"));
const Login = lazy(() => import("../pages/Login"));
const Gallery = lazy(() => import("../pages/Gallery"));

const AppRoutes = () => {
  const { user } = useUser();

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={!user.email ? <Login /> : <Gallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
