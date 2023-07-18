import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import SingleToast from "./single";

export default () => {
  const styles = useStyle();
  const toastsList = useSelector(
    ({ toasts: { toasts: toastsList } }) => toastsList
  );

  return (
    <div className={styles.container}>
      {toastsList.map((toast) => (
        <SingleToast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          toastId={toast.id}
        />
      ))}
    </div>
  );
};

const useStyle = makeStyles({
  container: {
    width: "100%",
    position: "fixed",
    left: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  },
});
