import React, {  useEffect } from "react";
import { useDispatch } from "react-redux";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useHistory } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import { events } from "./events";
import { setEvents } from "../redux/calendarSlice";

const CalendarView = () => {

  const history = useHistory();
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEvents(events));
  }, [dispatch]);

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  return (
    <>
    
      <h1>Calendar</h1>

      <Button onClick={() => history.push("/eventForm")}>Add Event</Button>
    
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </>
  );
};

export default CalendarView;
