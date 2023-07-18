import { useIsDarkMode } from "./hooks";

// This hook returns the colors object based on the user's prefarred colorScheme (Light / Dark)

const useColors = () => {
  let isDarkMode = useIsDarkMode();
  // the Color palette for the whole AP
  return {
    background: isDarkMode ? "#rgb(48, 51, 78)" : "#fff",
    backgroundDark: isDarkMode ? "rgb(48, 51, 78)" : "rgb(220, 220, 220)",
    white: isDarkMode ? "#424242" : "#FFFFFF",
    blackText: isDarkMode ? "#ffffff" : "#464646",
    whiteText: isDarkMode ? "#424242" : "#FFF",
    grayBack: isDarkMode ? "#424242" : "#eee",
    mediumGray: "#bdbdbd",
    primary: "#e38e16",
    // primary: "#e1b761",
    primaryDark: "#e29701",
    primaryLight: "#ffcc80",
    secondary: isDarkMode ? "#262626" : "rgb(200, 205, 200)",
    grayText: "#212121",
    lightGrayText: "#bdbdbd",
    success: "#009688",
    dark: "#616161",
    error: isDarkMode ? "#ef5350" : "#d32f2f",
    shadowColor: isDarkMode ? "#151515ba" : "#15151526",
    greenColor: "#1ca600",
    bgBox: isDarkMode ? "#2b2b2bc2" : "#ffffffc2",
    boxes: isDarkMode ? "rgb(48, 51, 78)" : "#fff",
    navColor: "rgba(227, 142, 22, 0.34)",
    tableBg: "rgba(255, 255, 255, 0.55)",
    Gray: "#6a6868",
  };
};

export default useColors;
