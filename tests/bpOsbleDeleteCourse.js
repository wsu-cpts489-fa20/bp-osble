import { async } from 'regenerator-runtime';
import { Selector } from 'testcafe';

fixture `bp-osble`
.page `http://localhost:8081`;

test('LoginToDeleteCourse', async t =>{

    await t

    .typeText('#emailInput', 'Joshua.Stallworth@wsu.edu')
    .typeText('#passwordInput', 'abc123')
    .click('#LoginBtn')
})