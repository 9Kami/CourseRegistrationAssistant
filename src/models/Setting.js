import * as GlobalService from '../services/Global';
import * as Server from '../server/server';

export default {
  namespace: 'setting',
  state: {currTabKey: 'personalInfo', majorOptions: [], nickname:'' , major: []},
  reducers: {
    tabKeyChange(state, { payload: { newTabKey } }) {
      return {...state, currTabKey:newTabKey};
    },
    
    save(state, { payload: { majorOptions, nickname, major } }) {
      return {...state, majorOptions, nickname, major};
    }
  },
  effects: {
    *initialize ({}, { call, put }){
      const [ getMajorResponse, userInfoResponse] = yield [
        call(GlobalService.getMajorOptions),
        call(GlobalService.user)
      ];
      if(getMajorResponse.status === Server.SUCCESSFUL && userInfoResponse.status === Server.SUCCESSFUL ) {
        yield put({
          type: 'save',
          payload: {
            majorOptions: getMajorResponse.degreeMajor,
            nickname: userInfoResponse.user.nickname,
            major: [ userInfoResponse.user.degreeId, userInfoResponse.user.majorId ]
          }
        });
      } else {
        console.log(getMajorResponse.message);
        console.log(userInfoResponse.message);
      }
    },
    
    *updateUserInfo ({ payload: { data } }, { call, put }) {
      console.log(data);
      const response = yield call(GlobalService.updateUserInfo, data);
      console.log(response);
      if(response.status === Server.SUCCESSFUL) {
        yield put({
          type: 'initialize'
        })
      } else {
        console.log(response.message);
      }
    },
  }
}
