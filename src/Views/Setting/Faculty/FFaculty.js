import React from "react";
import { Fragment, Component } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { saveFaculty, updateFaculty } from "../../../services/faculty.service";
import Schema from "./ValidateFaculty";
import Swal from "sweetalert2";

class FFaculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facultyCode: 0,
      facultyName: "",
      isUsed: "",
    };
  }

  async action(data) {
    let res = "";
    if (data.facultyCode === 0) {
      res = await saveFaculty(data);
    } else {
      res = await updateFaculty(data.facultyCode, data);
    }

    if (res !== undefined) {
      if (res.statusCode === "003") {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 500,
        });
        this.props.history.push("/showFaculty");
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
    //console.log("t:" + JSON.stringify(this.props.location.state));
    if (this.props.location.state !== undefined) {
      let param = this.props.location.state.value;
      this.setState({
        facultyCode: param.facultyCode,
        facultyName: param.facultyName,
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
                <h4>ข้อมูลคณะ</h4>
              </div>
              <div className="card-body">
                <Formik
                  // validationSchema={Schema}
                  validate={(values) => {
                    const errors = {};
                    if (!values.facultyName) {
                      errors.facultyName = "จำเป็นต้องระบุข้อมูล";
                    }

                    if (!values.isUsed) {
                      errors.isUsed = "จำเป็นต้องระบุข้อมูล";
                    }
                    return errors;
                  }}
                  initialValues={{
                    facultyCode: this.state.facultyCode,
                    facultyName: this.state.facultyName,
                    isUsed: this.state.isUsed,
                  }}
                  // enableReinitialize={true}
                  onSubmit={(values, { resetForm }) => {
                    console.log("values:" + values);
                    this.action(values);
                    resetForm();
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
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
                            name="facultyCode"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.facultyCode}
                          />
                          <label>ชื่อคณะ</label>
                          <input
                            className="form-control"
                            type="text"
                            name="facultyName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.facultyName}
                          />
                          <ErrorMessage
                            component="div"
                            name="facultyName"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      {
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
                              <label
                                className="form-check-label"
                                htmlFor="open"
                              >
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
                              <label
                                className="form-check-label"
                                htmlFor="close"
                              >
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
                      }

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

export default FFaculty;
