import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/core";
import { FieldErrors } from "react-hook-form/dist/types/form";

export const defaultInputProps: any = {
  background: "transparent",
  isFullWidth: true,
  focusBorderColor: "white",
  variant: "flushed",
  borderBottomWidth: "1px",
  _hover: { borderColor: "white" },
  _placeholder: {
    color: "gray.500",
    fontWeight: 300,
  },
};

type Props = {
  errors: FieldErrors<any>;
  name: string;
  register: any;
  label?: string;
  isDisabled?: boolean;
  registerOptions?: any;
  placeholder?: string;
  innerGroup?: JSX.Element | JSX.Element[];
  inputProps?: any;
  [x: string]: any;
};

function DefaultTextInput({
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
        <Input
          isDisabled={isDisabled}
          name={name}
          ref={register(registerOptions)}
          placeholder={placeholder}
          {...defaultInputProps}
          {...inputProps}
        />
      </InputGroup>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default DefaultTextInput;
