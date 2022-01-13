import axios from "axios";
const url = "http://localhost:3002/";

export class ApiClient {
  constructor(tokenProvider,logoutHandler){
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
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

  login(userName,password) {
    return this.apiCall("post",url + "auth/",{userName: userName, password:password});
  }

  getLesson() {
    return this.authenticatedCall("get", url);
  }

  addLesson(Lesson, equipment, dress) {
    return this.authenticatedCall("post", url, { Lesson, equipment, dress });
  }

  removeLesson(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateLesson(id, Lesson, equipment, dress) {
    return this.authenticatedCall("put", `${url}${id}`, { Lesson, equipment, dress });
  }
}
