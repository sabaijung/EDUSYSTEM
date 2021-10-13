import React from "react";
import { Fragment, Component } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import DropdownList from "../../../components/DropdownList";
import {
  getAllFaculty,
  saveMajor,
  updateMajor,
} from "../../../services/major.service";
import Swal from "sweetalert2";

class FMajor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      majorCode: "0",
      majorName: "",
      facultyCode: "",
      isUsed: "",
      faculty: [],
    };
  }

  async componentDidMount() {
    this.fetchAllFaculty();
  }

  async fetchAllFaculty() {
    let rsFaculty = await getAllFaculty();
    rsFaculty.statusCode === "001"
      ? this.setState({ faculty: rsFaculty.data })
      : this.setState({ faculty: [] });
  }

  async action(data) {
    let res = "";
    if (data.majorCode === "0") {
      res = await saveMajor(data);
    } else {
      res = await updateMajor(data.majorCode, data);
    }

    if (res !== undefined) {
      if (res.statusCode === "003") {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 500,
        });
        this.props.history.push("/showMajor");
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

  async componentWillMount() {
    if (this.props.location.state !== undefined) {
      let param = this.props.location.state.value;
      console.log("param:" + JSON.stringify(param.facultyCode));
      this.setState({
        majorCode: param.majorCode,
        majorName: param.majorName,
        facultyCode: param.facultyCode,
        isUsed: param.isUsed,
      });
    } else {
      console.log("444");
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="card card-primary">
              <div className="card-header">
                <h4>ข้อมูลสาขาวิชา</h4>
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
                  initialValues={{
                    majorCode: this.state.majorCode,
                    majorName: this.state.majorName,
                    facultyCode: this.state.facultyCode,
                    isUsed: this.state.isUsed,
                  }}
                  enableReinitialize={true}
                  onSubmit={(values, { resetForm }) => {
                    console.log("values:" + JSON.stringify(values));
                    this.action(values);
                    resetForm();
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <div className="col-md-6">
                          <input
                            type="hidden"
                            name="majorCode"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.majorCode}
                          />
                          <label>ชื่อสาขาวิชา</label>
                          <input
                            className="form-control"
                            type="text"
                            name="majorName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.majorName}
                          />
                          <ErrorMessage
                            component="div"
                            name="majorName"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-6">
                          <label>ชื่อคณะ</label>
                          <DropdownList
                            name="facultyCode"
                            getOptionLabel={(option) => option.facultyName}
                            getOptionValue={(option) => option.facultyCode}
                            options={this.state.faculty}
                            placeholder={"-- กรุณาเลือกชื่อคณะ --"}
                            value={values.faculty}
                            onChange={async (v) => {
                              setFieldValue("facultyCode", v.facultyCode);
                            }}
                            onBlur={handleBlur}
                            onSelect={handleChange}
                          />
                          <ErrorMessage
                            component="div"
                            name="facultyCode"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-md-6">
                          <label>สถานะ</label>
                          <br />
                          <div className="form-check form-check-inline">
                            <input
                              style={{ width: "20px", height: "20px" }}
                              className="form-check-input"
                              type="radio"
                              name="isUsed"
                              id="open"
                              value="1"
                              onChange={handleChange}
                              defaultChecked={values.isUsed === "1"}
                            />
                            <label className="form-check-label" htmlFor="open">
                              เปิดสอน
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              style={{ width: "20px", height: "20px" }}
                              className="form-check-input"
                              type="radio"
                              name="isUsed"
                              id="close"
                              value="0"
                              onChange={handleChange}
                              defaultChecked={values.isUsed === "0"}
                            />
                            <label className="form-check-label" htmlFor="close">
                              ปิดการสอน
                            </label>
                          </div>
                          <ErrorMessage
                            component="div"
                            name="isUsed"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          บันทึกข้อมูล
                        </button>
                        &nbsp;
                        <button className="btn btn-secondary">
                          ล้างข้อมูล
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
              {/** close tag card-body */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FMajor;
