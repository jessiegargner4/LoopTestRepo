import { Locator, Page, expect } from '@playwright/test';

export class WebApplicationPage {
    private page: Page;

    protected applicationButtons: Record<string, Locator>;
    protected columnHeaders: Record<string, Locator>;
    protected cards: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page;

        this.applicationButtons = {
            'Web Application': page.getByRole('button', { name: 'Web Application Main web' }),
            'Mobile Application': page.getByRole('button', { name: 'Mobile Application Native' })
        };

        this.columnHeaders = {
            'To Do': page.getByRole('heading', { name: /To Do/, level: 2 }),
            'In Progress': page.getByRole('heading', { name: /In Progress/, level: 2 }),
            'Done': page.getByRole('heading', { name: /Done/, level: 2 })
        };

        this.cards = {
            'To Do': page.locator('.flex.flex-col.w-80.bg-gray-50:has(h2:has-text("To Do")) .bg-white'),
            'In Progress': page.locator('.flex.flex-col.w-80.bg-gray-50:has(h2:has-text("In Progress")) .bg-white'),
            'Done': page.locator('.flex.flex-col.w-80.bg-gray-50:has(h2:has-text("Done")) .bg-white')
        };
    }

    async navigateToApplication(appName: 'Web Application' | 'Mobile Application') {
        const button = this.applicationButtons[appName];
        await expect(button).toBeVisible();
        await button.click();
        await expect(this.columnHeaders['To Do']).toBeVisible();
    }

    async verifyCardInColumn(cardTitle: string, column: 'To Do' | 'In Progress' | 'Done', expectedTags: string[]) {
        await expect(this.columnHeaders[column]).toBeVisible();

        const columnCards = this.cards[column];
        const card = columnCards.filter({
            has: this.page.getByRole('heading', { name: cardTitle, level: 3 })
        });

        await expect(card).toBeVisible({ timeout: 10000 });

        const title = await card.getByRole('heading', { level: 3 }).textContent();
        const description = await card.locator('p').textContent();
        const allSpanText = await card.locator('span').allTextContents();

        const cardTags = allSpanText.filter(tag => {
            const validTags = ['Feature', 'Bug', 'High Priority', 'Design'];
            return validTags.includes(tag);
        });

        const formattedCardText = 
        `   Title: ${title}\n   Description: ${description}\n   Tags: ${cardTags}`;

        console.log('Card content:\n' + formattedCardText);

        for (const expectedTag of expectedTags) {
            const tagLocator = card.locator(`span:text("${expectedTag}")`);
            const isVisible = await tagLocator.isVisible().catch(() => false);
            
            if (!isVisible) {
                throw new Error(`Tag "${expectedTag}" not found in card "${cardTitle}".\nCard content:\n${formattedCardText}`);
            }
        }
    }
}