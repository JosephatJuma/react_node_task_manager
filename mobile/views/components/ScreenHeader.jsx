import React from "react";
import { Appbar } from "react-native-paper";
import useNav from "../../hooks/useNav";
const ScreenHeader = ({ screen }) => {
  const nav = useNav();
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => nav.goBack()} />
      <Appbar.Content title={screen} />
    </Appbar.Header>
  );
};

export default ScreenHeader;
