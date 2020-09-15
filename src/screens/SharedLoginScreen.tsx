import React from "react";
import LoginModel from "../models/login";
import Login from "../components/shared/Login";
import UserApi from "../services/user.api";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/core";
import ShowToast from "../helpers/show-toast";

const GRADIENT_BG = "linear-gradient(135deg, #52E5E7 10%, #130CB7 100%)";

type Props = {
  routeAfterLogin: string;
};

function SharedLoginScreen({ routeAfterLogin }: Props) {
  const router = useRouter();
  const [load, setLoad] = React.useState(true);

  const toast = useToast();

  const onSubmit = async (data: LoginModel) => {
    setLoad(true);

    try {
      await UserApi.login(data);

      return router.push(routeAfterLogin);
    } catch (e) {
      if (e?.response?.status === 401) {
        return new ShowToast(toast).warning("Email ou senha inválidos!");
      }

      return new ShowToast(toast).error("Erro desconhecido");
    } finally {
      setLoad(false);
    }
  };

  const testLoginSession = async () => {
    try {
      await UserApi.tokenRefresh();

      router.push(routeAfterLogin).then();
    } catch (e) {
      setLoad(false);
    }
  };

  React.useEffect(() => {
    testLoginSession().then();
  }, []);

  return (
    <Login
      background={GRADIENT_BG}
      load={load}
      logoSrc="images/devdes-brand-white.svg"
      onSubmit={onSubmit}
    />
  );
}

export default SharedLoginScreen;
