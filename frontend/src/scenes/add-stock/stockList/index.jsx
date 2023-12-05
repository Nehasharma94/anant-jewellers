import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme"; 

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const StockList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stockList, setstockList] = useState([]);


  
  const fetchStockList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jewel/v1/getAllStock');
      setstockList(response.data);
     console.log("first" + JSON.stringify(response.data))
    } catch (error) {
      console.error("Error while fetching list " + error)
    }
  }
  useEffect(() =>
  {
    fetchStockList();
    
  },[])

  const stockLists = stockList.map((stock, index) => ({
    ...stock,
    serialNumber: index + 1,
  }));

  
  const columns = [
    { field: 'serialNumber', headerName: 'Sr No', flex: 1 },
    
    {
      field: "stockName",
      headerName: "Stock",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "carat",
      headerName: "Carat",
      flex: 1,
      renderCell: (params) => <span>{params.value.caratValue}</span>,
    },
    {
      field: "weight",
      headerName: "Weight",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "item",
      headerName: "Item",
      flex: 1,
      renderCell: (params) => <span>{params.value.name}</span>,
    },
    

  ];




  return (
    <Box m="20px">
      <Header title="Stock" subtitle="List of Stocks" />
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
      rows={stockLists}
      columns={columns}
    />
      </Box>
    
      </Box>
    </Box>
  );
};

export default StockList;
