import { Selector } from 'testcafe';
import AppMode from '../client/src/AppMode';


fixture`bp-osble`
    .page`http://localhost:8081`;

test("TestAdmInterface", async t => {
    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');

    await t
        .typeText('#emailInput', 'tianhao@cs.com')
        .typeText(passwordInput, 'Lab509335')
        .click('#login-btn')
        .click('#NavBarAdmin')
        .expect(Selector('#adminPage').visible).eql(true)
        .expect(Selector('#userId3').innerText).contains('102')
        .expect(Selector('#userRole3').innerText).contains('false')
        .expect(Selector('#userAdmin3').innerText).contains('Tianhao Ye')
        .click('#changeRoleBtn3')
        .expect(Selector('#userRole3').innerText).contains('true')
        .click('#changeRoleBtn3')
        .expect(Selector('#userRole3').innerText).contains('false')
        .click('#profile')
        .click('#logoutButton');  
})

test("TestChangeUserRole", async t => {
    const passwordInput = Selector('input').withAttribute('class', 'form-control enterPassword', 'type', 'password', 'placeholder', 'Password');

    await t
        .typeText('#emailInput', 'joshua@me.com')
        .typeText(passwordInput, 'Cpts48912')
        .click('#login-btn')
        .expect(Selector('#NavBarAdmin').visible).eql(false)
        .click('#NavBarFeed')
        .expect(Selector('#feedPage').visible).eql(true)
        .click('#NavBarAssignments')
        .expect(Selector('#assignmentPage').visible).eql(true)
        .click('#NavBarGrades')
        .expect(Selector('#gradePage').visible).eql(true)

        .expect(Selector('#NavBarUsers').visible).eql(false)
        .expect(Selector('#NavBarCourseSettings').visible).eql(false)
        .expect(Selector('#NavBarAnalytics').visible).eql(false)
        .expect(Selector('#NavBarAdmin').visible).eql(false)

        .click('#profile')
        .click('#logoutButton')
        .typeText('#emailInput', 'tianhao@cs.com')
        .typeText(passwordInput, 'Lab509335')
        .click('#login-btn')
        .click('#NavBarAdmin')
       
        .click('#changeRoleBtn2')
        .expect(Selector('#userRole2').innerText).contains('true')
        .click('#profile')
        .click('#logoutButton')

        .typeText('#emailInput', 'joshua@me.com')
        .typeText(passwordInput, 'Cpts48912')
        .click('#login-btn')

        .expect(Selector('#NavBarFeed').visible).eql(true)
        .expect(Selector('#NavBarAssignments').visible).eql(true)
        .expect(Selector('#NavBarGrades').visible).eql(true)
        .expect(Selector('#NavBarUsers').visible).eql(true)
        .expect(Selector('#NavBarCourseSettings').visible).eql(true)
        .expect(Selector('#NavBarAnalytics').visible).eql(true)
        .expect(Selector('#NavBarAdmin').visible).eql(false)
            
})