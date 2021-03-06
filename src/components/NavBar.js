import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Identicon from 'identicon.js'

class NavBar extends Component {

    render(){
        return (
          <AppBar style= {{backgroundColor: "grey"}}>
          <Toolbar className="nav-container" >
            <a
              className="col-sm-3 col-md-2 mr-0"
              href="https://github.com/KashShahzad/Industan"
              target="_blank"
              rel="noopener noreferrer"
              style={{color: "white",
              fontFamily: "Georgia",
              fontSize: '30px',
              letterSpacing: "3px",
              textDecoration: "none",
              marginRight: "50px",
              marginLeft: "30px"
             }}
            >
              Industan
            </a>        
              {this.props.account ? 
                  <img
                    style={{float: "left"}}
                    className="ml-2"
                    width="30"
                    height="30"
                    alt="abc"
                    src={`data:image/png;base64, ${new Identicon(this.props.account, 30).toString()}`}
                  />: <span></span>}
                  <small
                     style={{padding: "10px", fontSize:"20px"}}
                  >
                    <small id="account">{this.props.account}</small>
                  </small>
         </Toolbar>
      </AppBar >
          );
      }
}

export default NavBar;