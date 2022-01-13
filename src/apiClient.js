import axios from "axios";
const url = "http://localhost:3002/";

export class ApiClient {
  constructor(tokenProvider,logoutHandler, role){
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
    this.role = role;
  }


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

  getLessons() {
    return this.authenticatedCall("get", url);
  }

  addLesson(name, equipment, dress) {
    return this.authenticatedCall("post", url, { name, equipment,dress });
  }

  removeLesson(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateLesson(id, name, equipment, dress) {
    return this.authenticatedCall("put", `${url}${id}`, { name, equipment, dress });
  }
}
