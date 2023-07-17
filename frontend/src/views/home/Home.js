import React from "react";
import { SideBar } from "../../components/navigation/SideBar";
import { AppHeader } from "../../components/navigation/Header";
import { Dashboard } from "../../components/body/Dashboard";
import { Flex } from "@mantine/core";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function Home() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const user = useSelector((state) => state.login.user);
  return (
    <>
      {!loggedIn ? (
        <Navigate to={"/login"} />
      ) : (
        <div className="App">
          <AppHeader active={"Home"} />
          <Flex>
            <SideBar active={"Home"} />
            <Dashboard user={user} />
          </Flex>
        </div>
      )}
    </>
  );
}
