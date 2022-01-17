import axios from "axios";
import {action, role} from "./permissions"
const url = "http://localhost:3002/";

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

  login(userName,password, role) {
    return this.apiCall("post",url + "auth/",{userName: userName, password:password, role:role });
  }

  logout(userName, password, role){
    return this.apiCall("post",url + "auth/",{userName: userName, password:password, role:role });
  }

  getLessons() {
    return this.authenticatedCall("get", url);
  }

  addLesson(lesson, equipment, dress) {
    return this.authenticatedCall("post", url, { lesson, equipment,dress });
  }

  removeLesson(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateLesson(id, lesson, equipment, dress) {
    return this.authenticatedCall("put", `${url}${id}`, { lesson, equipment, dress });
  }
}
