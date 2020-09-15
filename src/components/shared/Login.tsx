import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/core";
import {
  MdArrowForward,
  MdMail,
  MdVisibility,
  MdVisibilityOff,
  MdVpnKey,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import ValidationOptions from "../../helpers/validation-options";
import LoginModel from "../../models/login";

function DefaultLoginInput({
  errors,
  name,
  Icon,
  isDisabled,
  register,
  registerOptions,
  placeholder,
  innerGroup,
  formControlProps,
  ...rest
}: any) {
  return (
    <FormControl isInvalid={errors[name]} {...formControlProps}>
      <InputGroup size="lg">
        {innerGroup}
        <InputLeftElement children={<Box as={Icon} color="white" />} />
        <Input
          background="transparent"
          isFullWidth
          focusBorderColor="white"
          variant="outline"
          borderWidth="1px"
          borderColor="rgba(255,255,255, .3)"
          _hover={{ borderColor: "white" }}
          _placeholder={{
            color: "gray.400",
            fontWeight: 300,
          }}
          isDisabled={isDisabled}
          name={name}
          ref={register(registerOptions)}
          placeholder={placeholder}
          {...rest}
        />
      </InputGroup>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
}

type Props = {
  onSubmit: (login: LoginModel) => void;
  load?: boolean;
  logoSrc?: string;
  background?: string;
};

const defaultProps: Props = {
  onSubmit: () => null,
};

function Login({ background, logoSrc, load, onSubmit }: Props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const { handleSubmit, register, errors } = useForm();

  return (
    <Flex
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      background={background}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box w={350} maxW={350} pl={[6, 0]} pr={[6, 0]}>
          <Image w={["70%", "45%", "35%"]} src={logoSrc} />
          <DefaultLoginInput
            Icon={MdMail}
            name="email"
            placeholder="Email"
            errors={errors}
            register={register}
            registerOptions={ValidationOptions.emailRequiredOptions()}
            isDisabled={load}
            inputMode="email"
            formControlProps={{ mt: 4 }}
          />
          <DefaultLoginInput
            Icon={MdVpnKey}
            name="password"
            placeholder="Senha"
            errors={errors}
            register={register}
            registerOptions={ValidationOptions.requiredOptions()}
            isDisabled={load}
            type={showPassword ? "text" : "password"}
            inputMode="text"
            formControlProps={{ mt: 4 }}
            innerGroup={[
              <InputRightElement
                key="login-icon-item"
                children={
                  !load && (
                    <Box
                      p={1}
                      cursor="pointer"
                      size={6}
                      borderRadius="100%"
                      onClick={() => setShowPassword(!showPassword)}
                      as={showPassword ? MdVisibilityOff : MdVisibility}
                    />
                  )
                }
              />,
            ]}
          />
          <Button
            mt={4}
            _focus={{ outline: "none" }}
            _hover={{ borderColor: "white" }}
            borderColor="rgba(255,255,255, .3)"
            variant="outline"
            variantColor="gray"
            rightIcon={() => <Box as={MdArrowForward} ml={1} size={4} />}
            size="md"
            type="submit"
            isLoading={load}
            loadingText="Carregando..."
          >
            <Text fontSize="sm" letterSpacing={1} fontWeight={400}>
              ENTRAR
            </Text>
          </Button>
        </Box>
      </form>
    </Flex>
  );
}

Login.defaultProps = defaultProps;

export default Login;
