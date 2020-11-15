import React from 'react';


class Dropdown extends React.Component {
constructor(){
 super();

 this.state = {
       displayMenu: false,
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

};

showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  render() {
    return (
        <div  className="modal-dropdown dropdown" role="dialog" style = {{width:"200px"}} >
         <div className="button" onClick={this.showDropdownMenu}> Hermes Obiang </div>

          { this.state.displayMenu ? (
          <ul>
         <li><a className="active" href="#Create Page">View Profile</a></li>
         <li><a href="#Manage Pages">Settings</a></li>
         <li><a href="#Log Out">Log Out</a></li>
          </ul>
        ):
        (
          null
        )
        }

       </div>

    );
  }
}

export default Dropdown;