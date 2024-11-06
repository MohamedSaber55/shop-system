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
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateOrder = () => {
    const { orderId } = useParams();
    const [orderData] = useState({
        customer_id: "customer_001",
        order_date: "2024-10-23",
        total_amount: 150.75,
        outstanding_balance: 50.00,
        discount: 2.00,
        casher_id: "user_id ",
        products: [
            {
                product_id: 1,
                product_name: "Product One",
                quantity: 2,
                price_per_unit: 25.00,
                total_price: 50.00
            },
            {
                product_id: 2,
                product_name: "Product Two",
                quantity: 3,
                price_per_unit: 33.50,
                total_price: 100.50
            }
        ],
        "notes": "note"
    });
    const [open, setOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const customers = [
        { id: 'customer_001', name: 'Customer One' },
        { id: 'customer_002', name: 'Customer Two' },
        { id: 'customer_003', name: 'Customer Three' },
    ];

    const products = [
        { id: 1, name: 'Product One' },
        { id: 2, name: 'Product Two' },
        { id: 3, name: 'Product Three' },
        { id: 4, name: 'Product Four' },
    ];

    const formik = useFormik({
        initialValues: {
            order_date: orderData ? orderData.order_date : '',
            total_amount: orderData ? orderData.total_amount : '',
            discount: orderData ? orderData.discount : '',
            outstanding_balance: orderData ? orderData.outstanding_balance : '',
            customer_id: orderData ? orderData.customer_id : '',
            products: orderData ? orderData.products.map(product => product.product_id) : [],
            notes: orderData ? orderData.notes : '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            order_date: Yup.date().required('Order Date is required').max(new Date(), 'Order Date cannot be in the future'),
            total_amount: Yup.number().required('Total Amount is required').positive('Total Amount must be positive'),
            discount: Yup.number().required('Discount is required').min(0, 'Discount cannot be negative'),
            outstanding_balance: Yup.number().required('Outstanding Balance is required').min(0, 'Balance cannot be negative'),
            customer_id: Yup.string().required('Customer ID is required'),
            products: Yup.array().min(1, 'At least one product must be selected'),
            notes: Yup.string(),
        }),
        onSubmit: async (values) => {
            try {
                await axios.put(`/api/orders/${orderId}`, values);
                setSuccessMessage('Order updated successfully!');
                setOpen(true);
            } catch (error) {
                console.error("Error updating order", error);
            }
        },
    });

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    if (!orderData) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ padding: 0 }}>
            <Typography variant="h5">Update Order</Typography>
            <Divider sx={{ marginY: 2 }} />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Order Date"
                            name="order_date"
                            type="date"
                            variant="outlined"
                            value={formik.values.order_date}
                            onChange={formik.handleChange}
                            error={formik.touched.order_date && Boolean(formik.errors.order_date)}
                            helperText={formik.touched.order_date && formik.errors.order_date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Total Amount"
                            name="total_amount"
                            type="number"
                            variant="outlined"
                            value={formik.values.total_amount}
                            onChange={formik.handleChange}
                            error={formik.touched.total_amount && Boolean(formik.errors.total_amount)}
                            helperText={formik.touched.total_amount && formik.errors.total_amount}
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
                            name="outstanding_balance"
                            type="number"
                            variant="outlined"
                            value={formik.values.outstanding_balance}
                            onChange={formik.handleChange}
                            error={formik.touched.outstanding_balance && Boolean(formik.errors.outstanding_balance)}
                            helperText={formik.touched.outstanding_balance && formik.errors.outstanding_balance}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Customer"
                            name="customer_id"
                            select
                            variant="outlined"
                            value={formik.values.customer_id}
                            onChange={formik.handleChange}
                            error={formik.touched.customer_id && Boolean(formik.errors.customer_id)}
                            helperText={formik.touched.customer_id && formik.errors.customer_id}
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
                            onChange={(event) => formik.setFieldValue('products', event.target.value)}
                            error={formik.touched.products && Boolean(formik.errors.products)}
                            helperText={formik.touched.products && formik.errors.products}
                            SelectProps={{
                                multiple: true,
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
                    Update Order
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

export default UpdateOrder;
