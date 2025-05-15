export interface CardDetails {
    applicationTab: 'Web Application' | 'Mobile Application';
    cardTitle: string;
    column: 'To Do' | 'In Progress' | 'Done';
    tags: string[];
}

export const testCases: CardDetails[] = [
    {
        applicationTab: 'Web Application',
        cardTitle: 'Implement user authentication',
        column: 'To Do',
        tags: ['Feature', 'High Priority']
    },
    {
        applicationTab: 'Web Application',
        cardTitle: 'Fix navigation bug',
        column: 'To Do',
        tags: ['Bug']
    },
    {
        applicationTab: 'Web Application',
        cardTitle: 'Design system updates',
        column: 'In Progress',
        tags: ['Design']
    },
    {
        applicationTab: 'Mobile Application',
        cardTitle: 'Push notification system',
        column: 'To Do',
        tags: ['Feature']
    },
    {
        applicationTab: 'Mobile Application',
        cardTitle: 'Offline mode',
        column: 'In Progress',
        tags: ['Feature', 'High Priority']
    },
    {
        applicationTab: 'Mobile Application',
        cardTitle: 'App icon design',
        column: 'Done',
        tags: ['Design']
    }
]; 