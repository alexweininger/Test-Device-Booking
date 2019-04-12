import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')
)