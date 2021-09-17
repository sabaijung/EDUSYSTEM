// layout
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateLayout from "../Layout/Layout";
//import AuthenLayout from "../Layout/public/AuthenLayout";
//import Authentication from "../Views/Authen/Authentication";
//import NotFound from "../views/errors/NotFound";
import { connect } from "react-redux";
import { AUTHEN, USERINFO } from "../Actions/authen";

import AttendClass from "../Views/AttendClass/AttendClass";
import TechSchedule from "../Views/TechSchedule/TechSchedule";
import ShowMajor from "../Views/Setting/Major/ShowMajor";
import ShowStudent from "../Views/Setting/Student/ShowStudent";
import ShowFaculty from "../Views/Setting/Faculty/ShowFaculty";

function Routers(props) {
  return (
    <Router>
      <Switch>
        <Route exact>
          <PrivateLayout>
            <Switch>
              <Route path="/" exact component={AttendClass} />
              <Route path="/attendClass" component={AttendClass} />
              <Route path="/techSchedule" component={TechSchedule} />
              <Route path="/showMajor" component={ShowMajor} />
              <Route path="/showFaculty" component={ShowFaculty} />
              <Route path="/showStudent" component={ShowStudent} />
            </Switch>
          </PrivateLayout>
        </Route>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  auth: state.Authentication,
});

const mapDispatchToProps = (dispatch) => {
  return {
    AUTHEN: (member_code) => dispatch(AUTHEN(member_code)),
    USERINFO: () => dispatch(USERINFO()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
