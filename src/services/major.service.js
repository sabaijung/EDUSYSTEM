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

export async function GetAllMajor() {
  try {
    const response = await Instance.get(URLLOCAL + "Major/GetMajor");
    //.log("re:" + response.data);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
