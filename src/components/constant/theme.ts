/**
 * Config
 * -------------------------------------------------------------------------------------
 * ! IMPORTANT: Make sure you clear the browser local storage in order to see the config changes in the template.
 * ! To clear local storage, you may refer https://www.leadshook.com/help/how-to-clear-local-storage-in-google-chrome-browser/.
 */

// ** MUI Imports
import { Direction } from "@mui/material";
import {
  AppBar,
  Footer,
} from "./types";

type ThemeConfig = {
  appBar: AppBar;
  footer: Footer;
  navHidden: boolean;
  appBarBlur: boolean;
  direction: Direction;
  websiteName: string;
  navCollapsed: boolean;
  routingLoader: boolean;
  disableRipple: boolean;
  navigationSize: number;
  navSubItemIcon: string;
  menuTextTruncate: boolean;
  disableCustomizer: boolean;
  responsiveFontSizes: boolean;
  collapsedNavigationSize: number;
  horizontalMenuAnimation: boolean;

  toastPosition:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
};

const themeConfig: ThemeConfig = {
    // ** Layout Configs
    websiteName: "JWPharma" /* App Name */,
    direction: "ltr" /* ltr | rtl */,
    footer: "static" /* fixed | static | hidden */,

    // ** Routing Configs
    routingLoader: true /* true | false */,

    // ** Navigation (Menu) Configs
    navHidden: false /* true | false */,
    menuTextTruncate: true /* true | false */,
    navSubItemIcon: "mdi:circle-outline" /* Icon */,
    navCollapsed: false /* true | false /*! Note: This is for Vertical navigation menu only */,
    navigationSize: 260 /* Number in px(Pixels) /*! Note: This is for Vertical navigation menu only */,
    collapsedNavigationSize: 68 /* Number in px(Pixels) /*! Note: This is for Vertical navigation menu only */,

    // ** AppBar Configs
    appBar: "static" /* fixed | static | hidden /*! Note: hidden value will only work for Vertical Layout */,
    appBarBlur: true /* true | false */,

    // ** Other Configs
    responsiveFontSizes: true /* true | false */,
    disableRipple: false /* true | false */,
    disableCustomizer: false /* true | false */,
    toastPosition: "top-right" /* top-left | top-center | top-right | bottom-left | bottom-center | bottom-right */,
    horizontalMenuAnimation: false,
};

export default themeConfig;
