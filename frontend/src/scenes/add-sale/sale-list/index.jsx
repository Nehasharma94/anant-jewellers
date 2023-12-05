import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const SaleList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [saleList, setsaleList] = useState([]);


  const fetchSaleList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jewel/v1/getAllSaleEntry');
      const updatedSaleList = response.data.map((item, index) => ({
        ...item,
        id: index + 1, 
        serialNumber: index + 1,
      }));
      setsaleList(updatedSaleList);
    } catch (error) {
      console.error("Error while fetching list " + error)
    }
  }
  

  useEffect(() => {
    fetchSaleList();

  }, [])

  const saleLists = saleList.map((item, index) => ({
    ...item,
    serialNumber: index + 1,
  }));


  const columns = [
    { field: 'serialNumber', headerName: 'Sr No', flex: 1 },
    {
      field: "customerInfo.name",valueGetter: (params) => (params.row.customerInfo ? params.row.customerInfo.name : ''),
      headerName: "Customer Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "customerInfo.fatherName", valueGetter: (params) => (params.row.customerInfo ? params.row.customerInfo.fatherName :  ''),
      headerName: "Father's Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "stockName",
      headerName: "Stock",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "totalAmt",
      headerName: "Total Amount ",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "amtPaid",
      headerName: "Amount Paid",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "remainingAmt",
      headerName: "Remaining Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    },




    {
      field: "weight",
      headerName: "Weight",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },

  ];

  return (
    <Box m="20px">
      <Header title="Sold Lists" subtitle="List of Sod Stocks" />
      <Box
        display="flex" // Set display to flex
      >

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
          }}
        >
          <DataGrid
            checkboxSelection
            rows={saleLists}
            columns={columns}
          />
        </Box>

      </Box>
    </Box>
  );
};

export default SaleList;
