export interface Book{
    id: string;
    title: string;
    price: number;
    category: string;
    authorId: string;
    authorName: string;
    imageUrl: string;
    description: string;
    publishDate: string;
    favorite: string[];
    reviews: Review[];
}
export interface Review{
    userId: string;
    comment: string;
    rate: number;
}
export interface RealBook{
    id: string;
    title: string;
    price: number;
    category: string;
    authorId: string;
    imageUrl: string;
    description: string;
    publishDate: string;
    favorite: string[];
    reviews: Review[];
}