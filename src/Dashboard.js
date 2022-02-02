import React, { useState, useEffect } from "react";
import Add from "./Add";
import { action, role } from "./constants";
import hasPermission from "./permissions.js";
import "./Style.css";
import Moment from "react-moment";
import Find from "./Find";
import {Nav, Navbar, Button } from "react-bootstrap";
import { image } from "./logoarmy.png";

function Dashboard(props) {
  const [Lesson, cLesson] = useState([]);
  const [search, changeSearch] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [levelFilter, setLevelFilter] = useState("");
  const [getFilteredLessons, setFilteredLessons] = useState([]);
  const levels = ["basic", "one star", "two star", "three star"];


  //given data will filter by the levelFilter
  const filterDataByLevel = (data) => {
    if (levelFilter !== "all") {
      let returndata = data.filter((lesson) => lesson.level === levelFilter);
      console.log(returndata);
      return returndata;
    }
    return data;
  };


  //this function fires every time levelFilter changes
  useEffect(() => {
    let filteredLessons = filterDataByLevel(Lesson);
    setFilteredLessons(filteredLessons);
  }, [levelFilter]);

  const headerOptions = [
    {
      id: "Date",
    },
    {
      id:"subject",
    },
    {
      id: "Lesson",
    },
 
    {
      id: "Level",
    },
    {                                    
      id: "Equipment",
    },
    {
      id: "Dress",
    }, 
    {
      id:"Instructor",
    },
  
    
  ];

  
  const renderLevelOptions = () => ["all", ...levels];

  const renderDropdown = (currentVal, changeFunc, options) => {
    return (
      <select value={currentVal} onChange={changeFunc}>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    );
  };

  const refreshList = () => {
    props.client.getLessons().then((response) => {
      cLesson(response.data);
      let filteredLessons = filterDataByLevel(response.data);
      setFilteredLessons(filteredLessons);
      console.log(filteredLessons)
    });
  };

  const removeLesson = (id) => {
    props.client.removeLesson(id).then(() => refreshList());
  };

  const updateLesson = (Lesson) => {
    console.log(Lesson)
    cCurrent(Lesson);
    cCurrent(Lesson);
    setShow(!show);
  };
  const clearFunction = () => {
    updateLesson(undefined);
  };
  const refreshListFind = (lesson) => {
    props.client.getLessons(lesson).then((response) => cLesson(response.data));
  };

  const querySearch = (searchParams) => {
    props.client
      .findLesson(searchParams)
      .then((response) => changeSearch(response.data));
  };
 
  //The first tiem the page is loaded the list of lessons is refereshed
  useEffect(() => {
    refreshList();
  }, []);

  

  
  

  const buildrows = () => {
    return getFilteredLessons.map((current) => {
     
      return (
        <tr key={current._id}>
         
          <td>
            <Moment format="DD-MM-yyyy">{current.date}</Moment>
          </td>
           <td>{current.subject.map((session) => { return (
     <div>
       {session}
       
    </div>)})}</td>
          <td>
     {current.lesson.map((session) => { return (
     <div>
       {session}
       
    </div>)})}
  
 </td>
           <td>{current.level}</td>
           <td>{current.equipment.map((session) => { return (
     <div>
       {session}
       
    </div>)})}</td>
          <td>{current.dress.map((session) => { return (
     <div>
       {session}
       
    </div>)})}</td>
           <td>{current.instructor.map((session) => { return (
     <div>
       {session}
       
    </div>)})}</td>
           
           
          <td>
            {hasPermission(props.client.role, action.removeLesson) && (
              <button onClick={() => removeLesson(current._id)}> remove</button>
            )}
            {hasPermission(props.client.role, action.updateLesson) && (
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
          <td>
            <Moment format="DD-MM-yyyy">{current.date}</Moment>
          </td>
          <td>{current.subject}</td>
          <td>{current.lesson}</td>
          <td>{current.level}</td>
          <td>{current.equipment}</td>
          <td>{current.dress}</td>
          <td>{current.instructor}</td>
         
         
          
        </tr>
      );
    });
  };

  return (
    <>

    <Nav>
        
         
          <Navbar id="nav">
          <img src={"logoarmy.png"} height={100} width={100} />
          
            ACF Training
           
           <Button id="logout" onClick={props.logout}>Logout</Button>
           
           </Navbar>
          
   </Nav>

      <style>{`
   table{
    color: black; 
    padding: 1%;
    margin:0
        }
  `}</style>
      <div id="buttonlogout">
        
      
        <br />
      </div>

        <div class ="dash">

      <table>
        <thead>
          <tr>
            {headerOptions.map((header) => (
              <th className={props.headerSection}>
                {header.id}
                {header.filterOptions && <div>{header.filterOptions()}</div>}
              </th>
            ))}

            <select onChange={ (e) => setLevelFilter(e.target.value)}>
              <option value="all">All stars</option>
              <option value="basic">basic</option>
              <option value="one star">one star</option>
              <option value="two star">two star</option>
              <option value="three star">three star</option>

            </select>
          </tr>
        </thead>
        <tbody>{buildrows()}</tbody>
      </table> 
      </div>  
      <br />
      <br />
      {hasPermission(props.client.role, action.addLesson) && (
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
              <th>Subject</th>
              <th>Lesson</th>
              <th>Level</th>
              <th>Equipment</th>
              <th>Dress</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>{buildsearchrows()}</tbody>
        </table>
      </div>
      <>
      
</>
      <Find
        client={props.client}
        refreshListFind={refreshListFind}
        querySearch={querySearch}
        currentLesson={current}
      />
      <br />
      <button className="see-less-btn" onClick={() => setShow2(!show2)}>
        See less
      </button>
      <button
        className="see-less-btn"
        onClick={() => querySearch({ dateMax: new Date(0) })}
      >
        Clear Filtered List
      </button>
    </>
  );
}


 
export default Dashboard;
