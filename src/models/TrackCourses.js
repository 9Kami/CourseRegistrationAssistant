import * as GlobalService from "@/services/Global";
import * as Server from "@/server/server";
import { message } from "antd";

export default {
  namespace: 'trackCourses',
  state: {completedCourses:[], inProgressCourses:[]},
  reducers: {
    save(state, { payload: { registeredCourses } }) {
      console.log(registeredCourses);
      let completedCourses = registeredCourses.filter(e => e.courseStatus !== "In-Progress");
      let inProgressCourses = registeredCourses.filter(e => e.courseStatus === "In-Progress");
      return {...state, completedCourses, inProgressCourses}
    }
  },
  effects: {
    *getRegisteredCourses({}, { call, put }) {
      const response = yield call(GlobalService.getRegisteredCourses);
      console.log(response);
      if(response.status === Server.SUCCESSFUL) {
        yield put({
          type: 'save',
          payload: {
            registeredCourses: response.courses,
          }
        });
      } else {
        console.log(response.message);
      }
    },
  
    *changeStatus({ payload : { data } }, { call, put }) {
      const response = yield call(GlobalService.registration, data);
      console.log(response);
      if(response.status === Server.SUCCESSFUL) {
        yield put({
          type: 'getRegisteredCourses'
        });
      } else {
        console.log(response.message);
      }
    },
  }
}
