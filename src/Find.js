import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";

function Find(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const searchParams = {
      sLesson: e.target.sLesson.value,
      sLevel: e.target.sLevel.value,
      sEquipment: e.target.sEquipment.value,
      sDress: e.target.sDress.value,
      dateMin: e.target.dateMin.value,
      dateMax: e.target.dateMax.value,
    };
    props.querySearch(searchParams);
  };
  return (
    <>
      <Container className="mx-auto formContainer">
        <br/>
        Search Lessons:
        <br/>
        <br />
        <style>{`
   .form2{
    color: #ffffff; 
    background-color: hsl(120, 17%, 53%); 
   
    padding: 1%
    margin:0
    }
  `}</style>
        <div className="dash">
          <form
            className="form2"
            onSubmit={(e) => submitHandler(e)}
            id="findForm"
          >
            Lesson: <br />
            <input
              type="text"
              defaultValue={props.currentLesson?.sLesson}
              name="sLesson"
              disabled={disabled}
              placeholder="Lesson"
            />
            <br />
            Level: <br />
            <input
              type="text"
              defaultValue={props.currentLesson?.sLevel}
              name="sLevel"
              disabled={disabled}
              placeholder="Level"
            />
            <br />
            Equipment: <br />
            <input
              type="text"
              defaultValue={props.currentLesson?.sEquipment}
              name="sEquipment"
              disabled={disabled}
              placeholder="Equipment"
            />
            <br />
            Dress: <br />
            <input
              type="text"
              defaultValue={props.currentLesson?.sDress}
              name="sDress"
              disabled={disabled}
              placeholder="Dress"
            />
            <br />
            First Date:
            <br />
            <input
              type="date"
              defaultValue={props.currentLesson?.dateMin}
              name="dateMin"
              disabled={disabled}
            />
            <br />
            Last Date:
            <br />
            <input
              type="date"
              defaultValue={props.currentLesson?.dateMax}
              name="dateMax"
              disabled={disabled}
            />
            <br />
            <button className="buttonSubmit" type="submit" disabled={disabled}>
              {" "}
              Search{" "}
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Find;
