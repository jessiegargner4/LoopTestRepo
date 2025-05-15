export interface SignInTestCase {
    description: string;
    username: string;
    password: string;
    isValid: boolean;
}

export const signInTestCases: SignInTestCase[] = [
    {
        description: 'Valid credentials',
        username: 'admin',
        password: 'password123',
        isValid: true
    },
    {
        description: 'Invalid password',
        username: 'admin',
        password: 'wrongpassword',
        isValid: false
    },
    {
        description: 'Invalid username',
        username: 'wronguser',
        password: 'password123',
        isValid: false
    }
];

export const validCredentials = signInTestCases.find(testCase => testCase.isValid)!; 