import React from 'react';
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

const AddOrder = () => {
    const [open, setOpen] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');

    const formik = useFormik({
        initialValues: {
            orderId: '',
            orderDate: '',
            totalAmount: '',
            discount: '',
            outstandingBalance: '',
            customerId: '',
            products: [],
            notes: '',
        },
        validationSchema: Yup.object({
            orderId: Yup.string().required('Order ID is required'),
            orderDate: Yup.date().required('Order Date is required').max(new Date(), 'Order Date cannot be in the future'),
            totalAmount: Yup.number().required('Total Amount is required').positive('Total Amount must be positive'),
            discount: Yup.number().required('Discount is required').min(0, 'Discount cannot be negative'),
            outstandingBalance: Yup.number().required('Outstanding Balance is required').min(0, 'Balance cannot be negative'),
            customerId: Yup.string().required('Customer ID is required'),
            products: Yup.array().min(1, 'At least one product must be selected'),
            notes: Yup.string(),
        }),
        onSubmit: (values) => {
            console.log(values);
            setSuccessMessage('Order added successfully!');
            setOpen(true);
            formik.resetForm();
        },
    });

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    // Sample customer and product data for the select dropdown
    const customers = [
        { id: 'cust1', name: 'Customer One' },
        { id: 'cust2', name: 'Customer Two' },
        { id: 'cust3', name: 'Customer Three' },
    ];

    const products = [
        { id: 'prod1', name: 'Product One' },
        { id: 'prod2', name: 'Product Two' },
        { id: 'prod3', name: 'Product Three' },
        { id: 'prod4', name: 'Product Four' },
    ];

    return (
        <Box sx={{ padding: 0 }}>
            <Typography variant="h5">Add New Order</Typography>
            <Divider sx={{ marginY: 2 }} />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Order Date"
                            name="orderDate"
                            type="date"
                            variant="outlined"
                            value={formik.values.orderDate}
                            onChange={formik.handleChange}
                            error={formik.touched.orderDate && Boolean(formik.errors.orderDate)}
                            helperText={formik.touched.orderDate && formik.errors.orderDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Total Amount"
                            name="totalAmount"
                            type="number"
                            variant="outlined"
                            value={formik.values.totalAmount}
                            onChange={formik.handleChange}
                            error={formik.touched.totalAmount && Boolean(formik.errors.totalAmount)}
                            helperText={formik.touched.totalAmount && formik.errors.totalAmount}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Discount"
                            name="discount"
                            type="number"
                            variant="outlined"
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                            error={formik.touched.discount && Boolean(formik.errors.discount)}
                            helperText={formik.touched.discount && formik.errors.discount}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Outstanding Balance"
                            name="outstandingBalance"
                            type="number"
                            variant="outlined"
                            value={formik.values.outstandingBalance}
                            onChange={formik.handleChange}
                            error={formik.touched.outstandingBalance && Boolean(formik.errors.outstandingBalance)}
                            helperText={formik.touched.outstandingBalance && formik.errors.outstandingBalance}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Customer"
                            name="customerId"
                            select
                            variant="outlined"
                            value={formik.values.customerId}
                            onChange={formik.handleChange}
                            error={formik.touched.customerId && Boolean(formik.errors.customerId)}
                            helperText={formik.touched.customerId && formik.errors.customerId}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {customers.map((customer) => (
                                <MenuItem key={customer.id} value={customer.id}>
                                    {customer.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Products"
                            name="products"
                            select
                            variant="outlined"
                            value={formik.values.products}
                            onChange={formik.handleChange}
                            error={formik.touched.products && Boolean(formik.errors.products)}
                            helperText={formik.touched.products && formik.errors.products}
                            SelectProps={{
                                multiple: true,
                                value: formik.values.products,
                                onChange: (event) => {
                                    const {
                                        target: { value },
                                    } = event;
                                    formik.setFieldValue("products", value);
                                },
                            }}
                        >
                            {products.map((product) => (
                                <MenuItem key={product.id} value={product.id}>
                                    {product.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Notes"
                            name="notes"
                            variant="outlined"
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            error={formik.touched.notes && Boolean(formik.errors.notes)}
                            helperText={formik.touched.notes && formik.errors.notes}
                            multiline
                            rows={4}
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
                        boxShadow: 'none',
                        ':hover': {
                            boxShadow: 'none',
                        },
                    }}
                >
                    Add Order
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

export default AddOrder;
