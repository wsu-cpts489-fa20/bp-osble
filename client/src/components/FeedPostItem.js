import React from "react";
import '../styles/FeedItem.css';
import FeedPostReply from './FeedPostReply.js'
export default class FeedpostItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showReply: false,
            replies: [{ createdby: "Leonard", content: "Example Reply", key: Date.now() }],
            seeReplies: false
        };


    }

    showReply = (e) => {
        this.setState(prevstate => ({ showReply: !prevstate.showReply }));
    }
    addreply = (e) => {
        var newpost = {
            createdby: "Leonard",
            content: this._inputElement.value,
            key: Date.now()
        }

        this.setState(prevstate => ({ replies: [newpost].concat(prevstate.replies) }));
        this._inputElement.value = "";
        this.setState({
            seeReplies: true
        })
        this.showReply();
        e.preventDefault();
    }
    createntries = (entry) => {
        return <FeedPostReply content={entry.content} createdby={entry.createdby} key={entry.key}></FeedPostReply>
    }
    seeReplies = (e) => {
        this.setState(prevstate => ({ seeReplies: !prevstate.seeReplies }));
    }
    render() {
        var JSONreplies = this.state.replies;
        var JSXreplies = JSONreplies.map(this.createntries)
        return (
            <li key={this.props.key}>

                <div style={{ width: "98%", boxShadow: "0px 1px 5px rgba(0,0,0,0.55)", margin: ".5rem", borderRadius: "5px" }}>
                    <div style={{ borderRadius: "5px", backgroundColor: "#f5f5f5" }}>
                        <div style={{ padding: "3px" }}><div style={{ marginLeft: ".4rem" }}>{this.props.createdby}</div></div></div>
                    <div style={{ padding: "3px", marginLeft: ".4rem" }}>{this.props.content}</div>

                    <form onSubmit={this.addreply}>
                        {
                            this.state.showReply ?
                                <div >
                                    <textarea required={true} ref={(a) => this._inputElement = a} className="postinput" id="FeedReplyBox" placeholder="Enter Reply Here..." style={{ marginBottom: "0px" }}></textarea>

                                </div>
                                :
                                null
                        }
                        {
                            this.state.seeReplies ?
                                <ul style={{ listStyleType: "none", padding: "0px" }}>
                                    {JSXreplies}
                                </ul>
                                :
                                null
                        }
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <button type="button" className="postitembutton" onClick={this.showReply}>{this.state.showReply ? "Cancel" : "Reply"}</button>
                            <button type="button" className="postitembutton" onClick={this.seeReplies} style={{ width: "8rem" }}>{this.state.seeReplies ? "Hide Replies" : "Show Replies "}{this.state.seeReplies ? "" : "(" + this.state.replies.length + ")"}</button>
                            {
                                this.state.showReply ?
                                    <button className="postitembutton" id="FeedReplyButton" style={{ width: "4rem" }}>Submit</button>
                                    :
                                    null
                            }

                        </div>
                    </form>


                </div>

            </li>

        )
    }
};