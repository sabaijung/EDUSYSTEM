import Instance from "../Helper/axios";
//import axios from "axios";

import { URLLOCAL } from "../Helper/baseURL";

export async function GetAllMajor() {
  try {
    const response = await Instance.get(URLLOCAL + "Major/GetMajor");
    console.log("re:" + response.data);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
