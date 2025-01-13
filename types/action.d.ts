interface SignInWithOAuthParams {
    provider: 'github' | 'google',
    providerAccountId: string,
    user: {
        name: string,
        username: string,
        email: string,
        image: string
    }
}