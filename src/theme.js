import { extendTheme } from "@chakra-ui/react";

const theme = {
  colors: {
    primary: {
      _default: "#00A2D9",
      dark: "#0079d1",
      primary: "#00A2D9",
      text: "#2B2B2B",
      lightRed: "#FFE1E2",
      lightGreen: "#DCF7E9",
      lightText: "#AAAAAA",
      green: "#0CB55A",
      light: "#EDFAFF",
      lightGray: "#DDDDDD",
      bg: "#FFFFFF",
      bgSecondary: "#f8fdff"
    },
    secondary: {
      _default: "#51a3a3",
      blue: "#52BFE4",
      lightBlue: "#EDFAFF",
      red: "#E02424",
      success: "#0CB55A",
      pending: "#EEBF1A",
      delete: "#E02424",
    },
    success: {
      _default: "#5ef38c",
    },
    error: {
      _default: "#BB342F",
    },
    dark: {
      _default: "#000000",
    },
    light: {
      _default: "#CFCCD6",
    },
    muted: {
      _default: "#d3d3d3",
      dark: "#3A3238",
      light: "gray.200",
    },
  },
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Montserrat, sans-serif",
  },

  textStyles: {
    h1: {
      fontSize: "36px",
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
  },
  components: {
    Drawer: {
      variants: {
        permanent: {},
      },
    },
  },
};

const dark = {
  colors: {
    primary: {
      _default: "#00A2D9",
      dark: "#0079d1",
      primary: "#00A2D9",
      text: "#2B2B2B",
      lightRed: "#FFE1E2",
      lightGreen: "#DCF7E9",
      lightText: "#AAAAAA",
      green: "#0CB55A",
      light: "#EDFAFF",
      lightGray: "#DDDDDD",
      bg: "#DDDDDD",
      bgSecondary: "#234653"
    },
    secondary: {
      _default: "#51a3a3",
      blue: "#52BFE4",
      lightBlue: "#EDFAFF",
      red: "#E02424",
      success: "#0CB55A",
      pending: "#EEBF1A",
      delete: "#E02424",
    },
    success: {
      _default: "#5ef38c",
    },
    error: {
      _default: "#BB342F",
    },
    dark: {
      _default: "#000000",
    },
    light: {
      _default: "#CFCCD6",
    },
    muted: {
      _default: "#d3d3d3",
      dark: "#3A3238",
      light: "gray.200",
    },
  },
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Montserrat, sans-serif",
  },

  textStyles: {
    h1: {
      fontSize: "36px",
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
  },
  components: {
    Drawer: {
      variants: {
        permanent: {},
      },
    },
  },
};

export const themeLight = extendTheme(theme);

export const themeDark = extendTheme(dark);
