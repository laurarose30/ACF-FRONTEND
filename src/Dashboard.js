import React, { useState, useEffect } from "react";
import Add from "./Add";
import { action, role } from "./constants";
import hasPermission from "./permissions.js";

function Dashboard(props) {
  const [lessons, cLessons] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshList = () => {
    props.client.getLessons().then((response) => cLessons(response.data));
  };

  const removeLesson = (id) => {
    props.client.removeLesson(id).then(() => refreshList());
  };

  const updateLesson = (lesson) => {
    cCurrent(lesson);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const buildrows = () => {
    return lessons.map((current) => {
      return (
        <tr key={current._id}>
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
      Dashboard
      <br />
      <table>
        <thead>
          <tr>
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
