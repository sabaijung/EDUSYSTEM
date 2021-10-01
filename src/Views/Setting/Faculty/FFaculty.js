import React from "react";
import { Fragment } from "react";
import { Component } from "react";

class FFaculty extends Component {
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
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>ชื่อคณะ</label>
                    <input type="text" className="form-control" />
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
                        name="open"
                        id="open"
                        value="1"
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
                        name="close"
                        id="close"
                        value="0"
                      />
                      <label className="form-check-label" htmlFor="close">
                        ปิดการสอน
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FFaculty;
