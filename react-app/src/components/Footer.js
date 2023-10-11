import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <div className="bg-danger">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="container col-md-4 d-flex align-items-center">
            <span className="text-muted">© 2023 MernFood, Inc</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
