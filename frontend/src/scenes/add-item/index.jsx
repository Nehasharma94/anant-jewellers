import React, { useState } from "react";
import { Alert, Box, Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from 'axios';
import Header from "../../components/Header";


const AddItem = () => {
  const [item, setItem] = useState("");
  const [carat, setCarat] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      console.log(values);

      // Use the correct values from the Formik form
      const response1 = await itemEntry(values.item);
      console.log("First API Response:", response1);

      const response2 = await caratEntry(values.carat); // Call your second API function here
      console.log("Second API Response:", response2);
      setShowSuccessAlert(true);
      values.item = ''

    

      // Handle the responses as needed
    } catch (error) {
      console.error("Error is " + error);
    }
  };

  const itemEntry = async (itemValue) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/jewel/v1/addItem',
        {
          name: itemValue,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while making API request:", error);
      throw error;
    }
  };

  const caratEntry = async (caratValue) => {
    try {
      const response = await axios.post('http://localhost:8080/jewel/v1/addCarat',
        {
          caratValue: caratValue,
        });
     
       
      return response.data;
      
    } catch (error) {
      console.error("Error while making second API request:", error);
      throw error;
    }
  };
  

  const checkoutSchema = yup.object().shape({
    item: yup.string().required("Required"),

  });

  const initialValues = {
    item: "",
    carat: "",
  };
  const handleCloseAlert = () => {
    // Close the success alert
    setShowSuccessAlert(false);
  };

  return (
    <Box m="20px">
      
      <Header title="Add Item" subtitle="Create a New Item Entry" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
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
                label="Item"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.item}
                name="item"
                error={!!touched.item && !!errors.item}
                helperText={touched.item && errors.item}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Carat"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.carat}
                name="carat"
                error={!!touched.carat && !!errors.carat}
                helperText={touched.carat && errors.carat}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
            {showSuccessAlert && (
        <Alert onClose={handleCloseAlert} severity="success">
          Item and Carat added successfully
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

export default AddItem;
