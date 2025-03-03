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

interface AuthCredentials {
    name: string, 
    username: string,
    email: string,
    password: string,
}

interface AvatarProps {
    id: string,
    name: string,
    imageUrl?: string | null, 
    className?: string
}