import React from 'react';
import '../styles/FeedPage.css';
import FeedPostItem from './FeedPostItem.js'
class FeedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { // each json object should follow at least this format
            posts: [{ userid:111111111,createdby: "Leonard", content: "Example Post", key: Date.now() }],
            showdropdown: false,
            curselected: "Everyone",
            isanonymous: false,
        };


    }
    addpost = (e) => {
        var newpost = {
            createdby: "Leonard",
            content: this._inputElement.value,
            key: Date.now()
        }
        if (this.state.isanonymous == true) {
            newpost.createdby = "Anonymous"
        }
        this.setState(prevstate => ({ posts: [newpost].concat(prevstate.posts) }));
        this._inputElement.value = "";
        e.preventDefault();
    }
    toggledropdown = (e) => {
        this.setState(prevstate => ({ showdropdown: !prevstate.showdropdown }));

    }
    changeselected = (newfilter) => {
        this.setState({
            curselected: newfilter
        })
        this.toggledropdown();
    }
    setanonymous = (e) => {
        this.setState(prevstate => ({ isanonymous: !prevstate.isanonymous }));
    }
    createntries = (entry) => {
        return <FeedPostItem content={entry.content} createdby={entry.createdby} key={entry.key}></FeedPostItem>
    }
    render() {
        var JSONposts = this.state.posts;
        var JSXposts = JSONposts.map(this.createntries)
        return (
            <div className="feedpage">
                <div className="flexwrapper">
                    <div className="notifications">
                        <h1 style={{ margin: ".7rem" ,fontSize:"30px"}}>Notifications</h1>
                        <ul>
                            <li>Notification 1</li>
                            <li>Notification 2</li>
                            <li>Notification 3</li>
                        </ul>
                    </div>
                    <div className="feed">
                        <h1 style={{ margin: ".7rem" ,fontSize:"30px"}}>Activity Feed</h1>

                        <form onSubmit={this.addpost}>
                            <textarea required={true} ref={(a) => this._inputElement = a} className="postinput" placeholder="Enter new post here..."></textarea>
                            <div style={{ display: "flex", flexDirection: "row", height: "2.5rem" }}>
                                <button type="submit" className="btn btn-primary" style={{ float: "left", marginLeft: ".5rem" }}>Post</button>
                                <button type="button" onClick={() => this.toggledropdown()} className="btn btn-primary" style={{ float: "left", marginLeft: ".5rem", width: "10rem" }}>{this.state.curselected}</button>
                                <input type="checkbox" style={{ marginTop: ".8rem", marginLeft: "1rem" }} onClick={this.setanonymous}></input>
                                <p style={{ marginTop: ".4rem", marginLeft: ".5rem" }}>Post Anonymously</p>
                            </div>
                        </form>
                        {this.state.showdropdown ?
                            <div style={{ display: "flex", flexDirection: "column" }} className="mydropdown">
                                <button className="btn btn-primary" style={{ width: "10rem", borderRadius: "0px" }} onClick={() => this.changeselected("Everyone")}>Everyone</button>
                                <button className="btn btn-primary" style={{ width: "10rem", borderRadius: "0px" }} onClick={() => this.changeselected("Instructors only")}>Instructors Only</button>
                            </div>

                            :
                            null

                        }
                        
                        <ul style={{ listStyleType: "none", padding: "0px" ,marginTop:"1rem"}}>
                            {JSXposts}
                        </ul>

                    </div>
                    <div className="files">
                        <h1 style={{ margin: ".7rem" ,fontSize:"30px"}}>Files</h1>
                        <ul>
                            <li>File 1</li>
                            <li>File 2</li>
                            <li>File 3</li>
                        </ul>
                    </div>

                </div>
            </div>
        );
    }
}

export default FeedPage;