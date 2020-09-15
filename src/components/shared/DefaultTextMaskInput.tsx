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
import MaskedInput from "react-text-mask";
import { Controller } from "react-hook-form";
import { defaultInputProps } from "./DefaultTextInput";

type Props = {
  errors: FieldErrors<any>;
  name: string;
  control: any;
  mask: any;
  label?: string;
  isDisabled?: boolean;
  registerOptions?: any;
  placeholder?: string;
  innerGroup?: JSX.Element | JSX.Element[];
  inputProps?: any;
  [x: string]: any;
};

function DefaultTextMaskInput({
  errors,
  name,
  mask,
  Icon,
  isDisabled,
  control,
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
        <Controller
          control={control}
          name={name}
          rules={registerOptions}
          render={(props) => (
            <MaskedInput
              mask={mask}
              render={(
                ref: (inputElement: HTMLInputElement) => void,
                props: any
              ) => (
                <Input
                  ref={ref}
                  isDisabled={isDisabled}
                  placeholder={placeholder}
                  {...defaultInputProps}
                  {...inputProps}
                  {...props}
                />
              )}
              {...props}
            />
          )}
        />
      </InputGroup>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default DefaultTextMaskInput;
