import './App.css'
import { ThemeProvider } from '@mui/material'
import { theme } from 'configs/theme'
import Routes from 'components/Routes'
import 'react-toastify/dist/ReactToastify.css'
import { createContext, useReducer } from 'react'
import { initialState, reducer } from 'reducer/userReducer'

export const UserContext = createContext<{
  state: boolean
  dispatch: any
}>({
  state: initialState,
  dispatch: reducer,
})

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App
