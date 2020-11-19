import React from 'react';
class MailPage extends React.Component {

    render() {
        return (
            <div className="feedpage">
                <center>
                    <h1 >Inbox</h1>
                    <div class="btn-group" id="mail_menu">
                        <a class="btn btn-primary" href="/Mail/Create">Compose</a>
                        <a class="btn btn-primary" href="/Mail/Index">Inbox</a>
                        <a class="btn btn-primary" href="/Mail/Outbox">Outbox</a>
                        <input id="FormSubmitButton" type="submit" class="btn btn-primary" disabled="disabled" value="Delete" />
                    </div>
                    <div class="MailContent">

                        <table class="inbox_table">
                            <thead>
                                <tr>
                                    <th style={{textAlign: 'center'}} id="checkAll" class="inbox_checkbox_header"><input id="checkAllBox" type="checkbox" /></th>
                                    <th class="inbox_attachments_header"></th>
                                    <th class="inbox_time_header"><a href="/Mail?sortBy=EarliestDate">Date:</a></th>
                                    <th class="inbox_context_header"><a href="/Mail?sortBy=Context">Context:</a></th>
                                    <th class="inbox_from_header"><a href="/Mail?sortBy=From">From:</a></th>
                                    <th class="inbox_subject_header"><a href="/Mail?sortBy=Subject">Subject:</a></th>
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
                                    <small>CPTS 121</small>
                                </td>
                                <td class="inbox_from">
                                    <small>Eli Forbes</small>
                                </td>
                                <td class="inbox_subject">
                                    <a href="/Mail/View/7417">Exam 2 Graded</a>
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