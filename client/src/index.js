import React from "react";
import { render } from "react-dom";
import App from './App'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#F6F6F6',
            dark: '#CE2B27'
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


