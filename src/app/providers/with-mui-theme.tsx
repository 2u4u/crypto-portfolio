import { createTheme, ThemeProvider } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const theme = createTheme({
  typography: {
    allVariants: {
      color: "var(--cp-text-color)",
      fontFamily: '"Montserrat", serif',
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.MuiButton-root": {
            textTransform: "none",
          },
          "&.MuiButton-containedPrimary": {
            backgroundColor: "var(--cp-blue)",
            color: "var(--cp-text-color)",
          },
          "&.MuiButton-containedPrimary.Mui-disabled": {
            opacity: "0.5",
            cursor: "not-allowed",
            backgroundColor: "var(--cp-blue)",
            color: "var(--cp-text-color)",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.MuiTab-textColorPrimary": {
            textTransform: "none",
            color: "var(--cp-grey-600)",
          },
          "&.MuiTab-textColorPrimary.Mui-selected": {
            color: "var(--cp-text-color)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--cp-grey-200)",
        },
        root: {
          color: "var(--cp-text-color)",
          borderColor: "var(--cp-text-color)",
          backgroundColor: "var(--cp-grey-200)",
          fontSize: "12px",
          "&:hover": {
            borderColor: "var(--cp-text-color)",
            backgroundColor: "transparent",
          },
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--cp-grey-400)",
            backgroundColor: "transparent",
          },
          "&.Mui-focused": {
            borderColor: "var(--cp-text-color)",
            backgroundColor: "transparent",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--cp-grey-200)",
            backgroundColor: "transparent",
            outlineColor: "var(--cp-grey-200)",
          },
          ".MuiOutlinedInput-input": {
            height: "1.5em",
            padding: "14px 14px",
          },
          ".MuiInputAdornment-positionStart": {
            marginRight: "-8px",
          },
          ".MuiInputAdornment-positionStart .MuiTypography-root": {
            color: "var(--cp-text-color)",
            fontSize: "12px",
          },
          "&.Mui-disabled .MuiInputAdornment-positionStart .MuiTypography-root":
            {
              opacity: "0.38",
              cursor: "not-allowed",
            },
          "&.Mui-disabled:hover": {
            backgroundColor: "var(--cp-grey-200)",
            cursor: "not-allowed",
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--cp-grey-200)",
          },
          "&.Mui-disabled:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--cp-grey-200)",
          },
          ".MuiOutlinedInput-input.Mui-disabled": {
            WebkitTextFillColor: "var(--cp-grey-400)",
            cursor: "not-allowed",
          },
          ".MuiOutlinedInput-input.Mui-disabled:hover": {
            borderColor: "var(--cp-grey-200)",
            outlineColor: "var(--cp-grey-200)",
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--cp-grey-200)",
          padding: "1px",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.MuiToggleButton-primary": {
            color: "var(--cp-text-color)",
            width: "100%",
            margin: "1px",
            border: "none",
            borderRadius: "4px",
            textTransform: "none",
            padding: "3px",
          },
          "&.MuiToggleButton-primary.Mui-selected": {
            backgroundColor: "var(--cp-grey-100)",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--cp-dark-grey)",
          color: "var(--cp-text-color)",
          borderColor: "var(--cp-grey-200)",
          "&.MuiTableCell-head": {
            fontSize: "12px",
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--cp-grey-200)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "var(--cp-text-color)",
        },
        root: {
          "&.MuiOutlinedInput-root": {
            color: "var(--cp-text-color)",
            borderColor: "var(--cp-text-color)",
            backgroundColor: "var(--cp-grey-200)",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
    },
  },
});

export const withMuitheme = (component: () => React.ReactNode) => () =>
  <ThemeProvider theme={theme}>{component()}</ThemeProvider>;
