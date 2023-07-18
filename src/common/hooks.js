import { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { ADD_TOAST, REMOVE_TOAST } from "@redux/toasts/types";
import { LOGOUT } from "@redux/account/types";

// This hook returns the darkmode value based on state and system values
export const useIsDarkMode = () => {
  // Get darkmode value from redux state
  const darkModeInState = true; //useSelector(({account: {isDarkMode}}) => isDarkMode);
  // Get darkmode value from system
  const darkModeInSystem = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  // Calc value based on state
  const [isDarkTheme, setIsDarkTheme] = useState(darkModeInSystem());

  const mqListener = (e) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(mqListener);
    return () => darkThemeMq.removeListener(mqListener);
  }, []);

  let darkModeValue = darkModeInState === null ? isDarkTheme : darkModeInState;
  // Return calculated darkmode value
  return darkModeValue;
};

// This hook returns a toast function that can display toasts to the screen
export const useToast = () => {
  const dispatch = useDispatch();
  const showToast = (type, message, duration = 3000) => {
    const toastId = Math.floor(Math.random() * 100 * Date.now()) + "";
    const toast = {
      type,
      message,
      id: toastId,
    };

    dispatch({ type: ADD_TOAST, payload: toast });
    setTimeout(() => {
      dispatch({ type: REMOVE_TOAST, payload: toastId });
    }, duration);
  };

  return showToast;
};

export const usePermessions = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ account: { user } }) => user);
  if (!user && user?.roles.length === 0) {
    dispatch({ type: LOGOUT });
    return;
  }

  const showPermessions = (prv) => {
    var permissions = null;
    if (user?.roles[0]?.name === "ADMIN") {
      permissions = { access: true };
    } else {
      const { privileges } = user?.roles[0];
      if (privileges) {
        for (var i = 0; i < privileges.length; i++) {
          if (privileges[i].code === prv) {
            permissions = { access: true };
          }
        }
      }
    }

    return permissions;
  };
  return showPermessions;
};
