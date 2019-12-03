import router from "umi/router";
import * as GlobalService from "@/services/Global";
import * as Server from "@/server/server";

export default {
  namespace: 'dashboard',
  state: {nickname:"", degree:"", major:"", gpa:0, gpaHours:30, inProgressNo:10, completedCourses:[],
    inProgressCourses:[]},
  reducers: {
    show(state, { payload: {nickname, degree, major, gpa, gpaHours, inProgressNo, registeredCourses} }) {
      let completedCourses = registeredCourses.filter(e => e.courseStatus !== "In-Progress");
      let inProgressCourses = registeredCourses.filter(e => e.courseStatus === "In-Progress");
      return {...state, nickname, degree, major, gpa, gpaHours, inProgressNo, completedCourses, inProgressCourses}
    }
  },
  effects: {
    *getDashboardInfo ({}, { call, put }){
      const [ userInfoResponse, gradeInfoResponse, RegisteredCoursesResponse] = yield [
        call(GlobalService.user),
        call(GlobalService.getGradeInfo),
        call(GlobalService.getRegisteredCourses),
        ];
      console.log(userInfoResponse);
      console.log(gradeInfoResponse);
      console.log(RegisteredCoursesResponse);
      if(userInfoResponse.status === Server.SUCCESSFUL && gradeInfoResponse.status === Server.SUCCESSFUL &&
        RegisteredCoursesResponse.status === Server.SUCCESSFUL) {
        yield put({
          type: 'show',
          payload: {
            nickname: userInfoResponse.user.nickname,
            degree: userInfoResponse.user.degree,
            major: userInfoResponse.user.major,
            gpa: gradeInfoResponse.basicGradeInfo.gpa,
            gpaHours: gradeInfoResponse.basicGradeInfo.totalCreditHour,
            inProgressNo: gradeInfoResponse.basicGradeInfo.inProgress,
            registeredCourses: RegisteredCoursesResponse.courses,
          }
        });
      } else {
        console.log(userInfoResponse.message);
        console.log(gradeInfoResponse.message);
        console.log(RegisteredCoursesResponse.message);
      }
    }
  }
}
