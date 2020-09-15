export default class ShowToast {
  toast: any;
  private toastDefaultConfig: any;

  constructor(toast: any) {
    this.toast = toast;

    this.toastDefaultConfig = {
      position: "bottom-left",
      duration: 3000,
      isClosable: true,
    };
  }

  success(title: string): void {
    this.toast({
      ...this.toastDefaultConfig,
      title,
      status: "success",
    });
  }

  error(title: string): void {
    this.toast({
      ...this.toastDefaultConfig,
      title,
      status: "error",
    });
  }

  warning(title: string): void {
    this.toast({
      ...this.toastDefaultConfig,
      title,
      status: "warning",
    });
  }

  info(title: string): void {
    this.toast({
      ...this.toastDefaultConfig,
      title,
      status: "info",
    });
  }
}
