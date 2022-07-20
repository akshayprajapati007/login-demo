import Button from '@mui/material/Button'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { Box, CircularProgress, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import PasswordField from 'components/PasswordField'
import accountServices from 'services/account-services'
import useToast from 'hooks/useToast'
import authService from 'services/auth-service'
import { AppRoutings } from 'utility/enums/app-routings'
import { useContext, useState } from 'react'
import { UserContext } from 'App'

const CustomField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: '2.2em',
    margin: '0.5em',
    '& > input': {
      paddingTop: '0',
      paddingBottom: '0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000000',
    },
  },
}))

interface ISignUpValues {
  email: string
  name: string
  password: string
  confirmPassword: string
}

const signUpSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter a email'),
  name: Yup.string().required('Please enter a name'),
  password: Yup.string()
    .required('Please enter a password')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirmPassword: Yup.string()
    .required('Please enter a confirm password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

const SignUp = () => {
  const navigate = useNavigate()
  const [signUpLoader, setSignUpLoader] = useState(false)
  const { errorToast } = useToast()
  const { dispatch } = useContext(UserContext)

  const signUpValues: ISignUpValues = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  }

  const handleSignUp = async (values: ISignUpValues) => {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    }
    try {
      setSignUpLoader(true)
      const response = await accountServices.registerAccount(payload)
      const { authenticationToken } = response.data
      authService.setAuthToken(authenticationToken)
      setSignUpLoader(false)
      dispatch({ type: 'USER', payload: true })
      navigate(AppRoutings.Dashboard)
    } catch (err: any) {
      const { error } = err.response.data
      setSignUpLoader(false)
      errorToast(error)
    }
  }

  return (
    <Box
      sx={{
        width: '35vw',
        height: '65vh',
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '2px 2px 5px grey',
        padding: '15px',
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
            marginTop: '1.5rem',
            fontWeight: '700',
            fontSize: '1.4rem',
          }}
        >
          SIGN UP
        </Typography>
        <Formik
          initialValues={signUpValues}
          validationSchema={signUpSchema}
          onSubmit={(values) => handleSignUp(values)}
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
              <div style={{ width: '100%', display: 'flex' }}>
                <CustomField
                  name="name"
                  variant="outlined"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  error={!!(errors.name && touched.name)}
                  helperText={touched.name && errors.name}
                />

                <CustomField
                  name="email"
                  variant="outlined"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  error={!!(errors.email && touched.email)}
                  helperText={touched.email && errors.email}
                />
              </div>
              <div style={{ width: '100%', display: 'flex' }}>
                <PasswordField
                  name="password"
                  variant="outlined"
                  placeholder="Password"
                  value={values.password}
                  handleChange={handleChange}
                  error={errors.password || ''}
                  touched={!!touched.password}
                />
                <PasswordField
                  name="confirmPassword"
                  variant="outlined"
                  placeholder="Confirm password"
                  value={values.confirmPassword}
                  handleChange={handleChange}
                  error={errors.confirmPassword || ''}
                  touched={!!touched.confirmPassword}
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{
                  marginTop: '1em',
                }}
              >
                {signUpLoader ? (
                  <CircularProgress size={22} sx={{ color: '#ffffff' }} />
                ) : (
                  'SIGN UP'
                )}
              </Button>
              <div
                style={{
                  marginTop: '1em',
                }}
              >
                Already have an account?
                <NavLink
                  style={{
                    textDecoration: 'none',
                    fontWeight: 600,
                    marginLeft: '0.2em',
                    color: '#9e4d40',
                  }}
                  to={AppRoutings.SignIn}
                >
                  Login
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default SignUp
