import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme"; 

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const ItemAndCarat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [itemList, setItemList] = useState([]);
  const [caratList, setCaratList] = useState([]);

  const fetchItemList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jewel/v1/getAllItems');
      setItemList(response.data);
     // console.log("first" + JSON.stringify(response.data))
    } catch (error) {
      console.error("Error while fetching list " + error)
    }
  }

  const fetchCaratist = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jewel/v1/getAllCarat');
      setCaratList(response.data);
      console.log("first" + JSON.stringify(response.data))
    } catch (error) {
      console.error("Error while fetching list " + error)
    }
  }

  useEffect(() =>
  {
    fetchItemList();
    fetchCaratist();
  },[])

  const itemLists = itemList.map((item, index) => ({
    ...item,
    serialNumber: index + 1,
  }));

  const caratLists = caratList.map((carat, index) => ({
    ...carat,
    serialNumber: index + 1,
  }));
  const columns = [
    { field: 'serialNumber', headerName: 'Sr No', flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

  ];


  const caratTableColumns = [
    { field: 'serialNumber', headerName: 'Sr No', flex: 1 },
    {
      field: "caratValue",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

  ];

  return (
    <Box m="20px">
      <Header title="ITEM | CARAT" subtitle="List of Items and Carat" />
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
      rows={itemLists}
      columns={columns}
    />
      </Box>
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
      rows={caratLists}
      columns={caratTableColumns}
    />
      </Box>
      </Box>
    </Box>
  );
};

export default ItemAndCarat;
