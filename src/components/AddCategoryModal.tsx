import React from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { MdAddCircleOutline } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

// Define the types for the component props
interface AddCategoryModalProps {
    open: boolean;
    handleClose: () => void;
    onAddCategory: (category: CategoryValues) => void;
}

// Define the type for the form values
interface CategoryValues {
    name: string;
}

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string()
        .required('Category name is required')
        .min(3, 'Must be at least 3 characters'),
});

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ open, handleClose, onAddCategory }) => {
    const formik = useFormik<CategoryValues>({
        initialValues: {
            name: '',
        },
        validationSchema,
        onSubmit: (values: CategoryValues, { resetForm }: FormikHelpers<CategoryValues>) => {
            onAddCategory(values);
            resetForm();
            handleClose();
        },
    });

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="h2">
                        Add New Category
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <IoClose />
                    </IconButton>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Category Name"
                        variant="outlined"
                        margin="normal"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<MdAddCircleOutline />}
                        >
                            Add Category
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default AddCategoryModal;
