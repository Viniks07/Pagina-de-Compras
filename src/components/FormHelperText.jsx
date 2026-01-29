import { FormControl, InputLabel, Select, FormHelperText } from "@mui/material";

export const formHelperText = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl 
    fullWidth 
    variant="outlined" 
    error={touched && !!error}
  >
    <InputLabel shrink>{label}</InputLabel>
    <Select
      {...input}
      {...custom}
      label={label}
      displayEmpty
      notched
    >
      {children}
    </Select>
    
    {touched && error && (
      <FormHelperText sx={{ fontSize: '1.2rem' }}>
        {error}
      </FormHelperText>
    )}
  </FormControl>
);