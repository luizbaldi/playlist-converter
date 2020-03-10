declare module 'react95' {
  import { ReactNode } from 'react';

  interface Theme {
    hatchedBackground: string;
    canvas: string;
    material: string;
    materialDark: string;
    borderDarkest: string;
    borderLightest: string;
    borderDark: string;
    borderLight: string;
    headerMaterialDark: string;
    headerMaterialLight: string;
    headerText: string;
    text: string;
    textInvert: string;
    textDisabled: string;
    textDisabledShadow: string;
    inputText: string;
    inputTextInvert: string;
    inputTextDisabled: string;
    inputTextDisabledShadow: string;
    tooltip: string;
    anchor: string;
    anchorVisited: string;
    hoverBackground: string;
    checkmark: string;
    progress: string;
    flatLight: string;
    flatDark: string;
  }

  interface Themes {
    default: Theme;
    water: Theme;
    coldGray: Theme;
    lilacRoseDark: Theme;
    violetDark: Theme;
  }

  /* common */
  export const reset: string;
  export const themes: Themes;

  /* components */
  export const Window: {
    shadow: string;
    className: string;
    children: ReactNode;
  };
}
