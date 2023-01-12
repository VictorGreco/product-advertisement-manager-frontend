import { useEffect, useState } from 'react';

import { useMutation, useLazyQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { useSnackbar } from 'notistack';

import {
    DELETE_ADVERTISEMENT,
    GET_ADVERTISEMENT_BY_ID
} from '../../commons/common.gql';

import { style } from '../../commons/common.styles';

export function DeleteAdvertisementModal() {
    const [deleteAdvertisement, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(DELETE_ADVERTISEMENT);
    const [getAdvertisementById, { data: queryData }] = useLazyQuery(GET_ADVERTISEMENT_BY_ID);
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [advertisementId, setAdvertisementId] = useState<string>('');

    const handleSetAdvertisementId = ({ target: { value } }: any) => {
        setAdvertisementId(value);
        getAdvertisementById({
            variables: {
                "id": value
            }
        })
    }

    const handleDeleteAdvertisementSubmit = () => {
        deleteAdvertisement({
            variables: {
                "id": advertisementId,
            }
        });

        handleClose();
    }

    useEffect(() => {
        !!mutationError && enqueueSnackbar(`Oops! ${mutationError.message} `, { variant: 'error' });
    }, [mutationError]);

    useEffect(() => {
        !!mutationLoading && enqueueSnackbar('Deleting advertisement... ~(O.O)~', { variant: 'info' });
    }, [mutationLoading]);

    useEffect(() => {
        !!mutationData && enqueueSnackbar('Advertisement deleted successfully', { variant: 'success' });
    }, [mutationData]);

    const renderHiddenFields = () => {

        if (!queryData) return null;

        return (
            <Grid item xs={12}>
                <Button onClick={handleDeleteAdvertisementSubmit}>Delete advertisement</Button>
            </Grid>
        )
    }

    return (
        <div>
            <Button onClick={handleOpen}>Remove advertisement</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Delete advertisement
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