import Instance from "../Helper/axios";
//import axios from "axios";

import { URLLOCAL } from "../Helper/baseURL";

export async function getAllFaculty() {
  try {
    const response = await Instance.get(URLLOCAL + "Faculty/GetAllFaculty");
    // console.log("res:" + JSON.stringify(response));
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function GetAllMajor(pageSize, currentPage, search) {
  try {
    const response = await Instance.get(
      URLLOCAL +
        "Major/GetMajor?pageSize=" +
        pageSize +
        "&currentPage=" +
        currentPage +
        "&search=" +
        search
    );
    //.log("re:" + response.data);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function saveMajor(data) {
  try {
    console.log("data:" + JSON.stringify(data));
    const response = await Instance.post(URLLOCAL + "Major/SaveMajor", data);
    return await response.data;
  } catch (error) {
    //console.log("error", error.message);
    console.log(error.response.request._response);
  }
}

export async function updateMajor(majorCode, data) {
  try {
    const response = await Instance.put(
      URLLOCAL + "Major/UpdateMajor?majorCode=" + majorCode,
      data
    );
    return await response.data;
  } catch (error) {
    console.log("error", error.message);
  }
}
