import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Button, Form } from "react-bootstrap";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { events } from "./events";
import EventForm from "./EventForm";

const CalendarView = () => {
  // const { events } = useSelector((state) => state.calendar);
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  const [showForm, setShowForm] = useState(false);

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  return (
    <>
      {showForm && <EventForm />}
      {!showForm && (
        <Button onClick={() => setShowForm(!showForm)}> Add Event</Button>
      )}

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
