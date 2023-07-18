import React, { useState } from "react";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Fonts, FontSize, useColors, useToast } from "@common";
import { Divider } from "@mui/material";
import { Button, TextInput } from "@components";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { PAYS } from "@services";
import { Select } from "@components";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ArticleIcon from '@mui/icons-material/Article';


export default ({}) => {
  const toast = useToast();
  const Colors = useColors();
  const [isLoading, setIsLoading] = useState(false);
  const [pays, setPays] = useState("");
  const [code, setCode] = useState("");
  const [codeProjet, setcodeProjet] = useState("");
  const [perimetre, setperimetre] = useState("");
  const [shortNameProjet, setshortNameProjet] = useState("");
  const [perimetreval, setPerimetreVal] = useState("");
  

  const options = [
    {id :1, name: 'interne'},
    {id :2, name: 'externe'},
    
  ];


  const handleAddNewPays = () => {
    if (!pays && !code) {
      toast("error", "Vous devez spécifier le nom du pays");
      return;
    }
    setIsLoading(true);
    const params = { libel: pays, codeCountry: code };
    PAYS.AddPay(params)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 201 || data.status === 200) {
          toast("success", "Success");
          setCode("");
          setPays("");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error) {
          if (error?.response) {
            toast(
              "error",
              error?.response?.data?.message || "quelque chose s'est mal passé"
            );
          } else {
            toast("error", "quelque chose s'est mal passé");
          }
        } else {
          toast("error", "quelque chose s'est mal passé");
        }
      });
  };

  const handleOnChangePerimetre = (e) => {
    setPerimetreVal(e.target.value);
  };
 
  // ----------------------------------------------
  const handleAddNewProjet = () => {
    if (!codeProjet && !perimetre && !shortNameProjet) {
      toast("error", "Vous devez spécifier le code de projet");
      return;
    }
    setIsLoading(true);
    const params = { 
        "codeProjet": codeProjet,
        "shortNameProjet": shortNameProjet,
        "perimeter": perimetreval
      
      
     };
    PAYS.AddProjet(params)
      .then((data) => {
        
        setIsLoading(false);
        if (data.status === 201 || data.status === 200) {
          console.log("++++++",data);
          toast("success", "Success");
          setcodeProjet("");
          setperimetre("");
          setshortNameProjet("");
        }
       
      })
      .catch((error) => {
        setIsLoading(false);
        if (error) {
          if (error?.response) {
            toast(
              "error",
              error?.response?.data?.message || "quelque chose s'est mal passé"
            );
          } else {
            toast("error", "quelque chose s'est mal passé");
          }
        } else {
          toast("error", "quelque chose s'est mal passé");
        }
      });
  };
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div className="title__conge">
        <MiscellaneousServicesIcon style={{ color: "#716f6f" }} />
        <h4
          className="title_parametre"
          style={{
            fontFamily: Fonts().primaryRegular,
            color: "#716f6f",
            marginLeft: 8,
            fontSize: 16,
          }}
        >
          Gestion des {" "}
          <span style={{ borderBottom: "3px solid #ec9f36" }}>Pays</span>
        </h4>
      </div>
      <div style={{ width: "100%" }}>
        <Divider />
        <br />
      </div>
      <div className="paramertrage__conge_item">
        <div className="signle__items__settings">
          <div className="title__of__conge">
            <TextInput
              isRequired
              disabled={isLoading}
              label="Nom de pay"
              IconName={FlagIcon}
              value={pays}
              handleChangeValue={(e) => setPays(e.target.value)}
              style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
              removeBase
              useGray
            />
            <TextInput
              isRequired
              disabled={isLoading}
              label="Code de pay"
              IconName={BookmarksIcon}
              value={code}
              handleChangeValue={(e) => setCode(e.target.value)}
              style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
              removeBase
              useGray
            />
          </div>
          <div className="conge__actions">
            <Button
              disabled={isLoading}
              btnText={"Annuler"}
              IconName={CloseIcon}
              handlePressed={() => console.log("close .............")}
              isLoading={isLoading}
              style={{
                color: Colors.blackText,
                backgroundColor: Colors.error,
                borderRadius: 12,
                padding: "15px 26px",
                fontFamily: Fonts().primaryRegular,
                fontSize: FontSize().smallText,
                marginTop: "22px",
                width: "100%",
              }}
            />
            <Button
              disabled={isLoading}
              btnText={"Sauvegarder"}
              IconName={DoneIcon}
              handlePressed={handleAddNewPays}
              isLoading={isLoading}
              style={{
                color: Colors.blackText,
                backgroundColor: Colors.primary,
                borderRadius: 12,
                padding: "15px 26px",
                fontFamily: Fonts().primaryRegular,
                fontSize: FontSize().smallText,
                marginTop: "22px",
                width: "100%",
              }}
            />
          </div>
        </div>
      </div>
      <div className="title__conge">
        <MiscellaneousServicesIcon style={{ color: "#716f6f" }} />
        <h4
          className="title_parametre"
          style={{
            fontFamily: Fonts().primaryRegular,
            color: "#716f6f",
            marginLeft: 8,
            fontSize: 16,
          }}
        >
          Gestion des {" "}
          <span style={{ borderBottom: "3px solid #ec9f36" }}>Projets</span>
        </h4>
      </div>
      <div className="paramertrage__conge_item">
        <div className="signle__items__settings">
          <div className="title__of__conge">
            <TextInput
              isRequired
              disabled={isLoading}
              label="Code projet"
              IconName={VpnKeyIcon}
              value={codeProjet}
              handleChangeValue={(e) => setcodeProjet(e.target.value)}
              style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
              removeBase
              useGray
            />
            <Select
              label={"Perimetre"}
              data={options}
              style={{
                width: "30ch",
                marginTop: "6px",
                marginRight: 1,
              }}
              value={perimetreval}
              handleOnChange={handleOnChangePerimetre}
            />
            
           
            <TextInput
              isRequired
              disabled={isLoading}
              label="Nom de projet"
              IconName={ArticleIcon}
              value={shortNameProjet}
              handleChangeValue={(e) => setshortNameProjet(e.target.value)}
              style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
              removeBase
              useGray
            />
          </div>
          <div className="conge__actions">
            <Button
              disabled={isLoading}
              btnText={"Annuler"}
              IconName={CloseIcon}
              handlePressed={() => console.log("close .............")}
              isLoading={isLoading}
              style={{
                color: Colors.blackText,
                backgroundColor: Colors.error,
                borderRadius: 12,
                padding: "15px 26px",
                fontFamily: Fonts().primaryRegular,
                fontSize: FontSize().smallText,
                marginTop: "22px",
                width: "100%",
              }}
            />
            <Button
              disabled={isLoading}
              btnText={"Sauvegarder"}
              IconName={DoneIcon}
              handlePressed={handleAddNewProjet}
              isLoading={isLoading}
              style={{
                color: Colors.blackText,
                backgroundColor: Colors.primary,
                borderRadius: 12,
                padding: "15px 26px",
                fontFamily: Fonts().primaryRegular,
                fontSize: FontSize().smallText,
                marginTop: "22px",
                width: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
