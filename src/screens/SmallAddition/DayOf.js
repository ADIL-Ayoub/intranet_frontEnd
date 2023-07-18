import React, { useState, useEffect } from "react";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Fonts, FontSize, useColors, useToast } from "@common";
import { Divider } from "@mui/material";
import { Button, TextInput, DatePicker, Select } from "@components";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { format } from "date-fns";
import { PAYS } from "@services";

export default ({}) => {
  const toast = useToast();
  const Colors = useColors();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState([]);
  const [codeval, setCodeVal] = useState("");
  const [holidayLabel, setHolidayLabel] = useState([]);
  const [holidaydate, setHolidayDate] = useState(new Date());

  const OnChangeEndDate = (e) => {
    setHolidayDate(e);
  };
  useEffect(() => {
    getAllPays();
  }, []);

  const getAllPays = () => {
    PAYS.getAllPays()
      .then((data) => {
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

  const handleOnChangePays = (e) => {
    setCodeVal(e.target.value);
  };

  const handleAddNewPays = () => {
    if (!holidayLabel && !code) {
      toast("error", "Vous devez spécifier le nom du pays");
      return;
    }
    setIsLoading(true);
    const params = {
      codeCountry: codeval,
      paramHolidays: [
        {
          libelHoliday: holidayLabel,
          dateHoliday: format(new Date(holidaydate), "dd-MM-yyyy"),
        },
      ],
    };
    PAYS.NewDaysOff(params)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 201 || data.status === 200) {
          toast("success", "Success");
          setCodeVal("");
          setHolidayDate(new Date());
          setHolidayLabel("");
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
          Gestion des jours{" "}
          <span style={{ borderBottom: "3px solid #ec9f36" }}>fériés</span>
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
                width: "50ch",
                marginTop: "6px",
                marginRight: 1,
              }}
              value={codeval}
              handleOnChange={handleOnChangePays}
              isPays
              useId
            />
            <TextInput
              isRequired
              disabled={isLoading}
              label="Holiday Label"
              IconName={FlagIcon}
              value={holidayLabel}
              handleChangeValue={(e) => setHolidayLabel(e.target.value)}
              style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
              removeBase
              useGray
            />
            <DatePicker
              label={"Dates "}
              onChangeDate={OnChangeEndDate}
              value={holidaydate}
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
    </div>
  );
};
