import React from 'react';
import AppMode from '../AppMode';
class ProfilePage extends React.Component {

    switchToEdit=()=>{
        this.props.changeMode(AppMode.USER_SETTINGS);
    }

    render() {
        return (
        <div className="feedpage">
            <div className="profile-area">
                {/* The image and userID will be changed once we have a database set up */}
                <div class="left-profile">
                    <img src="osble2.png" height='200' width='200'></img>
                </div>
                <div class="right-profile">
                    <h1 id="userID" className="profile-userID" style={{fontSize:"75px"}}>John Ye
                        <table>
                            <tr>
                                <td style={{fontSize:"20px"}}><strong>0</strong> post(s)</td>
                            </tr>
                            <tr>
                                <td style={{fontSize:"20px"}}><strong>0</strong> comment(s)</td>
                            </tr>
                            <tr>
                                <button className="profile-btn-icon" onClick={this.switchToEdit}>Edit<span class="fa fa-pencil"></span></button>
                            </tr>
                        </table>
                    </h1>
                </div>
            </div>
            <p></p>
            <p>
                <h3 className="profile-info" stype={{fontSize:"50"}}>Recent Social Activity</h3>
            </p>
        </div>
        );
    }   
}

export default ProfilePage;