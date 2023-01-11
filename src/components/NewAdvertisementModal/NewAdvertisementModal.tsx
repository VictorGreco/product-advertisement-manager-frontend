import { useEffect, useState } from 'react';

import { gql, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';


const NEW_ADVERTISEMENT = gql`
  mutation CreateNewAdvertisement($newAdvertisementData: NewAdvertisementInput!) {
    addAdvertisement(newAdvertisementData: $newAdvertisementData) {
      product_id
      title
      valid_until
      discount_percentage
    }
  }
`;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function NewAdvertisementModal() {
  const [newAdvertisement, { data, loading, error }] = useMutation(NEW_ADVERTISEMENT);
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [validUntil, setValidUntil] = useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  );

  const [productId, setProductId] = useState<number>(1234567);
  const [title, setTitle] = useState<string>('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  const handleProductIdChange = ({ target: { value } }: any) => {
    setProductId(parseInt(value));
  }

  const handleTitle = ({ target: { value } }: any) => {
    setTitle(value);
  }

  const handleDiscountPercentage = ({ target: { value } }: any) => {
    setDiscountPercentage(parseInt(value));
  }

  const handleValidUntilChange = (newValidUntilDate: Dayjs | null) => {
    setValidUntil(newValidUntilDate);
  };

  const handleNewAdvertisementSubmit = () => {
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
    !!error && enqueueSnackbar(`Oops! ${error.message} `, { variant: 'error' });
  }, [error]);

  useEffect(() => {
    !!loading && enqueueSnackbar('Creating advertisement... ~(O.O)~', { variant: 'info' });
  }, [loading]);

  useEffect(() => {
    !!data && enqueueSnackbar('Advertisement created successfully', { variant: 'success' });
  }, [data]);

  return (
    <div>
      <Button onClick={handleOpen}>Add advertisement</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New advertisement
          </Typography>

          <TextField
            required
            id="outlined-required"
            label="Product id"
            onChange={handleProductIdChange}
          />

          <TextField
            required
            id="outlined-required"
            label="Title"
            onChange={handleTitle}
          />

          <TextField
            required
            id="outlined-required"
            label="Discount percentage(%)"
            onChange={handleDiscountPercentage}
          />

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

          <Button onClick={handleNewAdvertisementSubmit}>Create advertisement</Button>
        </Box>
      </Modal>
    </div>
  );
}