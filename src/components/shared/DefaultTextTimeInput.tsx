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
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { defaultInputProps } from "./DefaultTextInput";
import { format, parse } from "date-fns";

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

function DefaultTextTimeInput({
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
              selected={parse(props.value, "HH:mm:ss", new Date())}
              showTimeSelect
              showTimeSelectOnly
              onBlur={props.onBlur}
              locale="pt-BR"
              onChange={(date: Date) =>
                props.onChange(format(date, "HH:mm:ss"))
              }
              dateFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Horário"
              strictParsing
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

export default DefaultTextTimeInput;
