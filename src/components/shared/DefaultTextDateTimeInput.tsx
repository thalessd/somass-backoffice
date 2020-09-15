import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/core";
import { FieldErrors } from "react-hook-form/dist/types/form";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { defaultInputProps } from "./DefaultTextInput";

type Props = {
  errors: FieldErrors<any>;
  name: string;
  control: any;
  label?: string;
  isDisabled?: boolean;
  registerOptions?: any;
  placeholder?: string;
  innerGroup?: JSX.Element | JSX.Element[];
  inputProps?: any;
  datePickerProps?: any;
  [x: string]: any;
};

function DefaultTextDateTimeInput({
  errors,
  name,
  Icon,
  isDisabled,
  control,
  registerOptions,
  placeholder,
  innerGroup,
  inputProps,
  label,
  datePickerProps,
  ...rest
}: Props) {
  const DateInput = React.forwardRef(({ onClick, value }: any, ref: any) => (
    <Input
      isDisabled={isDisabled}
      name={name}
      placeholder={placeholder}
      isReadOnly={true}
      onClick={onClick}
      value={value}
      ref={ref}
      {...defaultInputProps}
      {...inputProps}
    />
  ));

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
            <DatePicker
              name={props.name}
              wrapperClassName="w100"
              selected={new Date(props.value)}
              onBlur={props.onBlur}
              locale="pt-BR"
              onChange={props.onChange}
              dateFormat="dd/MM/yyyy HH:mm:ss"
              // showTimeInput
              showTimeSelect
              customInput={<DateInput />}
              {...datePickerProps}
            />
          )}
        />
      </InputGroup>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default DefaultTextDateTimeInput;
