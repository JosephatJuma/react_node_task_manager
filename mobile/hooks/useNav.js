import React from "react";
import { useNavigation } from "@react-navigation/native";
export default function useNav() {
  const navigation = useNavigation();
  return navigation;
}
