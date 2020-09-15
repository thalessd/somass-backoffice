export default class ValidationOptions {
  private static requiredMessage = 'Campo Obrigatório';

  static requiredOptions(): any {
    return { required: { value: true, message: this.requiredMessage } };
  }

  static emailRequiredOptions(): any {
    return {
      pattern: {
        value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
        message: 'O Campo Precisa ser um Email',
      },
      required: { value: true, message: this.requiredMessage },
    };
  }

  static minLenghtRequiredOptions(value = 4): any {
    return {
      minLength: {
        value,
        message: `O Campo Precisa ter no mínimo ${value} Caracteres`,
      },
      required: { value: true, message: this.requiredMessage },
    };
  }
}
