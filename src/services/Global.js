import { request } from "@/server/server";

export function onlineCheck() {
  return request.get('/online');
}

export function logOut() {
  return request.get('/logout');
}