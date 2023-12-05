import React, { useState } from "react";
import { Alert, Box, Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from 'axios';
import Header from "../../components/Header";

const AddCustomerInfo = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [values, setValues] = useState();
  const [customerData, setCustomerData] = useState({
    name: "",
    mobile: "",
    address: "",
    fatherName: "",
    adharNo: "",
  });


  const handleFormSubmit = async () => {
    try {
      console.log(customerData);
  
      
      const response = await customerEntry();
      console.log("API Response:", response);
  
      setShowSuccessAlert(true);
  
      // Reset the form
      setCustomerData({
        name: "",
        mobile: "",
        address: "",
        fatherName: "",
        adharNo: "",
      });
    } catch (error) {
      console.error("Error is " + error);
    }
  };
  

  const customerEntry = async () => {
   
    try {
      const response = await axios.post(
        'http://localhost:8080/jewel/v1/addCustomer',
        {
          name: customerData.name,
          mobileNo: customerData.mobile,
          address: customerData.address,
          fatherName: customerData.fatherName,
          adharNo: customerData.adharNo,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while making API request:", error);
      throw error;
    }
  };

  const customerSchema = yup.object().shape({
    name: yup.string(),
    mobile: yup.string().matches(phoneRegExp, 'Invalid mobile number'),
    address: yup.string(),
    fatherName: yup.string(),
    adharNo: yup.string()
  });

  const initialValues = {
    name: "",
    mobile: "",
    address: "",
    fatherName: "",
    adharNo: "",
  };


  const handleCloseAlert = () => {
    // Close the success alert
    setShowSuccessAlert(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  return (
    <Box m="20px">
      <Header title="Add Customer" subtitle="Create a New Customer Entry" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={customerSchema}
      >
        {({
          errors,
          touched,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={customerData.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mobile"
                onBlur={handleBlur}
                onChange={handleChange}
                value={customerData.mobile}
                name="mobile"
                error={!!touched.mobile && !!errors.mobile}
                helperText={touched.mobile && errors.mobile}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={customerData.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Father's Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={customerData.fatherName}
                name="fatherName"
                error={!!touched.fatherName && !!errors.fatherName}
                helperText={touched.fatherName && errors.fatherName}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="adharNo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={customerData.adharNo}
                name="adharNo"
                error={!!touched.adharNo && !!errors.adharNo}
                helperText={touched.adharNo && errors.adharNo}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Customer
              </Button>
            </Box>
            {showSuccessAlert && (
              <Alert onClose={handleCloseAlert} severity="success">
                Customer added successfully
              </Alert>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export default AddCustomerInfo;
