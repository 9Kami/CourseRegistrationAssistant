import router from "umi/router";
import * as GlobalService from '../services/Global';
import * as Server from '../server/server';

export default {
  namespace: 'globalLayout',
  state: {userId:"", nickname:"", avatar:"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
    siderCollapsed: false, indexLoading: true},
  reducers: {
    atuoLogin (state, { payload: {nickname} }) {
      return {...state, nickname, indexLoading: false};
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
      if(response.status === Server.SUCCESSFUL) {
        yield put({
          type: 'getBasicInfo'
        });
      } else {
        router.push("/login");
      }
    },

    *logOut ({}, { call, put }) {
      const response = yield call(GlobalService.logOut);
      const userId = response.userId;
      console.log(response);
      if(response.status === Server.SUCCESSFUL) {
        router.push("/login");
      } else {
        console.log(response.message);
      }
    },

    *getBasicInfo ({}, { call, put }){
      const response = yield call(GlobalService.user);
      console.log(response);
      if(response.status === Server.SUCCESSFUL) {
        yield put({
          type: 'atuoLogin',
          payload: {
            nickname: response.user.nickname
          }
        });
      } else {
        console.log(response.message);
      }
    }
  }
}
