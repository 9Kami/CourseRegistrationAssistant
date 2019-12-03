import * as GlobalService from "@/services/Global";
import * as Server from "@/server/server";

export default {
  namespace: 'chooseCourses',
  state: {
    currentStep: 0,
    needChangeStatus: false,
    previousCourses: [],
    requiredCourseOptions: [],
    electiveCourseOptions: [],
    requiredCoursesSelected: [],
    electiveCoursesSelected: []
  },
  reducers: {
    selectRequiredCourses(state, { payload: { requiredCoursesSelected } }) {
      return {...state, requiredCoursesSelected, currentStep: state.currentStep + 1};
    },

    prevStep(state) {
      return {...state, currentStep: state.currentStep - 1};
    },

    again(state) {
      return {...state, currentStep: 0, needChangeStatus: false};
    },
  
    saveDetermineUpdate(state, { payload: {needChangeStatus, previousCourses} }) {
      return {...state, needChangeStatus, previousCourses};
    },
  
    nextStep(state) {
      return {...state, currentStep: state.currentStep + 1};
    },
  
    saveCourseOptions(state, { payload: {requiredCourseOptions, electiveCourseOptions, toNextStep} }) {
      return {...state, requiredCourseOptions, electiveCourseOptions,
        currentStep: (toNextStep)? state.currentStep + 1:state.currentStep};
    }
  },
  effects: {
    *determineUpdate({}, { call, put }) {
      const response = yield call(GlobalService.getRegisteredCourses);
      if(response.status === Server.SUCCESSFUL) {
        let previousCourses = response.courses.filter(e => e.courseStatus === "In-Progress")
          .map(e => ({ courseID: e.courseId, courseName: e.courseName}));
        let needChangeStatus = previousCourses.length !== 0;
        if(needChangeStatus) {
          yield put({
            type: 'saveDetermineUpdate',
            payload: {
              needChangeStatus,
              previousCourses
            }
          });
        } else {
          yield put({
            type: 'getCourseOptions',
            payload: { toNextStep: false }
          });
        }
      } else {
        console.log(response.message);
      }
    },
    
    *update({ payload : { updateData } }, { call, put }) {
      const response = yield call(GlobalService.registration, updateData);
      console.log(response);
      if(response.status === Server.SUCCESSFUL) {
        yield put({
          type: 'getCourseOptions',
          payload: { toNextStep: true }
        });
      } else {
        console.log(response.message);
      }
    },
    
    *getCourseOptions({ payload : { toNextStep } }, { call, put }) {
      const response = yield call(GlobalService.getCourseOptions);
      console.log(response);
      if(response.status === Server.SUCCESSFUL) {
        yield put({
          type: 'saveCourseOptions',
          payload: {
            requiredCourseOptions: response.requiredCourses,
            electiveCourseOptions: response.electiveCourses.map((e) =>
              ((e.children.length === 0)? {...e, disabled: true}:e)),
            toNextStep
          }
        });
      } else {
        console.log(response.message);
      }
    },
    
    *submit({ payload : { coursesSelected } }, { call, put }) {
      const response = yield call(GlobalService.registration, coursesSelected);
      console.log(response);
      if(response.status === Server.SUCCESSFUL) {
        yield put({
          type: 'nextStep',
        });
      } else {
        console.log(response.message);
      }
    }
  }
}
