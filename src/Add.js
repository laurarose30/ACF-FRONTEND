import React, { useState } from "react";

function Add(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentLesson) {
      result = props.client.updateLesson(
        props.currentAd._id,
        e.target.Lesson.value,
        e.target.equipment.value,
        e.target.dress
      );
    } else {
      result = props.client.addLesson(e.target.Lesson.value, e.target.equipment.value, e.target.dress.value);
    }
    result
      .then(() => {
        cDisabled(false);
        document.getElementById("addForm").reset();
        props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };

  return (
    <>
      {props.currentAd ? "Update" : "Add"}
      <br />

      <form onSubmit={(e) => submitHandler(e)} id="addForm">
        addLesson: <br />
        <input
          type="text"
          defaultValue={props.currentLesson?.Lesson}
          name="adName"
          disabled={disabled}
        />
        <br />
        equipment:
        <br />
        <input
          type="text"
          defaultValue={props.currentLesson?.equipment}
          name="price"
          disabled={disabled}
        />
        <br />
        dress:
        <br />
        <input
          type="text"
          defaultValue={props.currentLesson?.dress}
          name="price"
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
