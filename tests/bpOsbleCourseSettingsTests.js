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
        .click('NavBarCourseSettings')
        .expect(Selector('#courseSettingsPage').visible).eql(true)
                
});