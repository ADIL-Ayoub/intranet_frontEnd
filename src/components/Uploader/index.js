import React, { useCallback } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { makeStyles } from "@mui/styles";
import { Divider, IconButton } from "@mui/material";
import { useColors, Fonts, FontSize } from "@common";
import Uploader from "@images/upload.png";

export default ({ acceptedFiles, getRootProps, getInputProps }) => {
  const classes = useStyle();
  const Colors = useColors();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className={classes.container}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div style={{ position: "relative" }}>
          <img
            src={Uploader}
            alt="uploader error"
            style={{ width: "40%", height: "40%" }}
          />
          <IconButton
            style={{
              position: "absolute",
              bottom: 0,
              background: "#e38e16",
              padding: "27px",
              boxShadow: "3px 3px 11px #a8a8a8",
            }}
          >
            <LibraryAddIcon
              style={{ color: "#fff", fontSize: "47px" }}
            />
          </IconButton>
        </div>
        <p
          style={{
            fontSize: FontSize().smallText,
            fontFamily: Fonts().primaryRegular,
            textTransform: "capitalize",
          }}
        >
          Faites glisser et déposez des fichiers ici, ou cliquez pour
          sélectionner des fichiers
        </p>
      </div>
      <aside>
        <Divider orientation="horizontal" flexItem>
          <p
            style={{
              fontSize: Fonts().primaryBold,
              fontSize: FontSize().smallText,
              color: Colors.primary,
            }}
          >
            Files
          </p>
        </Divider>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

const useStyle = makeStyles({
  container: {
    textAlign: "center",
    width: "calc(100% - 30%)",
    border: "1px dashed gray",
    margin: "0 auto",
    borderRadius: "22px",
  },
});
