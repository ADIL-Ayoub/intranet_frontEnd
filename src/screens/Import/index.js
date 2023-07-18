import React, { useState } from "react";
import "./index.css";
import { Uploader } from "@components";
import { useDropzone } from "react-dropzone";
import { PERSONNES } from "@services";
import { useToast, useColors, Fonts, FontSize } from "@common";
import { Button } from "@components";
import SaveIcon from "@mui/icons-material/Save";
import { Divider } from "@mui/material";

export default ({}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const Colors = useColors();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const UploadPersonnes = () => {
    if (acceptedFiles[0].path.split(".")[1] !== "csv") {
      toast(
        "error",
        "Le fichier que vous avez téléchargé doit être un fichier au format csv."
      );
      return;
    }
    if (acceptedFiles[0].name.split(".")[1] !== "csv") {
      toast(
        "error",
        "Le fichier que vous avez téléchargé doit être un fichier au format csv."
      );
      return;
    }
    if (!acceptedFiles[0]) {
      toast(
        "error",
        "Vous devez d'abord télécharger un fichier avant de cliquer sur le bouton ' sauvegarder '."
      );
      return;
    }
    const personnes = new FormData();
    personnes.append("file", acceptedFiles[0]);
    PERSONNES.ImportPersonnesata(personnes)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          toast("success", "Le fichier est enregistré avec succès");
          acceptedFiles[0] = [];
        }
      })
      .catch((error) => {
        if (error) {
          if (error?.response) {
            toast(
              "error",
              error?.response?.data?.message || "quelque chose s'est mal passé"
            );
            setIsLoading(false);
          } else {
            toast("error", "quelque chose s'est mal passé");
            setIsLoading(false);
          }
        } else {
          toast("error", "quelque chose s'est mal passé");
          setIsLoading(false);
        }
      });
  };
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div>
        <Button
          btnText={"Sauvegarde"}
          IconName={SaveIcon}
          handlePressed={UploadPersonnes}
          isLoading={isLoading}
          style={{
            color: Colors.blackText,
            backgroundColor: Colors.primary,
            borderRadius: 12,
            padding: "15px 26px",
            fontFamily: Fonts().primaryRegular,
            fontSize: FontSize().smallText,
            marginTop: "8px",
            width: "10%",
            position: "absolute",
            right: 2,
          }}
        />
      </div>
      <br />
      <Divider />
      <br />
      <Uploader
        acceptedFiles={acceptedFiles}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
    </div>
  );
};
