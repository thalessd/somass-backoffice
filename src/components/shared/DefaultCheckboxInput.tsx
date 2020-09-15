import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Checkbox,
  Flex,
} from "@chakra-ui/core";
import MaskedInput from "react-text-mask";
import { Controller } from "react-hook-form";
import { defaultInputProps } from "./DefaultTextInput";

type Props = {
  name: string;
  control: any;
  text: string;
  label?: string;
  isDisabled?: boolean;
  [x: string]: any;
};

function DefaultCheckboxInput({
  name,
  isDisabled,
  text,
  control,
  label,
  ...rest
}: Props) {
  return (
    <FormControl as={Flex} flexDir="column" {...rest}>
      {label ? (
        <FormLabel pb={0} htmlFor={name}>
          {label}
        </FormLabel>
      ) : null}
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={(props) => (
          <Checkbox
            isChecked={props.value}
            onChange={(e) => {
              props.onChange(e.target.checked);
            }}
            name={props.name}
            onBlur={props.onBlur}
            isDisabled={isDisabled}
            size="lg"
            mt={2}
          >
            {text}
          </Checkbox>
        )}
      />
    </FormControl>
  );
}

export default DefaultCheckboxInput;
