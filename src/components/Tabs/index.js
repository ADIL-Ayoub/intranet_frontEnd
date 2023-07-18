import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import "./index.css";
import { DatePicker, CheckBox, TextInput } from "@components";
import HPlusMobiledataIcon from "@mui/icons-material/HPlusMobiledata";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default ({
  hDMorning,
  hFMorning,
  hDAfternon,
  hFAfternon,
  handleHDM,
  handleHFM,
  handleHDS,
  handleHFS,
  day,
  typeOfDay,
  isAbsent,
  handleCheckIsAbsent,
  houreAdded,
  handleChangeHoureAdded,
  motif,
  handleMotif,
}) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Journalier" {...a11yProps(0)} />
        <Tab label="Hebdomadaire" {...a11yProps(1)} />
        <Tab label="Mensuel" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4 style={{ textTransform: "capitalize" }}>{day}</h4>
        </div>
        <Divider />
        <div className="container_tabs">
          <div style={{ width: "100%" }}>
            <div className="content_tabs">
              <h5>Matin</h5>
              <div>
                <TextInput
                  label="H/D matin"
                  IconName={AccessAlarmIcon}
                  value={hDMorning}
                  handleChangeValue={(e) => handleHDM(e)}
                  style={{ width: "100%", borderRadius: 22 }}
                  removeBase
                  useGray
                />
                <div style={{ marginTop: 8 }}>
                  <TextInput
                    label="H/F matin"
                    IconName={AccessAlarmIcon}
                    value={hFMorning}
                    handleChangeValue={(e) => handleHFM(e)}
                    style={{ width: "100%", marginTop: 6, borderRadius: 22 }}
                    removeBase
                    useGray
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="dividerDiv">
            <Divider aria-orientation="vertical" />
          </div>
          <div style={{ width: "100%" }}>
            <div className="content_tabs">
              <h5>Après midi</h5>
              <div>
                <TextInput
                  label="H/D aprés-midi"
                  IconName={AccessAlarmIcon}
                  value={hDAfternon}
                  handleChangeValue={(e) => handleHDS(e)}
                  style={{ width: "100%", borderRadius: 22 }}
                  removeBase
                  useGray
                />
                <div style={{ marginTop: 8 }}>
                  <TextInput
                    label="H/F aprés-midi"
                    IconName={AccessAlarmIcon}
                    value={hFAfternon}
                    handleChangeValue={(e) => handleHFS(e)}
                    style={{ width: "100%", marginTop: 6, borderRadius: 22 }}
                    removeBase
                    useGray
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <Divider />
        <div
          className="isAbsent"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginTop: 22,
            background: "#ff793736",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <CheckBox
            label={"Absent"}
            checked={isAbsent}
            handleChecked={(e) => handleCheckIsAbsent(e)}
          />
          {isAbsent && (
            <TextInput
              label="Motif"
              IconName={TextSnippetIcon}
              value={motif}
              handleChangeValue={(e) => handleMotif(e)}
              style={{ width: "100%", borderRadius: 22 }}
              removeBase
              useGray
            />
          )}
          <TextInput
            label="Heure supplémentaire"
            IconName={HPlusMobiledataIcon}
            value={houreAdded}
            handleChangeValue={(e) => handleChangeHoureAdded(e)}
            style={{ width: "100%", borderRadius: 22 }}
            removeBase
            useGray
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};
