import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  Flex,
} from "@chakra-ui/core";
import { FieldErrors } from "react-hook-form/dist/types/form";
import { Controller } from "react-hook-form";

type Props = {
  errors: FieldErrors<any>;
  name: string;
  control: any;
  label?: string;
  isDisabled?: boolean;
  registerOptions?: any;
  placeholder?: string;
  innerGroup?: JSX.Element | JSX.Element[];
  min?: number;
  max?: number;
  step?: number;
  [x: string]: any;
};

function DefaultSliderInput({
  errors,
  name,
  Icon,
  isDisabled,
  control,
  registerOptions,
  placeholder,
  innerGroup,
  label,
  min,
  max,
  step,
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
            <Flex width="100%" mt={3}>
              <NumberInput
                maxW="100px"
                mr="2rem"
                value={props.value}
                onChange={props.onChange}
                isDisabled={isDisabled}
                min={min ?? 0}
                max={max}
                step={step}
                placeholder={placeholder}
              />
              <Slider
                flex="1"
                isDisabled={isDisabled}
                value={props.value}
                onChange={props.onChange}
                min={min ?? 0}
                max={max}
                step={step}
              >
                <SliderTrack />
                <SliderFilledTrack />
                <SliderThumb />
              </Slider>
            </Flex>
          )}
        />
      </InputGroup>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default DefaultSliderInput;
