import React, { useState, useEffect } from "react";
import Add from "./Add";
import { action, role } from "./constants";
import hasPermission from "./permissions.js"
import './Style.css'
import Moment from "react-moment";
import Find from "./Find";
// import { Navbar.Brand } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import filter from "./Filter";



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
  const refreshListFind = (lesson) => {
    props.client.getLessons(lesson).then((response) => cLesson(response.data))
  }
  
  const querySearch = (searchParams) => {
    props.client.findLesson(searchParams).then((response) => changeSearch(response.data))
  }
  
  useEffect(() => {
    refreshList();
  }, []);


  const buildrows = () => {
    return Lesson.map((current) => {
      return (
        <tr key={current._id}>
          
          <td><Moment format="DD-MM-yyyy">{current.date}</Moment></td>
          <td>{current.lesson}</td>
          <td>{current.level}</td>
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
          <td><Moment format="DD-MM-yyyy">{current.date}</Moment></td>
         
            <td>{current.lesson}</td>
            <td>{current.level}</td>
            <td>{current.equipment}</td>
            <td>{current.dress}</td>
        </tr>
      );
    });
  };

  return (
    
    <>
    <style>{`
   table{
    color: black; 
    padding: 1%;
    margin:0
        }
  `}</style>
<div id='button'>
    <button onClick={props.logout}>Logout</button>
    <br/>
    </div>
      
    <div className="dash">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Lesson</th>
            <th>Level</th>
            <th>Equipment</th>
            <th>Dress</th>
            <tr></tr>
          </tr>
        </thead>
        <tbody>{buildrows()}</tbody>
      </table> 
      </div>  
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
   <style>{`
   table{
    color: black; 
    padding: 1%;
    margin:0
        }
  `}</style>
   <div className="dash">
<table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Lesson</th> 
            <th>Level</th>
            <th>Equipment</th>
            <th>Dress</th>
          </tr>
        </thead>
        <tbody>{buildsearchrows()}</tbody>
      </table>
      </div>
      <>
  
</>
      <Find
          client={props.client}
          refreshListFind = {refreshListFind}
          querySearch = {querySearch}
          currentLesson={current}
        />
      <br/>
         <button className="see-less-btn" onClick={() => setShow2(!show2)}>See less</button>
        <button className="see-less-btn" onClick={() => querySearch({dateMax: new Date(0)})}>Clear Filtered List</button>
    
        
        </>
 
  );
}

export default Dashboard;
