import axios from "axios";
import {action, role} from "./permissions"
const url = "https://acf-training.herokuapp.com/";

export class ApiClient {
  constructor(tokenProvider,newRole, logoutHandler){
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
    if (newRole =="admin"){
      this.role=role.admin;
    } else{
    
        this.role = role.cadet; 
      }}
        


  authenticatedCall(method,url,data){
    console.log(url)
    return axios({
      method,
      url,
      headers: {
        authorization: this.tokenProvider
      },
      data,
    }).catch((error) => {
      if(error.response.status === 403) {
        this.logoutHandler();
        return Promise.reject()
      } else {
      throw error;
    }
    });
  }

  apiCall(method, url, data) {
    return axios({
      method,
      url,
      data,
    }).catch((error) => {
      throw error;
    });
  }

  register(userName, email, password, role){
    return this.apiCall("post", url + "register/", {userName: userName, email:email, password:password, role:role});
  }

  login(userName,password, role) {
    return this.apiCall("post",url + "auth/",{userName: userName, password:password, role:role });
  }

  logout(userName, password, role){
    return this.apiCall("post",url + "auth/",{userName: userName, password:password, role:role });
  }

  getLessons() {
    return this.authenticatedCall("get", url);
  }

  addLesson(lesson, level, equipment, dress, date, instructor, subject) {
    return this.authenticatedCall("post", url, { lesson, level, equipment, dress, date, instructor, subject,  });
   
  }

  removeLesson(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateLesson(id, lesson, level, equipment, dress,  instructor, date, subject,) {
    return this.authenticatedCall("put", `${url}${id}`, { lesson, level, equipment, dress, date, instructor, subject,    });
  }
  findLesson( sLesson, sLevel, sEquipment, sInstructor, sDress, sSubject,  dateMin, dateMax){
    return this.authenticatedCall("post", `${url}lesson/search`, {sLesson, sLevel, sEquipment, sDress, sInstructor, sSubject, dateMin, dateMax });
  }

  getFilteredLessons(level){
    return this.authenticatedCall("get", url, {level});
  }
}
