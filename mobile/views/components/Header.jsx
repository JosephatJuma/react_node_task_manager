import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
const Header = () => {
  const navigate = useNavigation();
  return (
    <Appbar.Header>
      <Appbar.Content title="Task Manager" />
      <Appbar.Action icon="magnify" />
      <Avatar.Image
        size={45}
        source={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn8oNuDl-XH0-Jk0iml47q2VlhsyQHmCTiFQ&usqp=CAU"
        }
      />
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({});
