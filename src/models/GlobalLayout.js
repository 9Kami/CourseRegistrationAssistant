import router from "umi/router";

export default {
  namespace: 'globalLayout',
  state: {username:"username", avatar:"", siderCollapsed: false, indexLoading: true, needLogin: false},
  reducers: {
    initialize (state) {
      return {...state, username:"9Kami", avatar:"", indexLoading: false, needLogin: false};
    },

    collapse (state) {
      return {...state, siderCollapsed: !state.siderCollapsed};
    },

    loginInitialize (state) {
      return {...state, indexLoading: false};
    }
  }
}
