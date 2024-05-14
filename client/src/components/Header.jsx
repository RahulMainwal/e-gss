import React from 'react';
import logo from "../assets/logo.png";

function Header({onDeleteAllItemsHandler}) {

  return (
    <div style={{zIndex: 5}}>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container" style={{marginBottom: "5px"}}>
          <span>
            <img
              src={logo}
              height={30}
              alt="MDB Logo"
              loading="lazy"
              style={{ marginTop: "-1px", marginRight: "5px" }}
            />
          </span>

          <div className="d-flex align-items-center">
            <button
            onClick={() => onDeleteAllItemsHandler()}
              data-mdb-ripple-init
              className="btn btn-dark px-3"
              href="https://github.com/mdbootstrap/mdb-ui-kit"
              role="button"
            ><i className="fas fa-trash-can"></i> Empty Todo</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header