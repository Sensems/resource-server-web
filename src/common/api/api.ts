import { API } from "./api.d";
import { http } from "./index";

export function resources(data: API.Playload.Resources) {
  return http.post<API.Response.Resources>('/resources', data);
}
export function upload(data: API.Playload.Upload, config: any) {
  return http.post<API.Response.Resources>('/upload', data, config);
}
export function renameFolder(data: API.Playload.RenameFolder) {
  return http.post<any>('/renameFolder', data);
}
export function createFolder(data: API.Playload.CreateFolder) {
  return http.post<any>('/createFolder', data);
}
export function deleteFolder(data: API.Playload.DeleteFolder) {
  return http.post<any>('/deleteFolder', data);
}
export function renameFile(data: API.Playload.RenameFile) {
  return http.post<any>('/renameFile', data);
}
export function moveFile(data: API.Playload.moveFile) {
  return http.post<any>('/resourmoveFileces', data);
}
export function deleteFile(data: API.Playload.DeleteFile) {
  return http.post<API.Response.Resources>('/deleteFile', data);
}
export function login(data: API.Playload.Login) {
  return http.post<API.Response.UserInfo>('/user/login', data);
}
export function logout() {
  return http.post('/user/logout', {});
}
export function userList() {
  return http.post<API.Response.UserList>('/user/list', {});
}
export function deleteUser(data: API.Playload.DeleteUser) {
  return http.post('/user/deleteUser', data);
}
export function addUser(data: API.Playload.AddUser) {
  return http.post('/user/addUser', data);
}
export function checkLogin() {
  return http.post<Boolean>('/user/checkLogin', {});
}