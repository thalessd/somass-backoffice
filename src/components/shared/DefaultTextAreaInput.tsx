import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/core";
import { FieldErrors } from "react-hook-form/dist/types/form";
import { defaultInputProps } from "./DefaultTextInput";

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

function DefaultTextAreaInput({
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
        <Textarea
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

export default DefaultTextAreaInput;
