import Instance from "../Helper/axios";
import { URLLOCAL } from "../Helper/baseURL";

export async function GetAllStudent(pageSize, currentPage) {
  try {
    const response = await Instance.get(
      URLLOCAL +
        "Students/GetStudents?pageSize=" +
        pageSize +
        "&currentPage=" +
        currentPage
    );
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function saveStudent(data) {
  try {
    console.log("data:" + JSON.stringify(data));
    const response = await Instance.post("Students/SaveStudent", data);
    return await response.data;
  } catch (error) {
    //console.log("error", error.message);
    console.log(error.response.request._response);
  }
}
