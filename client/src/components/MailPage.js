import React from 'react';
import MailTable from './MailTable'

class MailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inbox : [{id
                :
                "1",
                senderId
                :
                "john@wsu.edu",
                recId
                :
                "sean@wsu.edu",
                subject
                :
                "test",
                date
                :
                Date("1995-12-17T11:24:00.000+00:00"),
                message
                :
                "yo cmon pls"}],
            outbox : [],
            mode : "inbox"

        }
    }
    render() {
        return (
            <div className="feedpage">
                <center>
                    <h1 >Inbox</h1>
                    <div class="btn-group" id="mail_menu">
                        <a class="btn btn-primary" >Compose</a>
                        <a class="btn btn-primary" >Inbox</a>
                        <a class="btn btn-primary" >Outbox</a>
                        <input id="FormSubmitButton" type="submit" class="btn btn-primary" disabled="disabled" value="Delete" />
                    </div>
                    <div class="MailContent">

                        <MailTable data = {this.state.inbox}/>
                    </div>
                </center>
            </div>
        );
    }
}

export default MailPage;