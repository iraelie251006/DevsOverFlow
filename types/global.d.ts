interface Tags {
    _id: string,
    name: string,
    compact?: boolean
}

interface Author {
    _id: string,
    name: string,
    imgUrl: string
}

interface Question {
    _id: string,
    title: string,
    description: string,
    tags: Tags[],
    author: Author,
    createdAt: Date,
    upvotes: number,
    views: number,
    answers: number
}

type ActionResponse<T = null> = {
    success: boolean,
    data?: T,
    error?: {
        message: string,
        details?: Record<string, string[]>
    },
    status?: number
}

type SuccessResponse<T = null> = ActionResponse<T> & {success: true};
type ErrorResponse = ActionResponse<undefined> & {success: false};

type APIErrorResponse = NextResponse<ErrorResponse>
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>