import ShowToast from "./show-toast";

export class ApiAlert {
  static successCreate(toast: any, referenceName: string) {
    new ShowToast(toast).success(`${referenceName} Cadastrado com Sucesso!`);
  }

  static successUpdate(toast: any, referenceName: string) {
    new ShowToast(toast).success(`${referenceName} Atualizado com Sucesso!`);
  }

  static successDelete(toast: any, referenceName: string) {
    new ShowToast(toast).success(`${referenceName} Deletado com Sucesso!`);
  }

  static errorCreateOrUpdate(e: any, toast: any) {
    if (e?.response?.status === 409) {
      return new ShowToast(toast).warning("Dados em Conflito");
    }

    new ShowToast(toast).error("Erro Desconhecido");
  }

  static errorFindAll(e: any, toast: any, referenceName: string) {
    if (e?.response?.status === 400) {
      return new ShowToast(toast).warning(
        `Problemas ao Listar os Dados do ${referenceName}`
      );
    }
    new ShowToast(toast).error("Erro Desconhecido");
  }

  static errorDelete(e: any, toast: any, referenceName: string) {
    if (e?.response?.status === 400) {
      if (e.response?.data?.error === "In Use") {
        return new ShowToast(toast).warning(
          `Este ${referenceName} Está em Uso Por Outra Entidade`
        );
      }

      return new ShowToast(toast).warning(
        `Problemas ao Deletar o ${referenceName}`
      );
    }

    new ShowToast(toast).error("Erro Desconhecido");
  }
}
