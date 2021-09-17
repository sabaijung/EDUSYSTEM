import React, { Fragment, useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";

import { GetAllStudent } from "../../../services/student.service";

export default function ShowStudent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    currentPage: 0,
    lastPage: 1,
    totalRow: 0,
  });
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(fetchData, [pageNo, pageSize]);

  async function fetchData() {
    const res = await GetAllStudent(pageSize, pageNo);
    if (res.statusCode == "001") {
      let pagination = res.pagin;
      if (pagination.totalRow > 0) {
        setData(res.data);
        setPage({
          currentPage: pagination.currentPage,
          lastPage: pagination.totlaPage,
          totalRow: pagination.totalRow,
        });
      }
    } else {
    }
  }

  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPageNo(newPage);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>ข้อมูลนักศึกษา</h4>
            </div>
            <div className="card-body">
              {/** สำหรับแสดงรายการข้อมูล */}
              <div className="form-group row">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>รหัสนักศึกษา</th>
                      <th>ชื่อ-นามสกุล</th>
                      <th>อีเมล</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, index) => (
                      <tr key={value.stdId}>
                        <td>
                          {(page.currentPage - 1) * pageSize + (index + 1)}
                        </td>
                        <td>{value.stdId}</td>
                        <td>{value.name + " " + value.lastName}</td>
                        <td>{value.email}</td>
                        <td>
                          <button className="btn btn-warning">แก้ไข</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/** แสดง pagination */}
              <div className="d-flex justify-content-between">
                <div>จำนวนทั้งหมด {page.totalRow} รายการ</div>
                <Pagination
                  count={parseInt(page.lastPage)}
                  page={pageNo}
                  color="primary"
                  size="small"
                  defaultPage={6}
                  siblingCount={1}
                  onChange={handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
