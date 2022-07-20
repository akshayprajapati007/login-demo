import { createTheme } from '@mui/material'

export const theme = createTheme({
  // Palette
  palette: {
    primary: {
      main: '#9e4d40',
    },
    secondary: {
      main: '#E73737',
      light: '#dddddd',
    },
  },

  // Typography
  typography: {
    // h1: { fontSize: '4rem', lineHeight: '4.375' },
    // h2: { fontSize: '3rem', lineHeight: '3.375' },
    // h3: { fontSize: '2.5rem', lineHeight: '3' },
    h4: { fontSize: '1.25rem', lineHeight: '1.625', fontWeight: 700 },
    // h5: { fontSize: '1.75rem', lineHeight: '2.125' },
    h6: { fontSize: '1rem', lineHeight: '1.625', fontWeight: 700 },
  },

  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Lato!important',
        },
      },
    },

    // Header Appbar
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'transparent',
          background: 'linear-gradient(to right,#9e4d40 0,#ffffff 100%)',
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        gutters: {
          padding: '5px 10px!important',
          minHeight: 'auto!important',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          minWidth: '80px!important',
          fontFamily: 'Lato',
          minHeight: '2.5em',
          backgroundColor: 'rgb(158, 77, 64)',
          '&:hover': {
            borderColor: 'transparent',
            backgroundColor: 'rgb(158, 77, 64,0.95)',
          },
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: 'Lato',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b6b6b6',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
            borderColor: '#9e4d40',
          },
        },
        notchedOutline: {
          borderColor: '#dddddd',
        },
        input: {
          '&::placeholder': {
            opacity: 0.9,
            fontSize: '0.9em'
          },
        },
      },
    },
  },
})
