import React from "react";
import { render } from "react-dom";
import App from './App'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
            dark: '#F6F6F6'
        },
        secondary: {
            main: '#CE2B27',
        },
    },
});

render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')
)


