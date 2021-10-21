import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import Input from "../../components/Input";
import DropdownList from "../../components/DropdownList";
import Swal from "sweetalert2";
import { monthTH } from "../../Data/month-th.json";
import { saveStudent } from "../../services/student.service";
import validateStudent from "../Setting/Student/ValidateStudent";

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      initial: [],
      year: "",
      stdID: "0",
      titleID: "",
      name: "",
      lastName: "",
      day: "",
      month: "",
      year: "",
      phone: "",
      email: "",
      address: "",
      districtID: "",
      amphur: "",
      province: "",
      postcode: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
  }

  fetchInitial() {
    let strInitial = [
      {
        initialID: "01",
        initialName: "นาย",
      },
      {
        initialID: "02",
        initialName: "นางสาว",
      },
      {
        initialID: "03",
        initialName: "นาง",
      },
    ];

    this.setState({
      initial: strInitial,
    });
  }

  componentDidMount() {
    this.fetchInitial();
  }

  async action(data) {
    let res = "";
    data.birthday = `${data.year + "-" + data.month + "-" + data.day}`;
    if (data.stdID === "0") {
      res = await saveStudent(data);
    }

    if (res !== undefined) {
      if (res.statusCode === "003") {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 500,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "บันทึกข้อมูลไม่สำเร็จ",
          showConfirmButton: false,
          timer: 500,
        });
      }
    }
  }

  //componentWillUnmount() {}

  render() {
    var year = new Date().getFullYear();
    let years = Array.from(new Array(3), (e, index) => year - index);
    return (
      <div>
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>ข้อมูลส่วนตัว</h4>
            </div>
            <div className="card-body">
              <Formik
                validationSchema={validateStudent}
                initialValues={{
                  year: "",
                  stdID: "0",
                  titleID: "",
                  name: "",
                  lastName: "",
                  day: "",
                  month: "",
                  year: "",
                  phone: "",
                  email: "",
                  address: "",
                  districtID: "",
                  amphur: "",
                  province: "",
                  postcode: "",
                  username: "",
                  password: "",
                  confirmPassword: "",
                }}
                enableReinitialize={true}
                onSubmit={(values, { resetForm }) => {
                  this.action(values);
                  resetForm();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  setFieldValue,
                  setFieldTouched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <Input
                        type="hidden"
                        name="stdID"
                        className="form-control"
                        onChange={handleChange}
                        value={values.stdID}
                      />
                      <div className="col-md-3">
                        <label>คำนำหน้าชื่อ</label>
                        <DropdownList
                          name="titleID"
                          defaultInputValue={this.state.initialName}
                          getOptionLabel={(option) => option.initialName}
                          getOptionValue={(option) => option.initialID}
                          options={this.state.initial}
                          placeholder={"--กรุณาเลือก--"}
                          value={values.initial}
                          onChange={async (v) => {
                            setFieldValue("titleID", v.initialID);
                          }}
                          onBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-5">
                        <label>ชื่อ</label>
                        <Input
                          type="text"
                          name="name"
                          className="form-control"
                          onChange={handleChange}
                          value={values.name}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-4">
                        <label>นามสกุล</label>
                        <Input
                          type="text"
                          name="lastName"
                          className="form-control"
                          onChange={handleChange}
                          value={values.lastName}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-2">
                        <label>วันเดือนปีเกิด</label>
                        <select
                          name="year"
                          className="form-control"
                          value={values.year}
                          onChange={(e) => {
                            setFieldValue("year", e.target.value);
                          }}
                          errors={errors}
                          touched={touched}
                        >
                          <option value=""> -- ปี -- </option>
                          {years.map((year, index) => (
                            <option key={`year${index}`} value={year}>
                              {year + 543}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-2">
                        <select
                          name="month"
                          className="form-control"
                          style={{ marginTop: "30px" }}
                          value={values.month}
                          onChange={(e) => {
                            setFieldValue("month", e.target.value);
                          }}
                          errors={errors}
                          touched={touched}
                        >
                          <option value=""> -- เดือน -- </option>
                          {monthTH.map((item, index) => (
                            <option key={item.id} value={item.id} key={item.id}>
                              {item.monthName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-2">
                        <select
                          name="day"
                          className="form-control"
                          style={{ marginTop: "30px" }}
                          value={values.day}
                          onChange={(e) => {
                            setFieldValue("day", e.target.value);
                          }}
                          errors={errors}
                          touched={touched}
                        >
                          <option value=""> -- วัน -- </option>
                          {Array.from(Array(31), (e, i) => (
                            <option
                              key={i + 1 < 10 ? "0" + (i + 1) : i + 1}
                              value={i + 1 < 10 ? "0" + (i + 1) : i + 1}
                            >
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label>เบอร์โทรศัพท์</label>
                        <Input
                          type="text"
                          name="phone"
                          className="form-control"
                          onChange={handleChange}
                          value={values.phone}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-3">
                        <label>อีเมล</label>
                        <Input
                          type="text"
                          name="email"
                          className="form-control"
                          onChange={handleChange}
                          value={values.email}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ค้นหาที่อยู่"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-3">
                        <label>บ้านเลขที่</label>
                        <Input
                          type="text"
                          name="address"
                          className="form-control"
                          onChange={handleChange}
                          value={values.address}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-3">
                        <label>ตำบล</label>
                        <Input
                          type="text"
                          name="districtID"
                          className="form-control"
                          onChange={handleChange}
                          value={values.districtID}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-2">
                        <label>อำเภอ</label>
                        <Input
                          type="text"
                          name="amphur"
                          className="form-control"
                          onChange={handleChange}
                          value={values.amphur}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-2">
                        <label>จังหวัด</label>
                        <Input
                          type="text"
                          name="province"
                          className="form-control"
                          onChange={handleChange}
                          value={values.province}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-2">
                        <label>รหัสไปรษณีย์</label>
                        <Input
                          type="text"
                          name="postcode"
                          className="form-control"
                          onChange={handleChange}
                          value={values.postcode}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>

                    <hr />
                    <h5>ข้อมูลผู้ใช้งาน</h5>
                    <div className="form-group row">
                      <div className="col-md-4">
                        <label>ชื่อผู้ใช้งาน</label>
                        <Input
                          type="text"
                          name="username"
                          className="form-control"
                          onChange={handleChange}
                          value={values.username}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-4">
                        <label>รหัสผ่าน</label>
                        <Input
                          type="password"
                          name="password"
                          className="form-control"
                          onChange={handleChange}
                          value={values.password}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-4">
                        <label>ยืนยันรหัสผ่าน</label>
                        <Input
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                          onChange={handleChange}
                          value={values.confirmPassword}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-12 text-center">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          บันทึก
                        </button>{" "}
                        &nbsp; &nbsp;
                        <button type="reset" className="btn btn-secondary">
                          ล้างข้อมูล
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
