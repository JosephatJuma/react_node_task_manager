import React from "react";
import { SideBar } from "../../components/navigation/SideBar";
import { AppHeader } from "../../components/navigation/Header";
import { Dashboard } from "../../components/body/Dashboard";
import { Flex } from "@mantine/core";

export default function Home() {
  return (
    <div className="App">
      <AppHeader />
      <Flex>
        <SideBar />
        <Dashboard />
      </Flex>
    </div>
  );
}
