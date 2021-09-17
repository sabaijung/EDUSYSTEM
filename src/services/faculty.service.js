import Instance from "../Helper/axios";
import { URLLOCAL } from "../Helper/baseURL";

export async function GetAllFaculty() {
  try {
    const response = await Instance.get(URLLOCAL + "Faculty/GetFaculty");
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}
