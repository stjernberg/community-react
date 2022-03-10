import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const EventForm = () => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    desctiption: "",
    start: "",
    end: "",
  });

  const { events } = useSelector((state) => state.calendar);
  const [allEvents, setAllEvents] = useState(events);
  const history = useHistory();

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
    console.log(allEvents);
    console.log(newEvent);
  };

  return (
    <>
      {/* onSubmit={handleAddEvent} */}
      <h2>Add New Event</h2>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Desctiption"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, desctiption: e.target.value })
            }
          />
        </Form.Group>
        <DatePicker
          className="mt-3"
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          className="mt-3"
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <Button variant="info" className="mt-3" onClick={handleAddEvent}>
          Add Event
        </Button>
      </Form>
      <Button variant="info" onClick={() => history.push("/calendar")}>
        Back to Calendar
      </Button>
    </>
  );
};

export default EventForm;
