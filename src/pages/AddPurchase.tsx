import React, { useEffect } from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Typography,
    Grid,
    Snackbar,
    Alert,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const AddPurchase = () => {
    const [open, setOpen] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');

    const formik = useFormik({
        initialValues: {
            merchantId: '',
            orderDate: '',
            totalAmount: 0,
            outstandingBalance: '',
            products: [
                { productName: '', quantity: 0, pricePerUnit: 0, totalPrice: 0 }
            ]
        },
        validationSchema: Yup.object({
            merchantId: Yup.string().required('Merchant ID is required'),
            orderDate: Yup.date().required('Order date is required'),
            outstandingBalance: Yup.number().required('Outstanding balance is required'),
            products: Yup.array().of(
                Yup.object({
                    productName: Yup.string().required('Product name is required'),
                    quantity: Yup.number().required('Quantity is required').positive(),
                    pricePerUnit: Yup.number().required('Price per unit is required').positive(),
                    totalPrice: Yup.number().required('Total price is required').positive(),
                })
            )
        }),
        onSubmit: (values) => {
            console.log(values);
            setSuccessMessage('Purchase added successfully!');
            setOpen(true);
            formik.resetForm();
        }
    });

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    // Effect to automatically update total price for each product and total amount
    useEffect(() => {
        const updatedProducts = formik.values.products.map((product) => ({
            ...product,
            totalPrice: product.quantity * product.pricePerUnit
        }));

        const totalAmount = updatedProducts.reduce(
            (sum, product) => sum + product.totalPrice,
            0
        );

        formik.setFieldValue('products', updatedProducts, false);
        formik.setFieldValue('totalAmount', totalAmount, false);
    }, [formik, formik.values.products]);

    return (
        <Box>
            <Typography variant="h5">Add Purchase</Typography>
            <Divider sx={{ marginY: 2 }} />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="merchant-label">Merchant</InputLabel>
                            <Select
                                labelId="merchant-label"
                                label="Merchant"
                                name="merchantId"
                                value={formik.values.merchantId}
                                onChange={formik.handleChange}
                                error={formik.touched.merchantId && Boolean(formik.errors.merchantId)}
                            >
                                <MenuItem value="merchant1">Merchant 1</MenuItem>
                                <MenuItem value="merchant2">Merchant 2</MenuItem>
                            </Select>
                            {formik.touched.merchantId && formik.errors.merchantId && (
                                <Typography color="error">{formik.errors.merchantId}</Typography>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Order Date"
                            name="orderDate"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.orderDate}
                            onChange={formik.handleChange}
                            error={formik.touched.orderDate && Boolean(formik.errors.orderDate)}
                            helperText={formik.touched.orderDate && formik.errors.orderDate}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Total Amount"
                            name="totalAmount"
                            type="number"
                            variant="outlined"
                            value={formik.values.totalAmount}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
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
                        <FormikProvider value={formik} >
                            <FieldArray name="products">
                                {({ push, remove }) => (
                                    <>
                                        {formik.values.products.map((product, index) => (
                                            <Grid container spacing={2} mb={2} key={index} alignItems="center">
                                                <Grid item xs={12} sm={3}>
                                                    <TextField
                                                        fullWidth
                                                        label="Product Name"
                                                        name={`products[${index}].productName`}
                                                        variant="outlined"
                                                        value={product.productName}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.products?.[index]?.productName && Boolean(formik.errors.products?.[index]?.productName)}
                                                        helperText={formik.touched.products?.[index]?.productName && formik.errors.products?.[index]?.productName}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={2}>
                                                    <TextField
                                                        fullWidth
                                                        label="Quantity"
                                                        name={`products[${index}].quantity`}
                                                        type="number"
                                                        variant="outlined"
                                                        value={product.quantity}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.products?.[index]?.quantity && Boolean(formik.errors.products?.[index]?.quantity)}
                                                        helperText={formik.touched.products?.[index]?.quantity && formik.errors.products?.[index]?.quantity}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <TextField
                                                        fullWidth
                                                        label="Price per Unit"
                                                        name={`products[${index}].pricePerUnit`}
                                                        type="number"
                                                        variant="outlined"
                                                        value={product.pricePerUnit}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.products?.[index]?.pricePerUnit && Boolean(formik.errors.products?.[index]?.pricePerUnit)}
                                                        helperText={formik.touched.products?.[index]?.pricePerUnit && formik.errors.products?.[index]?.pricePerUnit}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <TextField
                                                        fullWidth
                                                        label="Total Price"
                                                        name={`products[${index}].totalPrice`}
                                                        type="number"
                                                        variant="outlined"
                                                        value={product.totalPrice}
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={1}>
                                                    <IconButton sx={{border:"1px solid"}} color="primary" onClick={() => remove(index)}>
                                                        <Remove />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        ))}
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={() => push({ productName: '', quantity: 0, pricePerUnit: 0, totalPrice: 0 })}
                                            startIcon={<Add />}
                                            sx={{ mt: 2 }}
                                        >
                                            Add Product
                                        </Button>
                                    </>
                                )}
                            </FieldArray>
                        </FormikProvider>
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                    Add Purchase
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

export default AddPurchase;
