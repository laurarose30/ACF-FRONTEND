import React, { useState, useEffect } from "react";
import Add from "./Add";
import { action, role } from "./constants";
import hasPermission from "./permissions.js";
import Moment from "react-moment";


function Dashboard(props) {
  const [Lesson, cLesson] = useState([]);
  const [current, cCurrent] = useState(undefined);
  

  const refreshList = () => {
    props.client.getLesson().then((response) => cLesson(response.data));
  };

  const removeLesson = (id) => {
    props.client.removeLesson(id).then(() => refreshList());
  };

  const updateLesson = (Lesson) => {
    cCurrent(Lesson);
  };

  useEffect(() => {
    refreshList();
  }, []);


  const buildrows = () => {
    return Lesson.map((current) => {
      return (
        <tr key={current._id}>
          <td><Moment format="dd-MM-yyyy">{current.date}</Moment></td>
          <td>{current.lesson}</td>
          <td>{current.equipment}</td>
          <td>{current.dress}</td>
          <td>
            {hasPermission (props.client.role, action.removeLesson)&& (
            <button onClick={() => removeLesson(current._id)}> remove</button>
            )}
            {hasPermission (props.client.role, action.updateLesson) && (
            <button onClick={() => updateLesson(current)}> update</button>
            )}
            
            </td>
        </tr>
      );
    });
  };

  return (
    <>
    <button onClick={props.logout}>Logout</button>
    <br/>
      Cadet Lessons
      <br />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Lesson</th>
            <th>Equipment</th>
            <th>Dress</th>
          </tr>
        </thead>
        <tbody>{buildrows()}</tbody>
      </table>
      <br />
      <br />
      {hasPermission (props.client.role, action.addLesson)&& (
      <Add
        client={props.client}
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        currentLesson={current}
      />
      )}
    </>
  );
}

export default Dashboard;
