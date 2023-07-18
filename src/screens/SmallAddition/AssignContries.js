import React, { useState, useEffect } from "react";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Fonts, FontSize, useColors, useToast } from "@common";
import { Divider } from "@mui/material";
import { Button, Select } from "@components";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { PAYS } from "@services";
import { CLEINTS, SERVICES, DEPARTEMENT, PERSONNES } from "@services";

export default ({}) => {
  const toast = useToast();
  const Colors = useColors();
  const [isLoading, setIsLoading] = useState(false);
  const [serviceData, setServicesData] = useState([]);
  const [serviceValue, setServicesValue] = useState([]);
  const [client_id, setClientId] = useState(null);
  const [departement, setDepartements] = useState([]);
  const [clients, setClients] = useState([]);
  const [depValue, setDepValue] = useState(null);
  const [cliValue, setCliValue] = useState(null);
  const [code, setCode] = useState([]);
  const [codeval, setCodeVal] = useState("");

  useEffect(() => {
    fetchDepartements();
    getAllPays();
  }, []);

  const getAllPays = () => {
    setIsLoading(true);
    PAYS.getAllPays()
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setCode(data.data);
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

  const fetchDepartements = () => {
    setIsLoading(true);
    DEPARTEMENT.fetchDepartement()
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setDepartements(data.data.content);
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

  const fetchClient = (id) => {
    setIsLoading(true);
    CLEINTS.fetchClients("", id)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setClients(data.data.content);
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

  const handleOnChangeDepartement = (e) => {
    setDepValue(e.target.value);
    fetchClient(e.target.value);
  };

  const handleOnChangeClients = (e) => {
    setCliValue(e.target.value);
    setClientId(e.target.value);
    fetchServicesData(e.target.value);
  };

  const handleOnChangeServices = (event) => {
    const {
      target: { value },
    } = event;
    setServicesValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleOnChangePays = (e) => {
    setCodeVal(e.target.value);
  };

  const fetchServicesData = (IdClient) => {
    setIsLoading(true);
    SERVICES.fetchServices(IdClient)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200 || data.status === 201) {
          setServicesData(data.data.content);
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

  const handleAddAssignPays = () => {
    if (!codeval && serviceValue.length === 0) {
      toast("error", "Vous devez spécifier les champs obligatoires");
      return;
    }
    setIsLoading(true);
    const params = {
      idPays: codeval,
      idServies: serviceValue,
    };
    PAYS.AssignContries(params)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 201 || data.status === 200) {
          toast("success", "Success");
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
          Affectez des pays aux{" "}
          <span style={{ borderBottom: "3px solid #ec9f36" }}>services</span>
        </h4>
      </div>
      <div style={{ width: "100%" }}>
        <Divider />
        <br />
      </div>
      <div className="paramertrage__conge_item">
        <div className="signle__items__settings">
          <div className="title__of__conge">
            <Select
              label={"Code Pays"}
              data={code}
              style={{
                width: "20ch",
                marginTop: "6px",
                marginRight: 1,
              }}
              value={codeval}
              handleOnChange={handleOnChangePays}
              isPays
              useIdPays
              useId
            />
            <Select
              label={"Département"}
              data={departement}
              style={{
                width: "20ch",
                marginTop: 1,
              }}
              value={depValue}
              isDepartement
              useId
              handleOnChange={handleOnChangeDepartement}
            />
            <Select
              label={"Clients"}
              data={clients}
              style={{
                width: "20ch",
                marginTop: 1,
                marginLeft: 1,
              }}
              value={cliValue}
              isClient
              useId
              handleOnChange={handleOnChangeClients}
            />
            <Select
              label={"Services"}
              data={serviceData}
              style={{
                width: "20ch",
                marginTop: 1,
                marginLeft: 1,
              }}
              value={serviceValue}
              useId
              isServices
              isMultible
              handleOnChange={handleOnChangeServices}
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
              handlePressed={handleAddAssignPays}
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
