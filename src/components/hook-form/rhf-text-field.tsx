import { useFormContext, Controller } from 'react-hook-form';
// @mui
import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  isReadOnly?: boolean;
  paramValue?: string;
};

export default function RHFTextField({ name, helperText, type, paramValue, isReadOnly = false, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          defaultValue={paramValue}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          disabled={isReadOnly}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
          sx={{
            '& .Mui-disabled': {
              fontWeight: 'bold',
              '-webkit-text-fill-color': '#808080',
              backgroundColor: '#ececec'
            }
          }}
        />
      )}
    />
  );
}
