import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import Swal from "sweetalert2";
import Icon from "../../../assets/icons/icons";
import SVGarrowClockwise from "../../../assets/svgs/SVGarrowClockwise";

import { GetAllMajor } from "../../../services/major.service";

export default function ShowMajor() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    currentPage: 0,
    lastPage: 1,
    totalRow: 0,
  });
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(fetchData, [pageNo, pageSize, search]);
  useEffect(fetchData);

  async function fetchData() {
    const res = await GetAllMajor();
    if (res.statusCode == "001") {
      setData(res.data);
    }
    // console.log("res:" + res);
  }

  const searchData = (e) => {
    e.preventDefault();
    fetchData();
  };

  const clearData = (e) => {
    e.preventDefault();
    setSearch("");
    setPageNo(1);
    setPageSize(10);
    fetchData();
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>สาขาวิชา</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="row col-md-12">
                  <div className="col-md-4">
                    <div className="form-group">
                      <div className="input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ค้นหาชื่อสาขาวิชา"
                          aria-label=""
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={(e) => {
                              searchData(e);
                            }}
                          >
                            <Icon
                              icon="search"
                              viewBox="0 0 16 16"
                              color="#FDFEFE"
                              size={16}
                              className=""
                            />
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={(e) => {
                              clearData(e);
                            }}
                          >
                            <SVGarrowClockwise color="#FDFEFE" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 text-right">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        history.push("/FMajor");
                      }}
                    >
                      <Icon
                        icon="add"
                        viewBox="0 0 16 16"
                        color="#FDFEFE"
                        size={16}
                        className=""
                      />{" "}
                      เพิ่มใหม่
                    </button>
                  </div>
                </div>
              </div>

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
