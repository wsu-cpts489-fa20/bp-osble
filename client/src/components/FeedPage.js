import { set } from 'mongoose';
import React from 'react';
import AppMode from '../AppMode';
import '../styles/FeedPage.css';
import FeedPostItem from './FeedPostItem.js'
class FeedPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { // each json object should follow at least this format
            posts: this.props.selectedCourse.posts,
            
            showdropdown: false,
            curselected: "Everyone",
            isanonymous: false,
        };
            }; 
        


    
    addpost = async (e) => {
        var newpost = {
            userid: this.props.userObj.userid, 
            createdby: this.props.userObj.first_name + " " + this.props.userObj.last_name,
            post_content: this._inputElement.value,
            key: Date.now(),
            replies: []
        }
        if (this.state.isanonymous == true) {
            newpost.createdby = "Anonymous"
        }
   
        this._inputElement.value = "";
               
       
        
        console.log(newpost);
        e.preventDefault();
        const url = '/courses/addpost/' + this.props.selectedCourse.course_name;
        let body = newpost;
        let res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(body)
        });

        console.log(res.status)
        if (res.status === 200) { //successful account creation!
           this.updateEntries();
           this.props.refreshOnUpdate(AppMode.FEED);
            //this.props.done("New account created! Enter credentials to log in.", false);
            //this.setState({ posts: newposts });
            
        } else { //Unsuccessful account creation
            //Grab textual error message
            const resText = await res.text();
            //this.props.done(resText, false);
        }
        //this.setState({ posts: newposts });
        
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
        return <FeedPostItem selectedCourse={this.props.selectedCourse} postid = {entry._id} content={entry.post_content} createdby={entry.createdby} key={entry.key} replies = {entry.replies}></FeedPostItem>
    }
    updateEntries = async () => {
        let response = await fetch("/courses/" + this.props.selectedCourse.course_name);
        response = await response.json();
        const obj = JSON.parse(response);
        this.setState({
            posts: obj.posts
        });
    }

    getEntries = async () => {

    }

    componentDidMount = async () => {
        // get most recent list of assignments
        await this.props.selectedCourse.course_name;
        if (this.props.selectedCourse.course_name){
            let response = await fetch("/courses/" + this.props.selectedCourse.course_name);
        response = await response.json();
        const obj = JSON.parse(response);
        this.setState({
            posts: obj.posts
        }, () => console.log(this.state.posts, obj.posts));

        }
        
    }

    componentDidUpdate = async (prevProps, prevState) => { // updates current assignmentlist
        if (prevProps.selectedCourse.course_name === this.props.selectedCourse.course_name) {
            //do nothing
        } else {

            this.setState({
                posts: this.props.selectedCourse.posts
            })
        }
    }
    render() {
        var JSONposts =this.state.posts;
        console.log("selected" + this.props.selectedCourse);
        if (JSONposts)
        {
            var JSXposts = JSONposts.map(this.createntries) 
        }
        
        return (
            <div className="feedpage" id="feedPage">
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
                            <textarea required={true} ref={(a) => this._inputElement = a} className="postinput" id="FeedPostBox" placeholder="Enter new post here..."></textarea>
                            <div style={{ display: "flex", flexDirection: "row", height: "2.5rem" }}>
                                <button type="submit" className="btn btn-primary" id="FeedPostButton" style={{ float: "left", marginLeft: ".5rem" }}>Post</button>
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