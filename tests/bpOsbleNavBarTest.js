import { async } from 'regenerator-runtime';
import { Selector } from 'testcafe';

//Outline of what we need
//Test Case Login Page
//Test Case Sign Up Page
//Test Case Forgot Password Page
//Test Case Forgot Username Page

fixture`bp-osble`
    .page`http://localhost:8081`;

//This test performs a simple check to see if we are on the
//login page
test('TestNavBar', async t => {

    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');

    await t
        .typeText('#emailInput', 'admin@admin.com')
        .typeText(passwordInput, 'Admin2020')
        .click('#login-btn-icon')
        .click('#NavBarFeed')
        .expect(Selector('#feedPage').visible).eql(true)
        .click('#NavBarAssignments')
        .expect(Selector('#assignmentPage').visible).eql(true)
        .click('#NavBarGrades')
        .expect(Selector('#gradePage').visible).eql(true)
        .click('#NavBarUsers')
        .expect(Selector('#userPage').visible).eql(true)
        .click('#NavBarCourseSettings')
        .expect(Selector('#courseSettingPage').visible).eql(true)
        .click('#NavBarAnalytics')
        .expect(Selector('#analyticsPage').visible).eql(true)
    //.expect(Selector('NavBarFeed').className).eql("btn btn-primary navbutton selected")



});
