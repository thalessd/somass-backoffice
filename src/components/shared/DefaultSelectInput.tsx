import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  InputGroup,
  InputLeftElement,
  PseudoBox,
} from "@chakra-ui/core";
import { FieldErrors } from "react-hook-form/dist/types/form";
import { defaultInputProps } from "./DefaultTextInput";

export type SelectOption = {
  label: string;
  value: string | number;
};

type Props = {
  errors: FieldErrors<any>;
  name: string;
  register: any;
  options: SelectOption[];
  label?: string;
  isDisabled?: boolean;
  registerOptions?: any;
  placeholder?: string;
  innerGroup?: JSX.Element | JSX.Element[];
  inputProps?: any;
  [x: string]: any;
};

function DefaultSelectInput({
  errors,
  name,
  Icon,
  isDisabled,
  register,
  registerOptions,
  placeholder,
  innerGroup,
  inputProps,
  label,
  options,
  ...rest
}: Props) {
  return (
    <FormControl isInvalid={errors[name]} {...rest}>
      {label ? (
        <FormLabel pb={0} htmlFor={name}>
          {label}
        </FormLabel>
      ) : null}
      <InputGroup>
        {innerGroup}
        {Icon ? (
          <InputLeftElement children={<Box as={Icon} color="white" />} />
        ) : null}
        <Select
          isDisabled={isDisabled}
          name={name}
          ref={register(registerOptions)}
          placeholder={placeholder}
          {...defaultInputProps}
          {...inputProps}
        >
          {options.map((selectOption: SelectOption) => (
            <option
              value={selectOption.value}
              style={{ color: "#000", fontWeight: 600 }}
            >
              {selectOption.label}
            </option>
          ))}
        </Select>
      </InputGroup>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default DefaultSelectInput;
