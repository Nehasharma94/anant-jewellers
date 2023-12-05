import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Menu,
  Paper,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from 'axios';

const AddBorrowedMoney = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [customerList, setCustomerList] = useState([]); // Define customer list state
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [borrowedAmt, setborrowedAmt] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchCustomerList();
  }, []);

  const fetchCustomerList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jewel/v1/getAllCustomer');
      setCustomerList(response.data);
    } catch (error) {
      console.error("Error while fetching customer list: " + error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (customer) => {
    setSelectedCustomer(customer);
    handleClose();
  };

  const initialValues = {
    // other fields
    borrowedAmt: "",
  };
  

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/jewel/v1/addBorrowedMoney',
        {
          customerInfo: selectedCustomer.id,
          borrowedAmt: borrowedAmt,
        }
      );
      console.log('Borrowed Money added:', response.data);
      setSelectedCustomer("");
      setborrowedAmt("");
    } catch (error) {
      console.error("Error while adding borrowed money: " + error);
    }
  };

  const customerSchema = yup.object().shape({
    borrowedAmt: yup
      .number()
      .positive("Borrowed amount must be positive"),
  });

  return (
    <Box m="20px">
      <Header title="Add Borrowed Money" subtitle="Add Borrowed Money Entry" />
  
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ borrowedAmt: "" }}
        validationSchema={customerSchema}
      >
        {({
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                required
                variant="filled"
                select
                label="Select Customer"
                value={selectedCustomer}
                onClick={handleClick}
                error={touched.selectedCustomer && !!errors.selectedCustomer}
                helperText={touched.selectedCustomer && errors.selectedCustomer}
                sx={{ gridColumn: "span 2" }}
              >
                {customerList.map((customer) => (
                  <MenuItem
                    key={customer.id}
                    value={customer}
                    onClick={() => handleMenuItemClick(customer)}
                  >
                    {customer.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                variant="filled"
                type="number"
                label="Borrowed Amount"
                onBlur={handleBlur}
                onChange={(e) => setborrowedAmt(e.target.value)}
                value={borrowedAmt}
                name="borrowedAmt"
                error={touched.borrowedAmt && !!errors.borrowedAmt}
                helperText={touched.borrowedAmt && errors.borrowedAmt}
                sx={{ gridColumn: "span 2" }}
              />
              </Box>
             <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" onClick={handleFormSubmit}>
                Create New Stock
              </Button>
            
            </Box>
          </form>
        )}
      </Formik>
  
      <Menu
        id="customer-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {customerList.map((customer) => (
          <MenuItem
            key={customer.id}
            onClick={() => handleMenuItemClick(customer)}
          >
            {customer.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
  
};

export default AddBorrowedMoney;
