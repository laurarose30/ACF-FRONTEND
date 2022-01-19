import React, { useState } from "react";

function Add(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentLesson) {
      result = props.client.updateLesson(
        props.currentLesson._id,
        e.target.lesson.value,
        e.target.equipment.value,
        e.target.dress.value,
        e.target.date.value
      );
    } else {
      result = props.client.addLesson(e.target.lesson.value, e.target.equipment.value, e.target.dress.value, e.target.date.value);
      console.log( e.target.lesson.value)
    }
    result
      .then(() => {
        cDisabled(false);
        document.getElementById("addForm").reset();
        return props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };
  const makeDate = (date) => {
    return date && new Date(date).toISOString().substr(0,16)
  }
  return (
    <>
      {props.currentLesson ? "Update" : "Add"}
      <br />

      <form onSubmit={(e) => submitHandler(e)} id="addForm">
        Date:<br/>
        <input
        type="date"
        defaultValue={makeDate(props.currentLesson?.date)}
        name="date"
        disabled={disabled}
      />
      
        Name: <br />
        <input
          type="text"
          defaultValue={props.currentLesson?.lesson}
          name="lesson"
          disabled={disabled}
        />
        <br />
        equipment:
        <br />
        <input
          type="text"
          defaultValue={props.currentLesson?.equipment}
          name="equipment"
          disabled={disabled}
        />
        <br />
        dress:
        <br />
        <input
          type="text"
          defaultValue={props.currentLesson?.dress}
          name="dress"
          disabled={disabled}
          />
        <br />
        <button type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
      </form>
    </>
  );
}

export default Add;
