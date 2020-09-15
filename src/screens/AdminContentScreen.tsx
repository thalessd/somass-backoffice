import React from "react";
import Navbar, { MenuItem } from "../components/shared/Navbar";
import {
  MdAccountBox,
  MdAdd,
  MdEvent,
  MdHome,
  MdRefresh,
} from "react-icons/md";
import PanelContent, { PanelAction } from "../components/shared/PanelContent";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Creators as AdminActions } from "../ducks/admin";
import UserApi from "../services/user.api";
import LazyLoad from "../components/shared/LazyLoad";

type Props = {
  children: JSX.Element | JSX.Element[];
  title: string;
  onAdd?: () => void;
  onRefresh?: () => void;
  hideBackArrow?: boolean;
};

function AdminContentScreen({
  title,
  hideBackArrow,
  onAdd,
  onRefresh,
  children,
}: Props) {
  const router = useRouter();
  const admin = useSelector((state: any) => state.admin);
  const dispatch = useDispatch();

  const [load, setLoad] = React.useState(false);

  const onFirstStart = async () => {
    if (admin.isLogged) return;

    setLoad(true);

    try {
      const user = await UserApi.findMe();

      return dispatch(AdminActions.userLogged(user));
    } catch (e) {
      return router.push("/");
    } finally {
      setLoad(false);
    }
  };

  const doLogout = async () => {
    await UserApi.logout();

    dispatch(AdminActions.userLogout());

    return router.push("/");
  };

  React.useEffect(() => {
    onFirstStart().then();
  }, []);

  const menuItems: MenuItem[] = [
    { icon: MdHome, label: "Página Inicial", to: "/home" },
    { icon: MdEvent, label: "Eventos", to: "/events" },
    { icon: MdAccountBox, label: "Usuários", to: "/users" },
  ];

  let actions: PanelAction[] = [];

  if (onAdd) {
    actions = [...actions, { icon: MdAdd, label: "Adicionar", onClick: onAdd }];
  }

  if (onRefresh) {
    actions = [
      ...actions,
      { icon: MdRefresh, label: "Atualizar", onClick: onRefresh },
    ];
  }

  const toBack = () => router.back();

  if (load) {
    return <LazyLoad />;
  }

  return (
    <Navbar
      menuItems={menuItems}
      username={admin.name}
      svgSrc="/images/devdes-brand-color.svg"
      brandLink="/home"
      navbarMobileBackgroundColor="gray.800"
      onExitClick={doLogout}
    >
      <PanelContent
        title={title}
        actions={actions}
        onBackClick={toBack}
        hideBackArrow={hideBackArrow}
      >
        {children}
      </PanelContent>
    </Navbar>
  );
}

export default AdminContentScreen;
