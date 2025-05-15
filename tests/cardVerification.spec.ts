import { test } from '@playwright/test';
import { WebApplicationPage } from './PageObjects/WebApplication';
import { SignInPage } from './PageObjects/SignIn';
import { testCases } from './TestData/cardData';
import { validCredentials } from './TestData/signInData';

test.describe('Card Verification Tests', () => {
    let webApplicationPage: WebApplicationPage;
    let signInPage: SignInPage;

    test.beforeEach(async ({ page }) => {

        webApplicationPage = new WebApplicationPage(page);
        signInPage = new SignInPage(page);

        await SignInPage.navigateTo(page, 'https://animated-gingersnap-8cf7f2.netlify.app/');
        await signInPage.signIn(validCredentials.username, validCredentials.password);
    });

/*  Test 1: Verify "Implement user authentication" card in Web Application
    Test 2: Verify "Fix navigation bug" card in Web Application
    Test 3: Verify "Design system updates" card in Web Application
    Test 4: Verify "Push notification system" card in Mobile Application
    Test 5: Verify "Offline mode" card in Mobile Application
    Test 6: Verify "App icon design" card in Mobile Application 
*/
    for (const testCase of testCases) {
        test(`Verify "${testCase.cardTitle}" in ${testCase.column} column of ${testCase.applicationTab}`, async () => {

            await webApplicationPage.navigateToApplication(testCase.applicationTab);

            await webApplicationPage.verifyCardInColumn(
                testCase.cardTitle,
                testCase.column,
                testCase.tags
            );
        });
    }
}); 