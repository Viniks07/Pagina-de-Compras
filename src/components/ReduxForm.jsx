import { TextField } from "@mui/material";

export const reduxFormField = (props) => {
  const { input, label, meta, ...custom } = props;
  

  const touched = meta ? meta.touched : false;
  const error = meta ? meta.error : "";

  return (
    <TextField
      label={label}
      fullWidth
      variant="outlined"
      error={touched && !!error}
      helperText={touched && error}
      {...input}
      {...custom}
      InputLabelProps={{ shrink: true }}
    />
  );
};