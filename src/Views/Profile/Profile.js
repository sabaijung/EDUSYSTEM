import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import DropdownList from "../../components/DropdownList";
import { monthTH } from "../../Data/month-th.json";

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      initial: [],
      year: "",
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
                // validationSchema={Schema}
                validate={(values) => {
                  const errors = {};
                  if (!values.majorName) {
                    errors.majorName = "จำเป็นต้องระบุข้อมูล";
                  }

                  if (!values.facultyCode) {
                    errors.facultyCode = "จำเป็นต้องระบุข้อมูล";
                  }

                  if (!values.isUsed) {
                    errors.isUsed = "จำเป็นต้องระบุข้อมูล";
                  }
                  return errors;
                }}
                initialValues={{}}
                enableReinitialize={true}
                onSubmit={(values, { resetForm }) => {
                  // console.log("values:" + JSON.stringify(values));
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <input
                        type="hidden"
                        name="stdID"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.stdID}
                      />
                      <div className="col-md-3">
                        <label>คำนำหน้าชื่อ</label>
                        <DropdownList
                          name="initialID"
                          defaultInputValue={this.state.initialName}
                          getOptionLabel={(option) => option.initialName}
                          getOptionValue={(option) => option.initialID}
                          options={this.state.initial}
                          placeholder={"--กรุณาเลือก--"}
                          value={values.initial}
                          onChange={async (v) => {
                            setFieldValue("initialID", v);
                            this.setState({ initialID: v.initialID });
                          }}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="col-md-5">
                        <label>ชื่อ</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                      </div>
                      <div className="col-md-4">
                        <label>นามสกุล</label>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-2">
                        <label>วันเดือนปีเกิด</label>
                        <select
                          name="day"
                          className="form-control"
                          value={values.day}
                          onChange={(e) => {
                            setFieldValue("day", e.target.value);
                          }}
                        >
                          <option value=""> -- วัน -- </option>
                          {Array.from(Array(31), (e, i) => (
                            <option value={i + 1 < 10 ? "0" + (i + 1) : i + 1}>
                              {i + 1}
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
                        >
                          <option value=""> -- เดือน -- </option>
                          {monthTH.map((item, index) => (
                            <option value={item.id} key={item.id}>
                              {item.monthName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-2">
                        <select
                          name="year"
                          className="form-control"
                          style={{ marginTop: "30px" }}
                          value={values.year}
                          onChange={(e) => {
                            setFieldValue("year", e.target.value);
                          }}
                        >
                          <option value=""> -- ปี -- </option>
                          {years.map((year, index) => (
                            <option key={`year${index}`} value={year}>
                              {year + 543}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label>เบอร์โทรศัพท์</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-3">
                        <label>อีเมล</label>
                        <input type="text" className="form-control" />
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
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-3">
                        <label>ตำบล</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-2">
                        <label>อำเภอ</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-2">
                        <label>จังหวัด</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-2">
                        <label>รหัสไปรษณีย์</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <hr />
                    <h5>ข้อมูลผู้ใช้งาน</h5>
                    <div className="form-group row">
                      <div className="col-md-4">
                        <label>ชื่อผู้ใช้งาน</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-4">
                        <label>รหัสผ่าน</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                        />
                      </div>
                      <div className="col-md-4">
                        <label>ยืนยันรหัสผ่าน</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-12 text-center">
                        <button class="btn btn-primary">บันทึก</button> &nbsp;
                        &nbsp;
                        <button class="btn btn-secondary">ล้างข้อมูล</button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
