import { async } from 'regenerator-runtime';
import { Selector } from 'testcafe';

//Outline of what we need
//Test Case Login Page
//Test Case Sign Up Page
//Test Case Forgot Password Page
//Test Case Forgot Username Page

fixture `bp-osble`
.page `http://localhost:8081`;

//Performs a test on the updating course settings page
test('TestCourseSettingsPage', async t => {

    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');

    await t
        .typeText('#emailInput', 'hermes_esono@hotmail.es')
        .typeText(passwordInput, 'MongoDB240')
        .click('#login-btn-icon')
        .expect(Selector('#feedPage').visible).eql(true)
        .click('#NavBarCourseSettings')
        .expect(Selector('#courseSettingsPage').visible).eql(true)
        .typeText("#UniqueCoursePrefix", 'CptS')
        .typeText("#CourseNumber", 'Introduction to Database Systems')
        .typeText("#CourseName", '451')
        .typeText("#CourseTerm", 'Spring')
        .typeText("#CourseYear", '2021')
        .typeText("#CourseStartDate", '01/10/2021')
        .typeText("#CourseEndDate", '05/16/2021')
        .typeText("#CourseTimeZone", 'PDT')
        .typeText("#CourseMeetingTimes", '10:10 AM - 11:00 AM')
        .click(Selector("#AllowRepliesToThreads"))
        .expect(Selector('#AllowRepliesToThreads').checked).ok()
        .click(Selector('#ReplyToThreads'))
        .expect(Selector('#ReplyToThreads').checked).eql(true)
        .typeText("#LateAssignmentLimit", '5')
        .typeText("#LateAssignmentPenalty", '10%')
        .typeText("LateAssignmentPenaltyPercentage", '24')
        .typeText("MaxLateAssignmentLimit", '48')
        .click("#ComfirmUpdateCourseBtn")
        .expect(Selector('#feedPage').visible).eql(true)                
});