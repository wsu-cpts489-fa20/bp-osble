import React from 'react';

class UsersPage extends React.Component {

    render() {
        return (
            <div className="feedpage">
                <center>
                    <h1> Roster</h1>
                    <div>
                        <a href="#" onclick="$('#add_update_users').toggle('blind'); return false;">Add/Update
                Users</a>
                    </div>
                    <div id="add_update_users" style={{display: 'block'}}>
                        <h4>
                            Add Single User     <div class="popup-bubbleInfo">
                                <img class="popup-trigger" src="../../Content/images/tooltip/109_AllAnnotations_Help_19x19_72.png" alt="(?)" height="19px" width="19px" />
                                <div class="popup" style={{opacity: 0}}>
                                    <table cellpadding="0px" cellspacing="0px">
                                        <tbody>
                                            <tr>
                                                <td class="topleft">
                                                </td>
                                                <td class="top">
                                                </td>
                                                <td class="topright">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="left">
                                                </td>
                                                <td class="popup-contents">
                                                    This section allows you to add an individual user to the class, either by their school identification number or their email.
                        </td>
                                                <td class="right">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="bottomleft">
                                                </td>
                                                <td class="bottom">
                                                </td>
                                                <td class="bottomright">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </h4>
                        <div>
                            <a href="/Roster/Create">Add By School ID</a>&nbsp;&nbsp;
                <a href="/Roster/CreateByEmail">Add By Email</a>&nbsp;&nbsp;
            </div>
                        <h4>
                            Import Roster     <div class="popup-bubbleInfo">
                                <img class="popup-trigger" src="../../Content/images/tooltip/109_AllAnnotations_Help_19x19_72.png" alt="(?)" height="19px" width="19px" />
                                <div class="popup" style={{opacity: 0}}>
                                    <table cellpadding="0px" cellspacing="0px">
                                        <tbody>
                                            <tr>
                                                <td class="topleft">
                                                </td>
                                                <td class="top">
                                                </td>
                                                <td class="topright">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="left">
                                                </td>
                                                <td class="popup-contents">
                                                    This section allows you to import a list of users from a comma-separated (<em>.csv</em>) file to the class.
                        </td>
                                                <td class="right">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="bottomleft">
                                                </td>
                                                <td class="bottom">
                                                </td>
                                                <td class="bottomright">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </h4>

                    </div>
                    <h2>This page is under construction.</h2>
                    <img src="osble2.png"
                        height="200" width="200" />
                    <p style={{ fontStyle: "italic" }}>Version CptS 489 React Demo</p>
                </center>
            </div>
        );
    }
}

export default UsersPage;