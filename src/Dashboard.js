import React, { useState, useEffect } from "react";
import Add from "./Add";
import { action, role } from "./constants";
import hasPermission from "./permissions.js";
import Moment from "react-moment";
// import { Row } from "react-bootstrap";
// import { Col } from "react-bootstrap";
import Find from "./Find";
// import { Table } from "react-bootstrap";


function Dashboard(props) {
  const [Lesson, cLesson] = useState([]);
  const [search, changeSearch] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [show,setShow]=useState(false);
  const [show2,setShow2]=useState(false);
  

  const refreshList = () => {
    props.client.getLessons().then((response) => cLesson(response.data));
  };

  const removeLesson = (id) => {
    props.client.removeLesson(id).then(() => refreshList());
  };

  const updateLesson = (Lesson) => {
    cCurrent(Lesson);
    cCurrent(Lesson);
    setShow(!show)
  };
  const clearFunction = () => {
    updateLesson(undefined)
  }
  const refreshListFind = (location) => {
    props.client.getLocation(location).then((response) => cLesson(response.data))
  }

  const querySearch = (searchParams) => {
    props.client.queryResult(searchParams).then((response) => changeSearch(response.data))
  }
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

  const buildsearchrows = () => {
    return search.map((current) => {
      return (
        <tr key={current._id}>
          <td><Moment format="dd-MM-yyyy">{current.date}</Moment></td>
            <td>{current.lesson}</td>
            <td>{current.equipment}</td>
            <td>{current.dress}</td>
          <td>
            <button className="buttonUpdate" onClick={() => updateLesson(current)}> update</button>
            <button className="buttonRemove" onClick={() => removeLesson(current._id)}> remove</button>
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

<table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Lesson</th>
            <th>Equipment</th>
            <th>Dress</th>
          </tr>
        </thead>
        <tbody>{buildsearchrows()}</tbody>
      </table>

      <Find
          client={props.client}
          refreshListFind = {refreshListFind}
          querySearch = {querySearch}
          currentLesson={current}
        />
      
        <button className="see-less-btn" onClick={() => setShow2(!show2)}>See less</button>
        <button className="see-less-btn" onClick={() => refreshList()}>Clear Filtered List</button>
    
        
        </>
 
  );
}

export default Dashboard;
