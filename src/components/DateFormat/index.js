import React from "react";
import { format } from "date-fns";
import { useColors, Fonts } from "@common";
import { makeStyles } from "@mui/styles";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

export default ({ date, style, avoidTime }) => {
  const Colors = useColors();
  const classes = useStyle();

  return (
    <p className={[classes.itemDate, style]} style = {{color: Colors.backText, fontSize: "12px"}}>
      <CalendarMonthIcon  style = {{color: Colors.blackText, fontSize: 12}} />{" "}
      {format(date, "dd/MM/yyyy")}{" "}
      {!avoidTime && (<AccessAlarmIcon  style = {{color: Colors.blackText, fontSize: 12}} />)}{" "}
      {!avoidTime && format(date, "HH:mm")}
    </p>
  )
}

const useStyle = makeStyles({
  itemDate: {
    fontFamily: Fonts().primaryRegular
  },
});