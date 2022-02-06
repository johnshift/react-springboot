import { useState, MouseEvent } from "react";
import { clearUserInfo } from "../../../features/userInfo/userInfoSlice";
import { useAppDispatch, useAppSelector } from "../../../store";
import { openLoginModal } from "../../../store/globalSlice";

const useNav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { isLoggedIn } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

  const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleCloseMenu();
    dispatch(clearUserInfo());
  };
  const showLoginForm = () => {
    handleCloseMenu();
    dispatch(openLoginModal());
  };

  return {
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
    isLoggedIn,
    logout,
    showLoginForm,
  };
};

export default useNav;
