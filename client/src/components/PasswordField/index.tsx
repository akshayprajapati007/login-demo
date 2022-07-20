import TextField, { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import VisibilityIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffRounded'
import React, { useState } from 'react'

const CustomField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: '2.2em',
    margin: '0.5em',
    '&.Mui-focused fieldset': {
      borderColor: '#000000',
    },
  },
}))

interface IPasswordProps {
  name: string
  variant: 'standard' | 'filled' | 'outlined' | undefined
  placeholder: string
  value: string | number
  error: string
  touched: boolean
  handleChange: (e: React.ChangeEvent<any>) => void
}

const PasswordField = ({
  name,
  placeholder,
  variant,
  value,
  error,
  touched,
  handleChange,
}: IPasswordProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible((visibility) => !visibility)
  }

  return (
    <CustomField
      name={name}
      type={isVisible ? 'text' : 'password'}
      variant={variant}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: !isVisible ? (
          <VisibilityIcon style={{ cursor: 'pointer', fontSize: '1.2em' }} onClick={toggleVisibility} />
        ) : (
          <VisibilityOffIcon style={{ cursor: 'pointer', fontSize: '1.2em' }} onClick={toggleVisibility} />
        ),
      }}
      error={!!(error && touched)}
      helperText={touched && error}
    />
  )
}

export default PasswordField
