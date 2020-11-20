import React from 'react';
class MailPage extends React.Component {

    render() {
        return (
            <div className="feedpage">
                <center>
                    <h1 >Inbox</h1>
                    <div class="btn-group" id="mail_menu">
                        <a class="btn btn-primary" >Compose</a>
                        <a class="btn btn-primary" >Inbox</a>
                        <a class="btn btn-primary" > Outbox</a>
                        <input id="FormSubmitButton" type="submit" class="btn btn-primary" disabled="disabled" value="Delete" />
                    </div>
                    <div class="MailContent">

                        <table class="inbox_table table table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th style={{textAlign: 'center'}} id="checkAll" class="inbox_checkbox_header"><input id="checkAllBox" type="checkbox" /></th>
                                    <th class="inbox_attachments_header"></th>
                                    <th class="inbox_time_header"><a >Date:</a></th>
                                    <th class="inbox_context_header"><a >Context:</a></th>
                                    <th class="inbox_from_header"><a >From:</a></th>
                                    <th class="inbox_subject_header"><a >Subject:</a></th>
                                </tr>

                            </thead>

                            <tbody><tr id="mail_item_7417" class="">
                                <td style ={{textAlign: 'center'}}><input id="7417" class="mailCheckBoxClass" name="mailItem_7417" type="checkbox" /></td>
                                <td class="inbox_attachments">
                                </td>
                                <td class="inbox_time">
                                    <time class="course-local-time" datetime="1510173928" data-original-date="11/8/17 08:45 PM" data-date-format="MM/DD/YYYY hh:mm A">11/08/2017 12:45 PM</time>
                                </td>
                                <td class="inbox_context">
                                    CPTS 121
                                </td>
                                <td class="inbox_from">
                                    Eli Forbes
                                </td>
                                <td class="inbox_subject">
                                    <a >Exam 2 Graded</a>
                                </td>
                            </tr>



                            </tbody></table>
                    </div>
                </center>
            </div>
        );
    }
}

export default MailPage;