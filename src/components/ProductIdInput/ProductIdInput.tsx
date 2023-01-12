import { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface IProducts {
    id: string;
    name: string;
    price: string;
    description: string
}

interface ILinks {
    first: string;
    last: string;
    prev: string;
    next: string;
}

interface IMeta {
    count: number;
    totalItems: number;
    totalPages: number;
    requestedPage: number;
    itemsPerPage: number;
    links: ILinks;
}

interface IData {
    products: IProducts[];
    meta: IMeta;
}

export const ProductIdInput = (onChange: any) => {
    const [products, setProducts] = useState<IProducts[]>();

    useEffect(() => {
        const productsFetch = async () => {
            const fetchUrl = async (page: number): Promise<IData> => {
                return await (
                    await fetch(
                        `https://4a6onckre7.execute-api.eu-west-1.amazonaws.com/products?page=${page}`
                    )
                ).json();
            }

            const { products, meta }: IData = await fetchUrl(1);

            let totalProducts: IProducts[] = products;

            if (meta?.totalPages > 1 && totalProducts?.length < meta.totalItems) {
                for (let i = 2; i <= meta.totalPages; i++) {
                    const { products } = await fetchUrl(i);

                    totalProducts = [...totalProducts, ...products];
                }
            }

            setProducts(totalProducts);
        };

        productsFetch();
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products]);

    return (
        <TextField
            fullWidth
            select
            required
            id="outlined-required"
            onChange={(event) => {
                console.log(event);
                console.log(event.target);
                console.log(event.target.value);
                onChange(event?.target?.value);
            }}
            label="Product id"
        >
            {products?.map((option) => (
                <MenuItem key={option.name} value={option.id}>
                    {option.name}
                </MenuItem>
            ))}
        </TextField>
    )
}