import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenHeader from "../components/ScreenHeader";
import Form from "./Form";
const Add = () => {
  return (
    <View>
      <ScreenHeader screen={"Add Task"} />
      <Form />
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({});
