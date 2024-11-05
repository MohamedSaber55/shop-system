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

// Dummy purchase data
const purchaseData = {
    id: "purchase_001",
    merchant: { id: "merchant_001", name: "John Doe", phone: "123-456-7890", address: "address" },
    purchase_date: "2024-10-23",
    total_amount: 150.75,
    outstanding_balance: 50.0,
    products: [
        {
            product_name: "Product One",
            quantity: 2,
            price_per_unit: 25.0,
            total_price: 50.0,
        },
        {
            product_name: "Product Two",
            quantity: 3,
            price_per_unit: 33.5,
            total_price: 100.5,
        },
    ],
    notes: "Sample note",
};

const PurchasePage: React.FC = () => {
    // CSV Export Function
    const exportToCSV = () => {
        const csvRows = [];

        // purchase details
        csvRows.push("purchase Details");
        csvRows.push(`purchase ID,${purchaseData.id}`);
        csvRows.push(`purchase Date,${purchaseData.purchase_date}`);
        csvRows.push(`Total Amount,${purchaseData.total_amount}`);
        csvRows.push(`Outstanding Balance,${purchaseData.outstanding_balance}`);
        csvRows.push(`Notes,${purchaseData.notes || ""}`);
        csvRows.push("");

        // merchant
        csvRows.push("Merchant Details");
        csvRows.push(`merchant ID,${purchaseData.merchant.id}`);
        csvRows.push(`merchant Name,${purchaseData.merchant.name}`);
        csvRows.push(`merchant Phone,${purchaseData.merchant.phone}`);
        csvRows.push(`merchant Address,${purchaseData.merchant.address}`);
        csvRows.push("");

        // Products Header
        csvRows.push("Products");
        csvRows.push("Product Name,Quantity,Price per Unit,Total Price");

        // Product rows
        purchaseData.products.forEach((product) => {
            csvRows.push(
                `${product.product_name},${product.quantity},${product.price_per_unit},${product.total_price}`
            );
        });

        // Convert array to CSV string
        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        // Create a link and trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = `purchase_${purchaseData.id}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Box p={0}>
            {/* Header with Export and Print Buttons */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Purchase Details</Typography>
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
                        to={`/purchases/id/update`}
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
                        Update purchase
                    </Button>
                </Stack>
            </Stack>

            <Divider sx={{ marginY: 2 }} />

            {/* purchase and merchant Info */}
            <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6">purchase Information</Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography><strong>purchase ID:</strong> {purchaseData.id}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>purchase Date:</strong> {purchaseData.purchase_date}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Total Amount:</strong> ${purchaseData.total_amount.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Outstanding Balance:</strong> ${purchaseData.outstanding_balance.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Notes:</strong> {purchaseData.notes}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Grid item md={6}>
                <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6">Merchant Information</Typography>
                        <Divider sx={{ marginY: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography><strong>Merchant ID: </strong>{purchaseData.merchant.id}</Typography>                        </Grid>
                            <Grid item xs={6}>
                                <Typography><strong>Merchant Name:</strong> {purchaseData.merchant.name}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography><strong>Merchant Phone:</strong> {purchaseData.merchant.phone}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography><strong>Merchant Address:</strong> {purchaseData.merchant.address}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
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
                                <TableCell>Product Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price per Unit</TableCell>
                                <TableCell>Total Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purchaseData.products.map((product, i) => (
                                <TableRow key={i}>
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

export default PurchasePage;
