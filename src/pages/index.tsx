import React from "react";
import SharedLoginScreen from "../screens/SharedLoginScreen";

function AdminIndexPage() {
  return <SharedLoginScreen routeAfterLogin="/home" />;
}

export default AdminIndexPage;
