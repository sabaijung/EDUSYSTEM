import React from "react";
import { Fragment, Component } from "react";
import { Formik, Form } from "formik";
import { SaveFaculty } from "../../../services/faculty.service";
import Schema from "./ValidateFaculty";

class FFaculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  async Save(data) {
    this.setState({ loading: true });
    const res = await SaveFaculty(data);
    if (res !== undefined) {
      if (res.statusCode === 1) {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "บันทึกข้อมูลไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    this.setState({ loading: false });
  }

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
                  validationSchema={Schema}
                  initialValues={{
                    facultyName: "",
                    isUsed: "",
                  }}
                  enableReinitialize={true}
                  onSubmit={(value, { resetForm }) => {
                    let data = {
                      facultyName: value.facultyName,
                      isUsed: value.isUsed,
                    };
                    this.Save(data);
                    resetForm();
                  }}
                >
                  {({ errors, touched, handleBlur, setFieldValue, values }) => (
                    <Form>
                      <div className="form-group row">
                        <div className="col-md-6">
                          <label>ชื่อคณะ</label>
                          <input
                            type="text"
                            className="form-control"
                            value={values.facultyName}
                            onChange={(value) => {
                              setFieldValue("facultyName", value);
                            }}
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
                              onChange={(value) => {
                                setFieldValue("isUsed", value);
                              }}
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
                              onChange={(value) => {
                                setFieldValue("isUsed", value);
                              }}
                            />
                            <label className="form-check-label" htmlFor="close">
                              ปิดการสอน
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <button
                          class="btn btn-primary"
                          type="submit"
                          disabled={this.state.loading}
                        >
                          บันทึกข้อมูล
                        </button>
                        &nbsp;
                        <button class="btn btn-secondary">ล้างข้อมูล</button>
                      </div>
                    </Form>
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
