import { extend } from 'umi-request';

export const request = extend({
  prefix: 'https://hci.pchan.cn:8443',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
});
