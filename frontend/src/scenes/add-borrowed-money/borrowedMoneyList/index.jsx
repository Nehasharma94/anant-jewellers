import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme"; 

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const BorrowedMoneyList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [borrowedMoneyList, setborrowedMoneyList] = useState([]);


  
  const fetchBorrowedMoneyList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jewel/v1/getAllBorrowedMoney');
      setborrowedMoneyList(response.data);
    // console.log("first" + JSON.stringify(response.data))
    } catch (error) {
    // console.error("Error while fetching list " + error)
    }
  }
  useEffect(() =>
  {
    fetchBorrowedMoneyList();
    
  },[])

  console.log("Fetched Data:", borrowedMoneyList);
  const borrowedMoneyLists = borrowedMoneyList.map((borrowedMoney, index) => ({
    ...borrowedMoney,
    
  }));
  
 
  const columns = [
    { field: "customerInfo.name ", headerName: 'Customer Name', flex: 1 , valueGetter: params => params.row.customerInfo.name },
    
    {
      field: "borrowedAmt",
      headerName: "Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    }
   

  ];
  // console.log("Columns:", columns);



  return (
    <Box m="20px">
      <Header title="Money Borrowed" subtitle="List of Money Borrowed" />
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
      rows={borrowedMoneyLists}
      columns={columns}
    />
      </Box>
    
      </Box>
    </Box>
  );
};

export default BorrowedMoneyList;
