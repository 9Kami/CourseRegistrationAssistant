import router from "umi/router";

export default {
  namespace: 'chooseCourse',
  state: {
    currentStep: 0,
    needChangeStatus: true,
    previousCourses: [{courseID:"01010101", courseName:"CSCI2301 DSADASDADASasdasdasdas"}],
    majorCourseOptions: [{courseID:"01010101", courseName:"CSCI2301 DSADASDADASasdasdasds"}],
    electiveCourseOptions: [
      {
        value: "Art",
        label: "Art",
        children: [
          {
            value: "English",
            label: "English",
            children: [
              {
                value: "ENGL1205",
                label: "ENGL1205 sadasdasdasdasd",
              }
            ]
          }
        ]
      }
    ]
  },
  reducers: {
    nextStep(state) {
      return {...state, currentStep: state.currentStep + 1}
    },

    prevStep(state) {
      return {...state, currentStep: state.currentStep - 1}
    }
  }
}
