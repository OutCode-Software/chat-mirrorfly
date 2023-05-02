
import { FormControl, FormLabel } from '@chakra-ui/react';
import React from 'react'

import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
const MultiSelect = ({label,name,value,onChange,option,...sx}) => {
  return (
    <FormControl sx={sx}>

    {label && <FormLabel>{label}</FormLabel>}

    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      value={value}
      onChange={onChange}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
      options={option}
      name={name}
    />    
    
    </FormControl>
    )
}

export default MultiSelect