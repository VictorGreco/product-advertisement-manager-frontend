import { useEffect, useState } from 'react';

import { useMutation, useLazyQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MenuItem from '@mui/material/MenuItem';

import dayjs, { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';

import {
    UPDATE_ADVERTISEMENT,
    GET_ADVERTISEMENT_BY_ID
} from '../../commons/common.gql';
import { style } from '../../commons/common.styles';

import { IProducts, IData } from '../../commons/interfaces/types';

export function UpdateAdvertisementModal(): JSX.Element {
    const [updateAdvertisement, {
        loading,
        error,
        data: mutationData
    }] = useMutation(UPDATE_ADVERTISEMENT);

    const [getAdvertisementById, {
        data: queryData
    }] = useLazyQuery(GET_ADVERTISEMENT_BY_ID);

    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);
    const [validUntil, setValidUntil] = useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );
    const [advertisementId, setAdvertisementId] = useState<string>('');
    const [productId, setProductId] = useState<number>(1234567);
    const [title, setTitle] = useState<string>('');
    const [discountPercentage, setDiscountPercentage] = useState<number>(0);
    const [products, setProducts] = useState<IProducts[]>();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSetAdvertisementId = ({ target: { value } }: any): void => {
        setAdvertisementId(value);
        getAdvertisementById({
            variables: {
                "id": value
            }
        })
    }

    const handleProductIdChange = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setProductId(parseInt(value));
    }

    const handleTitleChange = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setTitle(value);
    }

    const handleDiscountPercentageChange = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setDiscountPercentage(parseInt(value));
    }

    const handleValidUntilChange = (newValidUntilDate: Dayjs | null): void => {
        setValidUntil(newValidUntilDate);
    };

    const handleUpdateAdvertisementSubmit = (): void => {
        updateAdvertisement({
            variables: {
                "advertisementId": advertisementId,
                "updateAdvertisementData": {
                    "product_id": productId,
                    "title": title,
                    "valid_until": validUntil,
                    "discount_percentage": discountPercentage
                }
            }
        });

        handleClose();
    }

    useEffect(() => {
        !!error && enqueueSnackbar(`Oops! ${error.message} `, { variant: 'error' });
    }, [error, enqueueSnackbar]);

    useEffect(() => {
        !!loading && enqueueSnackbar('Updating advertisement... ~(O.O)~', { variant: 'info' });
    }, [loading, enqueueSnackbar]);

    useEffect(() => {
        !!mutationData && enqueueSnackbar('Advertisement updated successfully', { variant: 'success' });
    }, [mutationData, enqueueSnackbar]);

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
        const advertisement = queryData?.advertisement;

        if (queryData && advertisement) {
            const { product_id, title, valid_until, discount_percentage } = advertisement;

            setProductId(product_id);
            setDiscountPercentage(discount_percentage);
            setValidUntil(valid_until);
            setTitle(title);
        }
    }, [queryData])

    const renderHiddenFields = (): JSX.Element | null => {

        if (!queryData) return null;

        return (
            <>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        select
                        required
                        id="outlined-required"
                        value={productId}
                        onChange={handleProductIdChange}
                        label="Product id"
                    >
                        {products?.map((option) => (
                            <MenuItem key={option.name} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Discount percentage(%)"
                        value={discountPercentage}
                        onChange={handleDiscountPercentageChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack>
                            <DateTimePicker
                                label="Valid until"
                                value={validUntil}
                                onChange={handleValidUntilChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        onClick={handleUpdateAdvertisementSubmit}>
                        Update advertisement
                    </Button>
                </Grid>
            </>
        )
    }

    return (
        <div>
            <Button
                onClick={handleOpen}
            >
                Edit advertisement
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Update advertisement
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Advertisement id"
                                onChange={handleSetAdvertisementId}
                            />
                        </Grid>

                        {renderHiddenFields()}
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}