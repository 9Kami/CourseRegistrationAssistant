import router from "umi/router";
import * as GlobalService from '../services/Global';

export default {
  namespace: 'globalLayout',
  state: {userId:"", username:"", avatar:"", siderCollapsed: false, indexLoading: true},
  reducers: {
    atuoLogin (state) {
      return {...state, username:"9Kami", avatar:"", indexLoading: false};
    },

    collapse (state) {
      return {...state, siderCollapsed: !state.siderCollapsed};
    },
  },
  effects: {
    *initialize ({}, { call, put }){
      const response = yield call(GlobalService.onlineCheck);
      const userId = response.userId;
      console.log(response);
      if(userId === null) {
        router.push("/login");
      } else {
        yield put({
          type: 'atuoLogin',
          payload: {
            userId: userId
          },
        });
      }
    },

    *logOut ({}, { call, put }) {
      const response = yield call(GlobalService.logOut);
      const userId = response.userId;
      console.log(userId);
      if(response.userId !== null) {
        router.push("/login");
      }
    },

    *getBasicInfo ({}, { call, put }){
      const userId = yield call(GlobalService.onlineCheck);
      yield put({
        type: 'getBasicInfo',
        payload: {
          userId: userId
        },
      });
    }
  }
}
