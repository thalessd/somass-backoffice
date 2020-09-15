import React from "react";
import DefaultTextInput from "../../shared/DefaultTextInput";
import { useForm } from "react-hook-form";
import ValidationOptions from "../../../helpers/validation-options";
import { Stack } from "@chakra-ui/core";
import Event from "../../../models/event";
import { FORM_STACK_SPACING } from "../../../constants/style";
import DefaultCheckboxInput from "../../shared/DefaultCheckboxInput";
import DefaultSliderInput from "../../shared/DefaultSliderInput";
import DefaultSelectInput, {
  SelectOption,
} from "../../shared/DefaultSelectInput";
import { DAYS_OF_WEEK } from "../../../constants/default";
import DefaultTextTimeInput from "../../shared/DefaultTextTimeInput";

const dayOfWeekOptions: SelectOption[] = DAYS_OF_WEEK.map(
  (label: string, idx: number) => ({
    label,
    value: idx,
  })
);

type Props = {
  onSubmit: (event: Event) => void;
  defaultValues: Event;
  load?: boolean;
};

function EventForm(
  { defaultValues, load, onSubmit }: Props,
  ref?: React.Ref<HTMLButtonElement>
): JSX.Element {
  const { handleSubmit, register, control, errors } = useForm<Event>({
    defaultValues,
  });

  const onFormSubmit = handleSubmit((data) => {
    data.dayOfWeek = Number(data.dayOfWeek);

    onSubmit(data);
  });

  return (
    <form onSubmit={onFormSubmit} noValidate autoComplete="off">
      <Stack spacing={FORM_STACK_SPACING}>
        <DefaultTextInput
          name="location"
          placeholder="Igreja Matriz"
          label="Localização"
          errors={errors}
          register={register}
          registerOptions={ValidationOptions.requiredOptions()}
        />
        <DefaultTextTimeInput
          name="startTime"
          placeholder="16:30"
          label="Horário de Inicio"
          errors={errors}
          control={control}
          registerOptions={ValidationOptions.requiredOptions()}
        />
        <DefaultSelectInput
          name="dayOfWeek"
          label="Dia da Semana"
          options={dayOfWeekOptions}
          errors={errors}
          register={register}
          registerOptions={ValidationOptions.requiredOptions()}
        />
        <DefaultSliderInput
          control={control}
          name="vacancy"
          placeholder="23"
          label="Vagas"
          min={1}
          max={2000}
          errors={errors}
          registerOptions={ValidationOptions.requiredOptions()}
        />
        <DefaultCheckboxInput
          label="Exibir"
          name="available"
          control={control}
          text="Disponível?"
        />
      </Stack>
      <button type="submit" ref={ref} hidden />
    </form>
  );
}

export default React.forwardRef<HTMLButtonElement, Props>(EventForm);
