import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Typography,
    Grid,
    Snackbar,
    Alert,
    Divider,
    MenuItem,
    Box,
} from '@mui/material';

const UpdateExpense = () => {
    const [open, setOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Example of an expense to be updated (could come from a database or other source)
    const [expense] = useState({
        amount: 150,
        date: '2024-10-23',
        category: 'Utilities',
        info: 'Electricity bill'
    });

    const formik = useFormik({
        initialValues: {
            amount: expense.amount || '',
            date: expense.date || '',
            category: expense.category || '',
            info: expense.info || ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            amount: Yup.number()
                .required('Amount is required')
                .positive('Amount must be a positive number'),
            date: Yup.date()
                .required('Date is required')
                .max(new Date(), 'Date cannot be in the future'),
            category: Yup.string().required('Category is required'),
            info: Yup.string()
        }),
        onSubmit: (values) => {
            console.log("Updated Expense:", values);
            setSuccessMessage('Expense updated successfully!');
            setOpen(true);
        }
    });

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ padding: 0 }}>
            <Typography variant="h5">Update Expense</Typography>
            <Divider sx={{ marginY: 2 }} />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Amount"
                            name="amount"
                            variant="outlined"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                            helperText={formik.touched.amount && formik.errors.amount}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Date"
                            name="date"
                            type="date"
                            variant="outlined"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            error={formik.touched.date && Boolean(formik.errors.date)}
                            helperText={formik.touched.date && formik.errors.date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            select
                            variant="outlined"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                        >
                            <MenuItem value="Rent">Rent</MenuItem>
                            <MenuItem value="Utilities">Utilities</MenuItem>
                            <MenuItem value="Salaries">Salaries</MenuItem>
                            <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Additional Info"
                            name="info"
                            variant="outlined"
                            value={formik.values.info}
                            onChange={formik.handleChange}
                            error={formik.touched.info && Boolean(formik.errors.info)}
                            helperText={formik.touched.info && formik.errors.info}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        mt: 2,
                        p: 2,
                        boxShadow: "none",
                        ":hover": {
                            boxShadow: "none"
                        }
                    }}
                >
                    Update Expense
                </Button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UpdateExpense;
