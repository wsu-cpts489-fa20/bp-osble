import React from "react";
import '../styles/FeedItem.css';
export default class FeedpostReply extends React.Component {
 
    render() {
        return (
            <li key={this.props.key}>
                <div style={{ width: "98%", boxShadow: "0px 1px 5px rgba(0,0,0,0.55)",borderRadius:"5px", margin: ".5rem" }}>
                    <div style={{ backgroundColor: "#f5f5f5",borderRadius:"5px" }}><div style={{ padding: "3px" }}><div style = {{marginLeft:".4rem"}}>{this.props.createdby}</div></div></div>
                    <div id="replyItem" style={{ padding: "3px", marginLeft: ".4rem" }}>{this.props.content}</div>
                        
                </div>

            </li>

        )
    }
};