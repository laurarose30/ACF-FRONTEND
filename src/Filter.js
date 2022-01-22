import React from "react";
  const level = ['Basic', 'One Star', 'Two Star', 'Three Star']; 

  function filter(){

  
      return (
          <div>
              {level.filter(level => level.includes('Basic')).map(filteredLevel => (
                  <li>
                      {filteredLevel}             
                   </li>
              ))}
          </div>
      );

  }
  export default filter;