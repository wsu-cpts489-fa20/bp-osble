import React from 'react';
import GradeTable from './GradeTable'

class GradesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {'ID':'Total:', 'Student': '', 'Assignment 1': 100, 'Assignment 2': 100},
                {'ID': '11645278', 'Student': 'Sean', 'Assignment 1': 100, 'Assignment 2': 95},
                {'ID': '11111111', 'Student': 'John', 'Assignment 1': 95, 'Assignment 2': 95}
                
            ],
            hasGradebook : true

        }
    }
    render() {
        return (
            <div className="feedpage">
                <center>
                    <h1>Gradebook </h1>
                    <button id="gbOptions" class="btn btn-primary" data-toggle="modal" data-target="#gbOptionsModal">Gradebook Options</button>
                    {/* <div id="gbOptionsModal" class="modal fade" role="dialog">
                        <div class="modal-dialog">

                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                    <h4 class="modal-title">Gradebook Options</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="options">
                                        <form enctype="multipart/form-data" method="post" action="/Gradebook/DeleteAllGradebooks" id="delete_submit">
                                            <button type="submit" class="btn btn-primary "> Delete All Gradebooks</button>
                                        </form>
                                    </div>
                                    <div class="options">
                                        <form enctype="multipart/form-data" method="post" action="/Gradebook/DownloadGradebook">
                                            <button type="submit" class="btn btn-primary "> Download Gradebook (Zipped CSVs)</button>
                                        </form>
                                        <br>
                                            <form enctype="multipart/form-data" method="post" action="/Gradebook/DownloadGradebookXLSX">
                                                <button type="submit" class="btn btn-primary "> Download Gradebook (Excel XLSX)</button>
                                            </form>
                                        </br>
                                    </div>
                                    <div class="options uForm">

                                        <form id="upload_gradebook" enctype="multipart/form-data" method="post" action="/Gradebook/UploadGradebook">
                                            <div class="form-group">
                                                <input class="file" type="file" id="file" name="file" onchange="check_extension(this.value)"></input>
                                                <div class="input-group ">
                                                    <input type="text" class="form-control input-lg" disabled="" placeholder="Upload .csv or .zip containing multiple .csv"></input>
                                                    <span class="input-group-btn">
                                                        <button class="browse btn btn-primary input-lg" type="button"><i class=""></i> Upload<br>Gradebook(s)</br></button>
                                                    </span>
                                                </div>
                                                <div>
                                                    <span id="errorMsg"></span>
                                                </div>
                                                <input class="btn btn-primary" id="upload" type="submit" value="Upload Selected Gradebook(s)" disabled="disabled"></input>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </div>
 */}
                    {/* <h3>No Gradebook Uploaded.</h3> */}
                    {/* <h1 >Grades</h1>
            <h2>This page is under construction.</h2>
            <img src="osble2.png" 
             height="200" width="200"/>
            <p style={{fontStyle: "italic"}}>Version CptS 489 React Demo</p> */}
                <GradeTable data={this.state.data}/>
                </center>
            </div>
        );
    }
}

export default GradesPage;