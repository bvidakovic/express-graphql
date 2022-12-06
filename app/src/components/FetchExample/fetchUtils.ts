import { IBook } from '../Book/BookPage';

export const getBooks = async () => {
    const res = await fetch('http://localhost:4000/api/books');

    return res.json();
};

export const getAuthor = async (authorId: number) => {
    const res = await fetch(`http://localhost:4000/api/author/${authorId}`);

    return res.json();
};
