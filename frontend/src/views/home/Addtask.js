import React from "react";
import { AddTaskForm } from "../../components/body/AddTaskForm";
import { SideBar } from "../../components/navigation/SideBar";
import { AppHeader } from "../../components/navigation/Header";
import { Flex } from "@mantine/core";
export default function Addtask() {
  return (
    <div>
      <AppHeader active={"Add Task"} />
      <Flex>
        <SideBar active={"Add Task"} />
        <AddTaskForm />
      </Flex>
    </div>
  );
}
