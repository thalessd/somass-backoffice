import React, { MutableRefObject, RefObject } from "react";
import DefaultTextInput from "../../shared/DefaultTextInput";
import { useForm } from "react-hook-form";
import ValidationOptions from "../../../helpers/validation-options";
import { Stack } from "@chakra-ui/core";
import User from "../../../models/user";
import { FORM_STACK_SPACING } from "../../../constants/style";

type Props = {
  onSubmit: (user: User) => void;
  defaultValues: User;
  load?: boolean;
};

function UserForm(
  { defaultValues, load, onSubmit }: Props,
  ref?: React.Ref<HTMLButtonElement>
): JSX.Element {
  const { handleSubmit, register, errors } = useForm<User>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={FORM_STACK_SPACING}>
        <DefaultTextInput
          name="name"
          placeholder="Nome do Usuário"
          label="Nome"
          errors={errors}
          register={register}
          registerOptions={ValidationOptions.requiredOptions()}
        />
        <DefaultTextInput
          name="email"
          placeholder="example@email.com"
          label="Email"
          inputProps={{
            type: "email",
            inputMode: "email",
          }}
          errors={errors}
          register={register}
          registerOptions={ValidationOptions.emailRequiredOptions()}
        />
        <DefaultTextInput
          name="password"
          placeholder="*****"
          label="Senha"
          inputProps={{
            type: "password",
          }}
          errors={errors}
          register={register}
          registerOptions={ValidationOptions.requiredOptions()}
        />
      </Stack>
      <button type="submit" ref={ref} hidden />
    </form>
  );
}

export default React.forwardRef<HTMLButtonElement, Props>(UserForm);
