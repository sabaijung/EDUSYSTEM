import React, { Fragment, useState, useEffect } from "react";

import { GetAllMajor } from "../../../services/major.service";

export default function ShowMajor() {
  const [data, setData] = useState([]);

  useEffect(fetchData);

  async function fetchData() {
    const res = await GetAllMajor();
    if (res.statusCode == "001") {
      setData(res.data);
    }
    // console.log("res:" + res);
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>สาขาวิชา</h4>
            </div>
            <div className="card-body">
              {/** สำหรับแสดงรายการข้อมูล */}
              <div className="form-group row">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>รหัสสาขาวิชา</th>
                      <th>ชื่อสาขาวิชา</th>
                      <th>สถานะ</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{value.majorCode}</td>
                        <td>{value.majorName}</td>
                        <td>{value.isUsed == 1 ? "ใช้งาน" : "ไม่ใช้งาน"}</td>
                        <td>
                          {" "}
                          <button className="btn btn-warning">
                            แก้ไข
                          </button>{" "}
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
