import { Locator, Page, expect } from '@playwright/test';

export class SignInPage {
    private readonly page: Page;
    private readonly locators: {
        usernameInput: Locator;
        passwordInput: Locator;
        signInButton: Locator;
        projectsHeader: Locator;
        errorMessage: Locator;
    };

    constructor(page: Page) {
        this.page = page;

        this.locators = {
            usernameInput: page.getByRole('textbox', { name: 'Username' }),
            passwordInput: page.getByRole('textbox', { name: 'Password' }),
            signInButton: page.getByRole('button', { name: 'Sign in' }),
            projectsHeader: page.getByRole('heading', { name: 'Projects' }),
            errorMessage: page.getByText('Invalid username or password')
        };
    }

    static async navigateTo(page: Page, url: string): Promise<void> {
        await page.goto(url);
    }

    private async fillLoginForm(username: string, password: string): Promise<void> {
        await this.locators.usernameInput.fill(username);
        await this.locators.passwordInput.fill(password);
        await this.locators.signInButton.click();
    }

    async signIn(username: string, password: string): Promise<void> {
        await this.fillLoginForm(username, password);
        await expect(this.locators.projectsHeader).toBeVisible({ timeout: 10000 });
    }

    async signInWithInvalidCredentials(username: string, password: string): Promise<void> {
        await this.fillLoginForm(username, password);
        await expect(this.locators.errorMessage).toBeVisible({ timeout: 5000 });
    }
}