
import { useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

// pages
import { Home, Car, Login, Dashboard, DashboardAdmin } from "../pages";
import ProtectedAuthAdmin from "../auth/ProtectedAuth";
import HandleAfterLogin from "../auth/HandleAfterLogin";
import useUserInfoStore from "../stores/UserInfoStore";
import Register from "../pages/Register";
import DashboardMember from "../pages/DashboardMember";


export default function RouterPages() {

  const whoami = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        useUserInfoStore.setState({ name: response.data.data.name });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    whoami();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cars" element={<Car />}></Route>
        <Route path="/dashboard-member" element={<DashboardMember />}></Route>

        <Route path="/login" element={
          <HandleAfterLogin>
            <Login />
          </HandleAfterLogin>
        }></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/dashboard-admin"
          element={
            <ProtectedAuthAdmin>
              <DashboardAdmin />
            </ProtectedAuthAdmin>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedAuthAdmin>
              <Dashboard />
            </ProtectedAuthAdmin>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
