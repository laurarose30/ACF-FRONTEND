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
        e.target.level.value,
        e.target.equipment.value,
        e.target.dress.value,
        e.target.date.value
      );
    } else {
      result = props.client.addLesson(e.target.lesson.value, e.target.level.value, e.target.equipment.value, e.target.dress.value, e.target.date.value);
      
     
    }
    result
      .then(() => {
        cDisabled(false);
       
        document.getElementById("addForm").reset();
         
        props.refreshList();
        
      }    )
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
      {props.currentLesson ? "Update" : "Add Lesson"}
      <br />
      <br />
      <style>{`
   form{
    color: #ffffff; 
    background-color: hsl(120, 17%, 53%); 
   
    padding: 1%
    margin:0
    }
  `}</style>

   <div className="dash">
      <form onSubmit={(e) => submitHandler(e)} id="addForm">
        Date:<br/>
        <input
        type="date"
        defaultValue={makeDate(props.currentLesson?.date)}
        name="date"
        disabled={disabled}
      />
      <br/>
        Name: 
        <br />
        <input
          type="text"
          defaultValue={props.currentLesson?.lesson}
          name="lesson"
          disabled={disabled}
        />
        <br />
        level:
        <br />
        <input
          type="text"
          defaultValue={props.currentLesson?.level}
          name="level"
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
      </div>
      <br/>
      <br/>
    </>
  );
}

export default Add;
