import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      text: string;
      muted: string;
      border: string;
      primary: string;
      primaryHover: string;
      primaryText: string;
      secondary: string;
      focus: string;
    };
  }
}
