import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, Toolbar, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import axios from "axios";

const CustomerList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [customerList, setCustomerList] = useState([]);

  const fetchCustomerList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jewel/v1/getAllCustomer');
      setCustomerList(response.data);
    } catch (error) {
      console.error("Error while fetching customer list: " + error)
    }
  }

  useEffect(() => {
    fetchCustomerList();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "mobileNo",
      headerName: "Mobile",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "fatherName",
      headerName: "Father's Name",
      flex: 1,
    },
    {
      field: "adharNo",
      headerName: "Adhar No",
      flex: 1,
    },
  ];

  const customerRows = customerList.map((customer) => ({
    ...customer,
    id: customer.id.toString(), // Convert ID to string for DataGrid
  }));

  return (
    <Box m="20px">
      <Header title="CUSTOMER LIST" subtitle="List of Customers" />
      <Box m="40px 0 0 0" height="75vh">
      <Box
        m="40px 0 0 0"
        height="75vh"
        flex="1"
        mr="10px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={customerRows}
          columns={columns}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
        />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerList;
