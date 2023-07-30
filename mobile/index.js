import { registerRootComponent } from "expo";

import App from "./App";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

const Application = () => {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
};
registerRootComponent(Application);
