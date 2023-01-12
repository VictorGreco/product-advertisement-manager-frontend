export interface IProducts {
    id: string;
    name: string;
    price: string;
    description: string
}

export interface ILinks {
    first: string;
    last: string;
    prev: string;
    next: string;
}

export interface IMeta {
    count: number;
    totalItems: number;
    totalPages: number;
    requestedPage: number;
    itemsPerPage: number;
    links: ILinks;
}

export interface IData {
    products: IProducts[];
    meta: IMeta;
}