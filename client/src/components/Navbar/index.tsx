import {
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  Hidden,
  Typography,
} from '@mui/material'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import authService from 'services/auth-service'
import { useContext } from 'react'
import { UserContext } from 'App'
import { useNavigate } from 'react-router-dom'
import { AppRoutings } from 'utility/enums/app-routings'

const Navbar: () => JSX.Element = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)

  const handleLogout = async () => {
    try {
      await authService.signOut()
      dispatch({ type: 'USER', payload: false })
      navigate(AppRoutings.SignIn)
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid item xs>
              <Grid container spacing={2} alignItems="center">
                <Hidden mdDown>
                  <Grid item xs>
                    <Typography variant="h6" mt={0.8} ml={0.5} mb={0.8}>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '1em',
                          border: '2px solid #ffffff',
                          padding: '6px',
                          borderRadius: '0.4em',
                        }}
                      >
                        AK
                      </span>
                    </Typography>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
            {state && (
              <Grid item xs="auto" className="menubar-right-part">
                <IconButton
                  size="medium"
                  edge="end"
                  sx={{ color: '#000000' }}
                  onClick={handleLogout}
                >
                  <ExitToAppRoundedIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
