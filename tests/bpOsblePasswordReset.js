import { async } from 'regenerator-runtime';
import { Selector } from 'testcafe';

fixture `bp-osble`
.page `http://localhost:8081`;

test ('LoginPagetoResetPassword', async t =>{

    const resetPasswordBtn = Selector('button').withAttribute('type', 'button', 'class', 'btn btn-link login-link', 'Reset your password');
    const newPassword = Selector('input').withAttribute('type', 'password', 'placeholder', 'Enter new password', 'class', 'form-control form-text');
    const newPasswordComf = Selector('input').withAttribute('type', 'password', 'placeholder', 'Repreat new password');
    const confirmNewPasswordBtn = Selector('button').withAttribute('role', 'submit', 'class', 'btn btn-primary btn-color-theme form-submit-btn');

    await t
        .click('#resetBtn')
        .typeText(newPassword, "123#abc;")
        .typeText('repeatPassword', "123#abc;")
        .click(confirmNewPasswordBtn);
});