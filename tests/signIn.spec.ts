import { test } from '@playwright/test';
import { SignInPage } from './PageObjects/SignIn';
import { signInTestCases } from './TestData/signInData';

test.describe('Sign In Tests', () => {
    let signInPage: SignInPage;

    test.beforeEach(async ({ page }) => {

        signInPage = new SignInPage(page);

        await SignInPage.navigateTo(page, 'https://animated-gingersnap-8cf7f2.netlify.app/');
    });

    for (const testCase of signInTestCases) {
        test(`Sign in - ${testCase.description}`, async () => {
            if (testCase.isValid) {
                await signInPage.signIn(testCase.username, testCase.password);
            } else {
                await signInPage.signInWithInvalidCredentials(testCase.username, testCase.password);
            }
        });
    }
}); 