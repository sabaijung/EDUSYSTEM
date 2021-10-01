import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GetAllFaculty } from "../../../services/faculty.service";

export default function ShowFaculty() {
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(fetchData);

  async function fetchData() {
    const res = await GetAllFaculty();
    if (res.statusCode == "001") {
      setData(res.data);
    }
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>ข้อมูลคณะ</h4>
            </div>
            <div className="card-body">
              <div>
                <button
                  class="btn btn-primary"
                  onClick={(e) => {
                    history.push("/FFaculty");
                  }}
                >
                  เพิ่มข้อมูล
                </button>
              </div>
              {/** สำหรับแสดงรายการข้อมูล */}
              <div className="form-group row">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>รหัสคณะ</th>
                      <th>ชื่อคณะ</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{value.facultyCode}</td>
                        <td>{value.facultyName}</td>
                        <td>
                          <button className="btn btn-warning">แก้ไข</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
