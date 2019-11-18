import router from "umi/router";

export default {
  namespace: 'chooseCourses',
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
                value: {
                  courseID:"ENGL1205",
                  courseName:"ENGL1205 sadasdasdasdasd"
                },
                label: "ENGL1205 sadasdasdasdasd",
              }
            ]
          }
        ]
      }
    ],
    majorCourseSelected: [],
    electiveCourseSelected: []
  },
  reducers: {
    nextStep(state) {
      return {...state, currentStep: state.currentStep + 1}
    },

    prevStep(state) {
      return {...state, currentStep: state.currentStep - 1}
    },

    again(state) {
      return {...state, currentStep: 0, needChangeStatus: true}
    },

    update(state) {
      return {...state, currentStep: state.currentStep + 1}
    }
  }
}
