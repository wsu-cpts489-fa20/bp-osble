import { Selector } from 'testcafe';


fixture `bp-osble`
.page `http://localhost:8081`;

test('LoginPageGoesToSignUpPage', async t => {
    await t
        .click(Create-an-account);
});