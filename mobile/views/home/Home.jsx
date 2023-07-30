import { StyleSheet, View, StatusBar } from "react-native";
import React from "react";
import Header from "../components/Header";
import { Card, Text } from "react-native-paper";
const Home = () => {
  return (
    <View>
      <StatusBar backgroundColor={"#800080"} />
      <Header />
      <Card style={{ width: "96%", alignSelf: "center" }}>
        <Card.Content>
          <Text variant="titleLarge">Hello</Text>
          <Text variant="bodyMedium">Juma Josephat</Text>
        </Card.Content>
      </Card>
      <View></View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
