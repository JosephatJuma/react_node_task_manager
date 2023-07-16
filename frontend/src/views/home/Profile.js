import React from "react";
import { AppHeader } from "../../components/navigation/Header";
import { SideBar } from "../../components/navigation/SideBar";
import { Card, Flex } from "@mantine/core";
function Profile() {
  return (
    <div>
      <AppHeader active={"Profile"} />
      <Flex>
        <SideBar active={"Profile"} />
        <Card sx={{ width: "70%", margin: 20 }} radius={"lg"}></Card>
      </Flex>
    </div>
  );
}

export default Profile;
