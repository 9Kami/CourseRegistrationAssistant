import { request } from "@/server/server";

export function onlineCheck() {
  return request.get('/online');
}

export function logOut() {
  return request.get('/logout');
}

export function user() {
  return request.get('/user');
}

export function getRegisteredCourses() {
  return request.get('/registration/list');
}

export function getGradeInfo() {
  return request.get('/registration/info');
}

export function getCourseOptions() {
  return request.get('/course/list');
}

export function registration(coursesSelected) {
  return request.post('/registration', {
    data: coursesSelected
  });
}
