import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";

function Find(props) {
  const [disabled, cDisabled] = useState(false);
 

  const submitHandler = (e) => {
    e.preventDefault();
    const searchParams = {
      sLesson: e.target.sLesson.value,
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
        <h5 className="findHeader">Searching for:</h5>
        <br />
        <style>{`
   .form2{
    color: #ffffff; 
    background-color: #fc86ad; 
     align-items:center;
    padding: 1%
    }
  `}</style>
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
      </Container>
    </>
  );
}

export default Find;
