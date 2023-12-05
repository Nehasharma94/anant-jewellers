import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "@mui/material/styles";
import StockList from "../add-stock/stockList";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import { format } from 'date-fns';

// ... (import statements)

const AddGirvi = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const ITEM_HEIGHT = 48;

  const [anchorElItem, setAnchorElItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [principalAmt, setPrincipalAmt] = useState("");
  const [roi, setRoi] = useState("");
  const [description, setDescription] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [girviEntries, setGirviEntries] = useState([]);




  useEffect(() => {
    //fetchItemList();
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


  const columns = [
    { field: 'serialNumber', headerName: 'Sr No', flex: 1 },
    {
      field: "customerName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "fatherName",
      headerName: "Father's Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "goldOrSilver",
      headerName: "Type",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "principalAmt",
      headerName: "Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    },



    {
      field: "roi",
      headerName: "ROI",
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


  const addGirviEntryToList = (newEntry) => {
    setGirviEntries((prevEntries) => [...prevEntries, newEntry]);

    // setSelectedItem(null);
    // setSelectedStock(null);
    // setprincipalAmt("");
    // setRemainingAmtt("");
    // setAmtPaid("");
    // setSelectedCustomer("");
  }

 const getCurrentDate= () => {
  const currentDate = new Date();
  return format(currentDate, 'yyyy-MM-dd');
 }




  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (customer) => {
    setSelectedCustomer(customer);
    setSelectedCustomerId(customer.id);
    handleClose();
  };
  const handleFormSubmit = async (e) => {
    console.log("first")
    e.preventDefault();
    console.log("handleFormSubmit called"); // 
    if (girviEntries.length == 0) {
      console.log("No Sale Entries Added"); // C
      return;
    }
    console.log("entry added:" + JSON.stringify(girviEntries));

    const date = getCurrentDate();
    try {
      const requestData = girviEntries.map((entry) => ({
        description: entry.description,
        principalAmt: entry.principalAmt,
        roi: entry.roi,
        goldOrSilver: entry.goldOrSilver,
        customerInfo: selectedCustomerId,
        date: date
      }));
      console.log("requests" + JSON.stringify(requestData))

      const response = await axios.post(
        "http://localhost:8080/jewel/v1/addGirvi",
        requestData

      );

      setGirviEntries([]);
      setPrincipalAmt("");
      setDescription("")
      setRoi("");
      setCustomerList([]);
      setSelectedType("")

      console.log("Sale added:", response.data);
    } catch (error) {
      console.error("Error while adding stock: " + error);
    }
  };


  const handleTypeSelection = (jewelType) => {
    setSelectedType(jewelType);
    //   fetchStockList(item.id);

    setAnchorElItem(null);
  };

  console.log("girviEntry" + JSON.stringify(girviEntries))
  const handleAddGirviEntry = (e) => {
    e.preventDefault();
    // if (!selectedStock) {
    //   return;
    // }

    const newEntry = {
      customerName: selectedCustomer.name,
      fatherName: selectedCustomer.fatherName,
      goldOrSilver: selectedType,
      description: description,
      roi: roi,
      principalAmt: principalAmt
    };

    addGirviEntryToList(newEntry);
  }




  return (
    <Box m="20px">
      <Header title="Add Girvi " subtitle="Create a New Girvi Entry" />

      <form onSubmit={handleAddGirviEntry}>
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
            autoCorrect="off"
            onClick={handleClick}
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
          {/* Item Selection */}
          <TextField
            fullWidth
            required
            variant="filled"
            type="text"
            label="Jewel Type"
            value={selectedType}
            autoCorrect="off"
            onClick={(e) => setAnchorElItem(e.currentTarget)}
            InputProps={{
              endAdornment: <span style={{ marginLeft: "auto" }}>▼</span>,
            }}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Description"
            autoCorrect="off"
            // onBlur={handleBlur}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name="description"
            sx={{ gridColumn: "span 2" }}
          // error={!!touched.carat && !!errors.carat}
          // helperText={touched.carat && errors.carat}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Principal Amount"
            autoCorrect="off"
            // onBlur={handleBlur}
            // onChange={handleChange}
            value={principalAmt}
            name="principalAmt"
            sx={{ gridColumn: "span 2" }}
            // error={!!touched.item && !!errors.item}
            // helperText={touched.item && errors.item}
            onChange={(e) => setPrincipalAmt(e.target.value)}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            autoCorrect="off"
            label="ROI"
            sx={{ gridColumn: "span 2" }}
            // onBlur={handleBlur}
            onChange={(e) => setRoi(e.target.value)}
            value={roi}
            name="roi"

          />
         
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Add Girvi
          </Button>
        </Box>

      </form>

      <Menu
        id="jewel-menu"
        anchorEl={anchorElItem}
        open={Boolean(anchorElItem)}
        onClose={() => setAnchorElItem(null)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "30ch",
          },
        }}
      >

        <MenuItem
          onClick={() => handleTypeSelection("Gold")}
        >
          Gold
        </MenuItem>

        <MenuItem
          onClick={() => handleTypeSelection("Silver")}
        >
          Silver
        </MenuItem>

      </Menu>

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
          //rows={girviEntries.map(entry => ({ ...entry, id: entry.id.toString() }))}
          rows={girviEntries.map((entry, index) => ({ ...entry, id: index }))}
          columns={columns}
          autoHeight
          disableColumnMenu
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>Principal Amount :</label>
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>{principalAmt}</label>

            <br />
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>ROI :</label>
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>{roi}</label>


            <br />
            {/* <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>Grand Total :</label>
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>{grandTotal}</label>
          </div>
        </Box>

        <Box display="flex" flexDirection="column" justifyContent="end" mt="20px">
          <div style={{marginLeft: "auto", textAlign: "right" , fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>
            Amount Paid :
            <input
              type="text"
              value={amtPaid}
              onChange={(e) => setAmtPaid(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px", fontSize: "16px", width: "100px" }}
            />
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>Remaining :</label>
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>{remainingAmt}</label> */}
            {/* <div style={{ marginLeft: "auto", textAlign: "right" ,fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>
            Remaining Amount:
            <input
              type="text"
              value={remainingAmt}
              onChange={(e) => setRemainingAmtt(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px", fontSize: "16px" }}
            />
          </div> */}
          </div>
        </Box>




        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Box>

      </Box>


    </Box>


  );
};

export default AddGirvi;
