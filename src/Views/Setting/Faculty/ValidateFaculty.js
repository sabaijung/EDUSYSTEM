import * as Yup from "yup";

const Schema = Yup.object().shape({
  facultyName: Yup.string().required("กรุณาระบุ ชื่อคณะ"),
  isUsed: Yup.string().required("กรุณาระบุ สถานะ"),
});

export default Schema;
