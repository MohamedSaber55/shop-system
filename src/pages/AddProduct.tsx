import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert,
    Box,
    Grid,
    Typography,
    Divider,
} from '@mui/material';
import { categories } from "./../data/categories.json"

// interface Categories {
//     categories: { id: string; name: string }[];
// }

const AddProduct = () => {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');
    const formik = useFormik({
        initialValues: {
            name: '',
            quantity: "",
            isStock: true,
            price: "",
            category_id: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Product name is required'),
            quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
            price: Yup.number().min(0, 'Price must be a positive number').required('Price is required'),
            category_id: Yup.string().required('Category is required'),
        }),
        onSubmit: (values) => {
            console.log(values);
            setSuccessMessage('Product added successfully!');
            setSnackbarOpen(true);
            formik.resetForm();
        },
    });

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ padding: 0 }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Add New Product
            </Typography>
            <Divider sx={{ marginY: 2 }} />

            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            name="name"
                            variant="outlined"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Quantity"
                            name="quantity"
                            variant="outlined"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            helperText={formik.touched.quantity && formik.errors.quantity}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Price"
                            name="price"
                            variant="outlined"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="is-stock-label">In Stock</InputLabel>
                            <Select
                                labelId="is-stock-label"
                                label="In Stock"
                                name="isStock"
                                value={formik.values.isStock ? "true" : "false"}
                                onChange={(e) => formik.setFieldValue("isStock", e.target.value === "true")}
                            >
                                <MenuItem value="true">Yes</MenuItem>
                                <MenuItem value="false">No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                label="Category"
                                name="category_id"
                                value={formik.values.category_id}
                                onChange={formik.handleChange}
                                error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.category_id && formik.errors.category_id && (
                                <div style={{ color: 'red' }}>{formik.errors.category_id}</div>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary"
                    sx={{
                        mt: 2,
                        p: 2,
                        boxShadow: "none",
                        ":hover": {
                            boxShadow: "none"
                        }
                    }}>
                    Add Product
                </Button>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddProduct;