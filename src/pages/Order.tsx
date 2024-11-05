import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Stack,
    Divider,
    Grid,
    TableContainer,
} from "@mui/material";
import { SaveAlt as ExportIcon, Print as PrintIcon, Edit as EditIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Dummy order data
const orderData = {
    id: "order_001",
    customer: { id: "customer_001", name: "John Doe", phone: "123-456-7890" },
    cashier: { id: "cashier_001", name: "Jane Smith", phone: "+201234567890" },
    order_date: "2024-10-23",
    total_amount: 150.75,
    outstanding_balance: 50.0,
    discount: 2.0,
    products: [
        {
            product_id: "product_001",
            product_name: "Product One",
            quantity: 2,
            price_per_unit: 25.0,
            total_price: 50.0,
        },
        {
            product_id: "product_002",
            product_name: "Product Two",
            quantity: 3,
            price_per_unit: 33.5,
            total_price: 100.5,
        },
    ],
    notes: "Sample note",
};

const OrderPage: React.FC = () => {
    // CSV Export Function
    const exportToCSV = () => {
        const csvRows = [];

        // Order details
        csvRows.push("Order Details");
        csvRows.push(`Order ID,${orderData.id}`);
        csvRows.push(`Order Date,${orderData.order_date}`);
        csvRows.push(`Total Amount,${orderData.total_amount}`);
        csvRows.push(`Discount,${orderData.discount}`);
        csvRows.push(`Outstanding Balance,${orderData.outstanding_balance}`);
        csvRows.push(`Notes,${orderData.notes || ""}`);
        csvRows.push(""); // Blank line

        // Customer and Cashier
        csvRows.push("Customer and Cashier");
        csvRows.push(`Customer ID,${orderData.customer.id}`);
        csvRows.push(`Customer Name,${orderData.customer.name}`);
        csvRows.push(`Customer Phone,${orderData.customer.phone}`);
        csvRows.push(`Cashier ID,${orderData.cashier.id}`);
        csvRows.push(`Cashier Name,${orderData.cashier.name}`);
        csvRows.push(`Cashier Phone,${orderData.cashier.phone}`);
        csvRows.push(""); // Blank line

        // Products Header
        csvRows.push("Products");
        csvRows.push("Product ID,Product Name,Quantity,Price per Unit,Total Price");

        // Product rows
        orderData.products.forEach((product) => {
            csvRows.push(
                `${product.product_id},${product.product_name},${product.quantity},${product.price_per_unit},${product.total_price}`
            );
        });

        // Convert array to CSV string
        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        // Create a link and trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = `Order_${orderData.id}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Box p={0}>
            {/* Header with Export and Print Buttons */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Order Details</Typography>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                            boxShadow: "none",
                            textTransform: 'none',
                            fontWeight: 'bold',
                            "&:hover": {
                                boxShadow: "none",
                                backgroundColor: 'primary.light',
                                color: 'white',
                            },
                        }}
                        startIcon={<PrintIcon />}
                        onClick={() => window.print()}
                    >
                        Print Invoice
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                            textTransform: 'none',
                            boxShadow: "none",
                            fontWeight: 'bold',
                            "&:hover": {
                                boxShadow: "none",
                                backgroundColor: 'success.dark',
                            },
                        }}
                        startIcon={<ExportIcon />}
                        onClick={exportToCSV}
                    >
                        Export as CSV
                    </Button>
                    <Button
                        component={Link}
                        to={`/orders/id/update`}
                        variant="contained"
                        color="warning"
                        sx={{
                            textTransform: 'none',
                            boxShadow: "none",
                            fontWeight: 'bold',
                            "&:hover": {
                                boxShadow: "none",
                                backgroundColor: 'warning.dark',
                                color: 'white',
                            },
                        }}
                        startIcon={<EditIcon />}
                    >
                        Update Order
                    </Button>
                </Stack>
            </Stack>

            <Divider sx={{ marginY: 2 }} />

            {/* Order and Customer Info */}
            <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6">Order Information</Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography><strong>Order ID:</strong> {orderData.id}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Order Date:</strong> {orderData.order_date}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Total Amount:</strong> ${orderData.total_amount.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Discount:</strong> ${orderData.discount.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Outstanding Balance:</strong> ${orderData.outstanding_balance.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Notes:</strong> {orderData.notes}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Grid container spacing={2}>
                <Grid xs={12} item md={6}>
                    <Card variant="outlined" sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6">Customer Information</Typography>
                            <Divider sx={{ marginY: 2 }} />
                            <Stack gap={2}>
                                <Typography><strong>Customer ID: </strong>{orderData.customer.id}</Typography>
                                <Typography><strong>Customer Name:</strong> {orderData.customer.name}</Typography>
                                <Typography><strong>Customer Phone:</strong> {orderData.customer.phone}</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} item md={6}>
                    <Card variant="outlined" sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6">Casher Information</Typography>
                            <Divider sx={{ marginY: 2 }} />
                            <Stack gap={2}>
                                <Typography><strong>Casher ID: </strong>{orderData.cashier.id}</Typography>
                                <Typography><strong>Casher Name:</strong> {orderData.cashier.name}</Typography>
                                <Typography><strong>Casher Phone:</strong> {orderData.cashier.phone}</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


            <TableContainer component={Card} variant="outlined">
                <CardContent>
                    {/* Product Table */}
                    <Typography variant="h6" gutterBottom>
                        Products
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product ID</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price per Unit</TableCell>
                                <TableCell>Total Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderData.products.map((product) => (
                                <TableRow key={product.product_id}>
                                    <TableCell>{product.product_id}</TableCell>
                                    <TableCell>{product.product_name}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>${product.price_per_unit.toFixed(2)}</TableCell>
                                    <TableCell>${product.total_price.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </TableContainer>
        </Box>
    );
};

export default OrderPage;
