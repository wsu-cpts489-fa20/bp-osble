import { Selector } from 'testcafe';
import AppMode from '../client/src/AppMode';


fixture`bp-osble`
    .page`http://localhost:8081`;

    // The purpose of this test is to assert that the admin page is visible and it is correctly functioning. 
    //NOTE: There are special id numbers reserved for admins only. These id's are 101,102 and 103    
test("TestAdmInterface", async t => {
    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');

    await t
        // sign in with admin credentials
        .typeText('#emailInput', 'tianhao@cs.com')
        .typeText(passwordInput, 'Lab509335')
        .click('#login-btn')

        // check if admin button is visible to the human eye
        .expect(Selector('#NavBarAdmin').visible).eql(true)
        //click on Administrator button to open admin page
        .click('#NavBarAdmin')
        .expect(Selector('#adminPage').visible).eql(true)

        // check if admin's id corresponds to either 101,102 or 103
        // check if additional data retreived from database is correct
        .expect(Selector('#userId3').innerText).contains('102')
        .expect(Selector('#userRole3').innerText).contains('false')
        .expect(Selector('#userAdmin3').innerText).contains('Tianhao Ye')

        //change the role of a user and check if those changes actually took place
        .click('#changeRoleBtn3')
        // check if changes were saved and retreived from the database
        .expect(Selector('#userRole3').innerText).contains('true')
        //change the user's role back to its initial state
        .click('#changeRoleBtn3')
        .expect(Selector('#userRole3').innerText).contains('false')
        .click('#profile')
        // logout
        .click('#logoutButton');  
})

// This test cases verified the effectiveness of changing user's role
test("TestChangeUserRole", async t => {
    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');

    await t
        // sign in with an existing account as a student
        .typeText('#emailInput', 'hermes_esono@hotmail.es')
        .typeText(passwordInput, 'Galaxy2020')
        .click('#login-btn')
        //Check that only three buttons are visible which are Dashboard, Assignment and Grades
        .expect(Selector('#NavBarAdmin').visible).eql(false)
        .click('#NavBarFeed')
        .expect(Selector('#feedPage').visible).eql(true)
        .click('#NavBarAssignments')
        .expect(Selector('#assignmentPage').visible).eql(true)
        .click('#NavBarGrades')
        .expect(Selector('#gradePage').visible).eql(true)
        
        // makes sure the reserved buttons for instructors are not visible
        .expect(Selector('#NavBarUsers').visible).eql(false)
        .expect(Selector('#NavBarCourseSettings').visible).eql(false)
        .expect(Selector('#NavBarAnalytics').visible).eql(false)
        .expect(Selector('#NavBarAdmin').visible).eql(false)

        // logout and login as administrator
        .click('#profile')
        .click('#logoutButton')
        .typeText('#emailInput', 'tianhao@cs.com')
        .typeText(passwordInput, 'Lab509335')
        .click('#login-btn')
        .click('#NavBarAdmin')
       // Make the previous user an instructor and logout
        .click('#changeRoleBtn1')
        .expect(Selector('#userRole1').innerText).contains('true')
        .click('#profile')
        .click('#logoutButton')
        // login as instructor and check that instructor pages are visible and accessable
        .typeText('#emailInput', 'hermes_esono@hotmail.es')
        .typeText(passwordInput, 'Galaxy2020')
        .click('#login-btn')

        .expect(Selector('#NavBarFeed').visible).eql(true)
        .expect(Selector('#NavBarAssignments').visible).eql(true)
        .expect(Selector('#NavBarGrades').visible).eql(true)
        .expect(Selector('#NavBarUsers').visible).eql(true)
        .expect(Selector('#NavBarCourseSettings').visible).eql(true)
        .expect(Selector('#NavBarAnalytics').visible).eql(true)
        .expect(Selector('#NavBarAdmin').visible).eql(false)
        
        // logout and login as administrator
        .click('#profile')
        .click('#logoutButton')
        .typeText('#emailInput', 'tianhao@cs.com')
        .typeText(passwordInput, 'Lab509335')
        .click('#login-btn')
        .click('#NavBarAdmin')
        .click('#changeRoleBtn1')
        .expect(Selector('#userRole1').innerText).contains('false')
        .click('#profile')
        .click('#logoutButton')
            
})