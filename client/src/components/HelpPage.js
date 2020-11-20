import React from 'react';
class HelpPage extends React.Component {

    render() {
        return (
        <div className="feedpage">
            <h1 className="help-header">Help</h1>
            &emsp;OSBLE contains the following help articles:
            <br/>
            <h2 className="help-sub-header">Managing Course and Users</h2>
            <u1>
                &emsp;<li><a className="help-content" href="https://plus.osble.org/Help/CreateCourse">creating a New Course</a></li>
                &emsp;<li><a className="help-content" href="https://plus.osble.org//Help/AddingStudents">Adding students to a course</a></li>
                &emsp;<li><a className="help-content" href="https://plus.osble.org//Help/AddingOthers">Adding TAs or moderators to a course</a></li>
                &emsp;<li><a className="help-content" href="https://plus.osble.org//Help/RosterGuide">Managing your Course Roster</a></li>
            </u1>
            <h2 className="help-sub-header">Creating Assignments</h2>
            <u1>
                &emsp;<li><a className="help-content" href="https://plus.osble.org/Help/CreateBasicAssignment">Creating basic assignments</a></li>
                &emsp;<li><a className="help-content" href="https://plus.osble.org/Help/CreateReviewAssignment">Creating a review assignment</a></li>
                &emsp;<li><a className="help-content" href="https://plus.osble.org/Help/CreateReviewDiscussion">Creating review discussion assignments</a></li>
                &emsp;<li><a className="help-content" href="https://plus.osble.org/Help/CreateRubric">Creating a Rubric</a></li>
                &emsp;<li><a className="help-content" href="https://plus.osble.org/Help/UsingTeamBuilder">Using the Team Builder</a></li>
                
            </u1>
        </div>
        );
    }   
}

export default HelpPage;
