import { async } from 'regenerator-runtime';
import { Selector } from 'testcafe';

fixture `bp-osble`
.page `http://localhost:8081`;

test('LoginPageToUpdateCourse', async t =>{

    await t

    .typeText('#emailInput', 'Joshua.Stallworth@wsu.edu')
    .typeText('#passwordInput', 'abc123')
    .click('#LoginBtn')
    .click('#Course_Settings_Selection')
    .typeText('#UniqueCoursePrefix', 'CPT_S')
    .typeText('#CourseNumber', '489')
    .typeText('#CourseName', 'Web Development')
    .typeText('#CourseTerm', 'Fall')
    .typeText('#CourseYear', '2020')
    .typeText('#CourseStartDate', '08/24/2020')
    .typeText('#CourseEndDate', '12/16/2020')
    .typeText('#CourseTimeZone', 'Pacific Time')
    .click('#AllowRepliesToThreads')
    .click('#PostNewThreads')
    .click('#ReplyToThreads')
    .click('#InstructorApproveEvent')
    .click('#ProgrammingOriented')
    .typeText('#ShowWeeksIntoFuture', '1')
    .typeText('#LateAssignmentLimit', '5')
    .typeText('#LateAssignementPenalty', '10')
    .typeText('#LateAssignmentPenaltyIncriment', '24')
    .typeText('#LateAssignmentTimeLimit', '48')
    .click('#ComfirmUpdateCourseBtn');
});