import React, { useEffect, useContext, Fragment } from "react";

import shopcontext from "../../context/ShopContext";

import AdminBar from "./admin/AdminDrawer";

import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const { setAdminArea, adminArea } = useContext(shopcontext);
  const location = useLocation();

  let path = location.pathname.replace("/dashboard", "dashboard");

  useEffect(() => {
    switch (path) {
      case "dashboard":
        setAdminArea(true);
      default:
        break;
    }
  }, []);

  return <Fragment>{adminArea ? <AdminBar /> : null}</Fragment>;
}
