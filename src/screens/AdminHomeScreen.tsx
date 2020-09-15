import React from "react";
import AdminContentScreen from "./AdminContentScreen";
import { Heading } from "@chakra-ui/core";

function AdminHomeScreen() {
  return (
    <AdminContentScreen title="Home" hideBackArrow>
      <Heading pt={10} pb={10}>
        Coming Soon
      </Heading>
    </AdminContentScreen>
  );
}

export default AdminHomeScreen;
