export interface IBookResponse {
    id: number;
    title: string;
    authorId: number;
    categoryId: number;
    description: string;
}

export interface IAuthorResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface ICategoryResponse {
    id: number;
    name: string;
}
