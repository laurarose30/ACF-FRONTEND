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
        e.target.name.value,
        e.target.equipment.value,
        e.target.dress.value
      );
    } else {
      result = props.client.addLesson(e.target.name.value, e.target.equipment.value, e.target.dress.value);
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
      {props.currentLesson ? "Update" : "Add"}
      <br />

      <form onSubmit={(e) => submitHandler(e)} id="addForm">
        Name: <br />
        <input
          type="text"
          defaultValue={props.currentLesson?.name}
          name="name"
          disabled={disabled}
        />
        <br />
        Equipment:
        <br />
        <input
          type="text"
          defaultValue={props.currentLesson?.equipment}
          name="equipment"
          disabled={disabled}
        />
        <br />
        Dress:
        <br/>
        <input
          type="text"
          defaultValue={props.currentLesson?.price}
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
