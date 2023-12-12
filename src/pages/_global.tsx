import { Theme } from '@mui/material/styles'

const GlobalStyles = (theme: Theme) => {
  return {
    ".MuiGrid-container.match-height .MuiCard-root": {
      height: "100%",
    },
    "#nprogress": {
      pointerEvents: "none",
      "& .bar": {
        left: 0,
        top: 0,
        height: 3,
        width: "100%",
        zIndex: 2000,
        position: "fixed",
        backgroundColor: theme.palette.primary.main
      },
    },
  };
};

export default GlobalStyles;
