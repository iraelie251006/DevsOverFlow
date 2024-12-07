const ROUTES = {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    ASK_QUESTION: '/ask-question',
    QUESTION:(id: string) => `/question/${id}`,
    PROFILE: (id: string) => `/profile/${id}`,
    TAGS: (id: string) => `/tags/${id}`,
}

export default ROUTES;