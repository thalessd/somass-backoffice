import { DefaultTheme } from "@chakra-ui/core";
import { theme } from "@chakra-ui/core";

export default <DefaultTheme>{
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      primary: "#00264B",
      secondary: "#0090FF",
      primaryDark: "#000f21",
      primaryDarkness: "#000317",
      lightGray: "#707070",
      darkGray: "#323232",
      darkenGrayBackground: "#111111",
    },
  },
};
