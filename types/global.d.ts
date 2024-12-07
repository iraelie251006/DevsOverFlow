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