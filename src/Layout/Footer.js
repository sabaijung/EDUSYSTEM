import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer className="main-footer">
          <div className="footer-left">
            Copyright &copy; 2021 <div className="bullet"></div> Design By{" "}
            <a href="#">Miss Sabaiprae Ardsri</a>
          </div>
          <div className="footer-right">0.0.1</div>
        </footer>
      </div>
    );
  }
}
