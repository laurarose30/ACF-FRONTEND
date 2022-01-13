import React, { useState, useEffect } from "react";
import Add from "./Add";

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
          <td>{current.name}</td>
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
            <th>Lesson</th>
            <th>Equipment</th>
            <th>Dress</th>
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
