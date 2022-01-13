import React, { useState, useEffect } from "react";
import Add from "./Add";

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
          <td>{current.Lesson}</td>
          <td>{current.equipment}</td>
          <td>{current.dress}</td>
          <td>
            <button onClick={() => removeLesson(current._id)}> remove</button>
            <button onClick={() => updateLesson(current)}> update</button>
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
            <th>Lesson Name</th>
            <th>equipment</th>
            <th>dress</th>
          </tr>
        </thead>
        <tbody>{buildrows()}</tbody>
      </table>
      <br />
      <br />
      <Add
        client={props.client}
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        currentLesson={current}
      />
    </>
  );
}

export default Dashboard;
