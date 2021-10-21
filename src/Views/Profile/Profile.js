import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import Input from "../../components/Input";
import DropdownList from "../../components/DropdownList";
import SearchAddress from "../../components/SearchAddress";
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
                          value={values.name}
                          onChange={(v) => {
                            setFieldValue("name", v);
                          }}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-4">
                        <label>นามสกุล</label>
                        <Input
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          value={values.lastName}
                          onChange={(v) => {
                            setFieldValue("lastName", v);
                          }}
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
                          value={values.phone}
                          onChange={(v) => {
                            setFieldValue("phone", v);
                          }}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-3">
                        <label>อีเมล</label>
                        <Input
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={(v) => {
                            setFieldValue("email", v);
                          }}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-12">
                        <SearchAddress
                          onChange={(value) => {
                            setFieldValue("use_address", false);
                            if (value !== "") {
                              setFieldValue(
                                "districtID",
                                value.subdistrictName
                              );
                              setFieldValue("amphur", value.districtName);
                              setFieldValue("province", value.provinceName);
                              setFieldValue("postcode", value.postCode);
                            } else {
                              setFieldValue("districtID", "");
                              setFieldValue("amphur", "");
                              setFieldValue("province", "");
                              setFieldValue("postcode", "");
                            }
                          }}
                          name="SearchAddress"
                          placeholder="ค้นหา"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-3">
                        <label>บ้านเลขที่</label>
                        <Input
                          type="text"
                          name="address"
                          value={values.address}
                          onChange={(v) => {
                            setFieldValue("address", v);
                          }}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-3">
                        <label>ตำบล</label>
                        <Input
                          type="text"
                          name="districtID"
                          value={values.districtID}
                          onChange={(v) => {
                            setFieldValue("districtID", v);
                          }}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-2">
                        <label>อำเภอ</label>
                        <Input
                          type="text"
                          name="amphur"
                          value={values.amphur}
                          onChange={(v) => {
                            setFieldValue("amphur", v);
                          }}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-2">
                        <label>จังหวัด</label>
                        <Input
                          type="text"
                          name="province"
                          value={values.province}
                          onChange={(v) => {
                            setFieldValue("province", v);
                          }}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-2">
                        <label>รหัสไปรษณีย์</label>
                        <Input
                          type="text"
                          name="postcode"
                          value={values.postcode}
                          onChange={(v) => {
                            setFieldValue("postcode", v);
                          }}
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
                          value={values.username}
                          onChange={(v) => {
                            setFieldValue("username", v);
                          }}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-4">
                        <label>รหัสผ่าน</label>
                        <Input
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={(v) => {
                            setFieldValue("password", v);
                          }}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="col-md-4">
                        <label>ยืนยันรหัสผ่าน</label>
                        <Input
                          type="password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={(v) => {
                            setFieldValue("confirmPassword", v);
                          }}
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
