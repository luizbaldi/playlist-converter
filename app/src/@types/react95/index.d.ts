declare module 'react95' {
  import { ReactNode, FunctionComponent } from 'react';

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
  export const Window: FunctionComponent<{
    style?: object;
    shadow?: boolean;
    className?: string;
    children?: ReactNode;
  }>;

  export const WindowHeader: FunctionComponent<{
    className?: string;
    style?: object;
    children?: ReactNode;
  }>;

  export const WindowContent: FunctionComponent<{
    className?: string;
    style?: object;
    children?: ReactNode;
  }>;

  export const Cutout: FunctionComponent<{
    style?: object;
    shadow?: boolean;
    className?: string;
    children?: ReactNode;
  }>;

  export const Button: FunctionComponent<{
    children: ReactNode;
    type?: string;
    onClick?: () => void;
    style?: object;
    disabled?: boolean;
    fullWidth?: boolean;
    size?: 'sm' | 'md' | 'lg';
    square?: boolean;
    active?: boolean;
    variant?: 'default' | 'menu' | 'flat';
    className?: string;
  }>;

  export const List: FunctionComponent<{
    className?: string;
    style?: object;
    fullWidth?: boolean;
    inline?: boolean;
    shadow?: boolean;
    children?: ReactNode;
    verticalAlign?: 'top' | 'bottom';
    horizontalAlign?: 'left' | 'right';
    onClick?: () => void;
  }>;

  export const ListItem: FunctionComponent<{
    className?: string;
    style?: object;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    square?: boolean;
    children?: ReactNode;
    onClick?: () => void;
  }>;
}
