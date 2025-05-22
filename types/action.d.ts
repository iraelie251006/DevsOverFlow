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
    className?: string,
    fallbackClassName?: string
}

interface CreateQuestionParams {
    title: string,
    content: string,
    tags: string[]
}

interface EditQuestionParams extends CreateQuestionParams {
    questionId: string;
}

interface GetQuestionParams {
    questionId: string;
}

interface GetTagQuestionParams extends Omit<PaginatedSearchParams, "filter"> {
    tagId: string
}

interface IncrementViewsParams {
    questionId: string;
}

interface CreateAnswerParams {
    questionId: string,
    content: string
}

interface CreateVoteParams {
    targetId: string,
    targetType: "question" | "answer",
    voteType: "upvote" | "downvote",
}

interface UpdateVoteCountParams extends CreateVoteParams{
    change: 1 | -1
}

type HasVotedParams = Pick<CreateVoteParams, "targetId" | "targetType">

interface HasVotedResponse {
    hasUpVoted: boolean,
    hasDownVoted: boolean,
}