import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const InputField = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  sx,
}) => {
  return (
    <FormControl sx={sx}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        type={type ? type : "text"}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
    </FormControl>
  );
};

export default InputField;
