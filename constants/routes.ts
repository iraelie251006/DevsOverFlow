const ROUTES = {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    ASK_QUESTION: '/ask-question',
    COLLECTION: '/collection',
    COMMUNITY: '/community',
    JOB: '/job',
    TAGS: '/tags',
    QUESTION:(id: string) => `/questions/${id}`,
    PROFILE: (id: string) => `/profile/${id}`,
    TAG: (id: string) => `/tags/${id}`,
    SIGN_IN_WITH_OAUTH: 'signin-with-oauth'
}

export default ROUTES;