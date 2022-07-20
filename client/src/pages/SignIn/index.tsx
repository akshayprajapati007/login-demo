import Button from '@mui/material/Button'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { AppRoutings } from 'utility/enums/app-routings'
import * as Yup from 'yup'
import authService from 'services/auth-service'
import useToast from 'hooks/useToast'
import PasswordField from 'components/PasswordField'
import { UserContext } from 'App'
import { useContext, useState } from 'react'

const CustomField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: '2.2em',
    margin: '0.5em',
    width: '13.5em',
    '& > input': {
      paddingTop: '0',
      paddingBottom: '0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000000',
    },
  },
}))

interface ILoginValues {
  email: string
  password: string
}

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter email'),
  password: Yup.string().required('Please enter your password'),
})

const SignIn = () => {
  const navigate = useNavigate()
  const [loginLoader, setLoginLoader] = useState(false)
  const { errorToast } = useToast()
  const { dispatch } = useContext(UserContext)

  const loginValues: ILoginValues = {
    email: '',
    password: '',
  }

  const handleLogin = async (values: ILoginValues) => {
    try {
      setLoginLoader(true)
      await authService.signIn(values)
      setLoginLoader(false)
      dispatch({ type: 'USER', payload: true })
      navigate(AppRoutings.Dashboard)
    } catch (err: any) {
      const { error } = err.response.data
      setLoginLoader(false)
      errorToast(error)
    }
  }

  return (
    <Box
      sx={{
        width: '30vw',
        height: '70vh',
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '2px 2px 5px grey',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          color="primary"
          sx={{
            marginTop: '2rem',
            fontWeight: '700',
            fontSize: '1.4rem',
          }}
        >
          LOGIN
        </Typography>
        <Formik
          initialValues={loginValues}
          validationSchema={loginSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {({ values, errors, touched, handleChange, isSubmitting }) => (
            <Form
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CustomField
                name="email"
                variant="outlined"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                error={!!(errors.email && touched.email)}
                helperText={touched.email && errors.email}
              />
              <PasswordField
                name="password"
                variant="outlined"
                placeholder="Password"
                value={values.password}
                handleChange={handleChange}
                error={errors.password || ''}
                touched={!!touched.password}
              />
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{
                    marginRight: '5em',
                    marginTop: '3em',
                  }}
                >
                  {loginLoader ? <CircularProgress size={22} sx={{ color: '#ffffff' }} /> : 'Login'}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(AppRoutings.SignUp)}
                  disabled={isSubmitting}
                  sx={{
                    marginTop: '3em',
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default SignIn
