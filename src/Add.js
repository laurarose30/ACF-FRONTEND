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
        e.target.lesson.value.split("\n"),
        e.target.level.value,
        e.target.equipment.value.split("\n"),
        e.target.dress.value.split("\n"),
        e.target.instructor.value.split("\n"),
        e.target.date.value,
        e.target.subject.value.split("\n"),
         
      );
    } else {
      result = props.client.addLesson(e.target.lesson.value.split("\n"), e.target.level.value, e.target.equipment.value.split("\n"), e.target.dress.value.split("\n"), e.target.date.value,  e.target.instructor.value.split("\n"), e.target.subject.value.split("\n"),);
      console.log(props.client.addLesson)
     
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

    


   <div className="dash" id="dashpic">
      <form onSubmit={(e) => submitHandler(e)} id="addForm">
        Date:<br/>
        <input
        type="date"
        defaultValue={makeDate(props.currentLesson?.date)}
        name="date"
        disabled={disabled}
       />
     <br/>
     Subject:<br/>
     
        <input className="e-input-group"
          type="text"
          required={true}
          defaultValue={props.currentLesson?.subject.join('\n')}
          name="subject"
          disabled={disabled}
          />
        <br />

        Lesson: 
        <br />
        <textarea
                  
          defaultValue={props.currentLesson?.lesson.join('\n')}
          name="lesson"
          disabled={disabled}
        />
        
        <br/>
      instructor: 
        <br />
        <textarea
          type="text"
          defaultValue={props.currentLesson?.instructor.join('\n')}
          name="instructor"
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
        <textarea
          type="text"
          defaultValue={props.currentLesson?.equipment.join('\n')}
          name="equipment"
          disabled={disabled}
        />
        <br />
        dress:
        <br />
        <textarea
          type="text"
          defaultValue={props.currentLesson?.dress.join('\n')}
          name="dress"
          disabled={disabled}
          />
        <br />
        <br/>
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
