import type { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    background: '#f5f7f2', surface: '#ffffff', text: '#253126', muted: '#687469',
    border: '#dce4d9', primary: '#3f6948', primaryHover: '#315539', primaryText: '#ffffff',
    secondary: '#e5eee3', focus: '#86ad75',
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    background: '#19221b', surface: '#253027', text: '#edf4ec', muted: '#adbaad',
    border: '#405043', primary: '#a6cca8', primaryHover: '#c2e0c3', primaryText: '#1b301f',
    secondary: '#35483a', focus: '#b8d7a8',
  },
};
