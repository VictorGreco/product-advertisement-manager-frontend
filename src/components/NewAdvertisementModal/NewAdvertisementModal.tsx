import { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useSnackbar } from 'notistack';

import { NEW_ADVERTISEMENT } from '../../commons/common.gql';
import { style } from '../../commons/common.styles';

import { ProductIdInput } from '../ProductIdInput/ProductIdInput';

export function NewAdvertisementModal(): JSX.Element {
  const [newAdvertisement, {
    data, loading, error
  }] = useMutation(NEW_ADVERTISEMENT);

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [validUntil, setValidUntil] = useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  );
  const [productId, setProductId] = useState<number>(1234567);
  const [title, setTitle] = useState<string>('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleProductIdChange = ({ target: { value } }: any): void => {
    setProductId(parseInt(value));
  }

  const handleTitle = ({ target: { value } }: any): void => {
    setTitle(value);
  }

  const handleDiscountPercentage = ({ target: { value } }: any): void => {
    setDiscountPercentage(parseInt(value));
  }

  const handleValidUntilChange = (newValidUntilDate: Dayjs | null): void => {
    setValidUntil(newValidUntilDate);
  };

  const handleNewAdvertisementSubmit = (): void => {
    newAdvertisement({
      variables: {
        "newAdvertisementData": {
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
    setProductId(parseInt(''));
    setTitle('');
    setDiscountPercentage(parseInt(''));
  }, [])

  useEffect(() => {
    !!error && enqueueSnackbar(`Oops! ${error.message} `, { variant: 'error' });
  }, [error, enqueueSnackbar]);

  useEffect(() => {
    !!loading && enqueueSnackbar('Creating advertisement... ~(O.O)~', { variant: 'info' });
  }, [loading, enqueueSnackbar]);

  useEffect(() => {
    !!data && enqueueSnackbar('Advertisement created successfully', { variant: 'success' });
  }, [data, enqueueSnackbar]);

  useEffect(() => {
    console.log(productId);
  }, [productId])

  return (
    <div>
      <Button
        onClick={handleOpen}
      >
        Add advertisement
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
                New advertisement
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <ProductIdInput onChange={handleProductIdChange}/>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="outlined-required"
                label="Title"
                onChange={handleTitle}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="outlined-required"
                label="Discount percentage(%)"
                onChange={handleDiscountPercentage}
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
                onClick={handleNewAdvertisementSubmit}
              >
                Create advertisement
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}