import Instance from "../Helper/axios";
import { URLLOCAL } from "../Helper/baseURL";

export async function GetAllTeacher(pageSize, currentPage) {
  try {
    const response = await Instance.get(
      URLLOCAL +
        "Teachers/GetTeacher?pageSize=" +
        pageSize +
        "&currentPage=" +
        currentPage
    );
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getMajorList() {
  try {
    const response = await Instance.get(URLLOCAL + "Majors/GetMajorList");
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getFacultysList() {
  try {
    const response = await Instance.get(URLLOCAL + "Facultys/GetFacultyList");
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function saveTeacher(data) {
  try {
    const response = await Instance.post(
      URLLOCAL + "Teachers/SaveTeacher",
      data
    );
    return await response.data;
  } catch (error) {
    console.log(error.response.request._response);
  }
}

export async function updateTeacher(teacherCode, data) {
  try {
    const response = await Instance.put(
      URLLOCAL + "Teachers/UpdateTeacher?teacherCode=" + teacherCode,
      data
    );
    return await response.data;
  } catch (error) {
    console.log("error", error.message);
  }
}

export async function deleteTeacher(teacherCode) {
  try {
    const response = await Instance.delete(
      URLLOCAL + "Teachers/DeleteTeacher?teacherCode=" + parseInt(teacherCode)
    );
    return await response.data;
  } catch (error) {
    console.log("error", error.message);
  }
}
