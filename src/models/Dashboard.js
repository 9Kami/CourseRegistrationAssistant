import router from "umi/router";
import * as GlobalService from "@/services/Global";
import * as Server from "@/server/server";

export default {
  namespace: 'dashboard',
  state: {nickname:"", degree:"", major:"", gpa:0, gpaHours:30, inProcessNo:10, completedCourses:0, inProcessCourses:30},
  reducers: {
    show(state, { payload: {nickname, degree, major} }) {
      return {...state, nickname, degree, major}
    }
  },
  effects: {
    *getDashboardInfo ({}, { call, put }){
      const response = yield call(GlobalService.user);
      console.log(response);
      if(response.status === Server.SUCCESSFUL) {
        yield put({
          type: 'show',
          payload: {
            nickname: response.user.nickname,
            degree: response.user.degree,
            major: response.user.major
          }
        });
      } else {
        console.log(response.message);
      }
    }
  }
}
