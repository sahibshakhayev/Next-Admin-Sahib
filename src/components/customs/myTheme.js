import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
    palette: {
        primary: {
            main: '#586266', // Custom primary color
        },
        secondary: {
            main: '#586266', // Custom secondary color
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 600, // Bolder header text
        },
        body1: {
            fontSize: 16, // Larger base font size
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#586266', // Dark blue for header
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20, // Rounded button corners
                    textTransform: 'none', // No uppercase text for buttons
                },
            },
        },

        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: '1.5rem', // Change the default icon size
                },
            },
        },
    },
});

export default myTheme;
