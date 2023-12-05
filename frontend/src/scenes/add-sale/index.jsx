import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  colors,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "@mui/material/styles";
import StockList from "../add-stock/stockList";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { format } from "date-fns";

const AddSale = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const ITEM_HEIGHT = 48;

  const [anchorElItem, setAnchorElItem] = useState(null);
  const [anchorElCarat, setAnchorElCarat] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [addStock, setAddStock] = useState("");
  //  const [totalAmt, setTotalAmt] = useState("");
  // const [remainingAmt, setRemainingAmtt] = useState("");
  const [amtPaid, setAmtPaid] = useState("");
  const [amount, setAmount] = useState("");
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [saleEntries, setSaleEntries] = useState([]);
  const [saleId, setSaleId] = useState("");


  useEffect(() => {
    fetchItemList();
    fetchCustomerList();
  }, []);


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
      field: "stockName",
      headerName: "Stock",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    // {
    //   field: "totalAmt",
    //   headerName: "Total Amount ",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    },



    {
      field: "weight",
      headerName: "Weight",
      flex: 1,
      cellClassName: "name-column--cell",
    },


  ];

  const generateReceipt = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/jewel/v1/generate-receipt',
        
        {
          params: {
            saleId: saleId,
          },
          responseType: 'blob',
        }
      );
      console.log("RESPONSE" + JSON.stringify(response))
      const blob = new Blob([response.data],{type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'receipt.pdf';

      a.click();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error while fetching customer list: " + error);
    }
  }
  const getCurrentDate = () => {
    const currentDate = new Date();
    return format(currentDate, "yyyy-MM-dd");
  }

  const date = getCurrentDate();

  const addSaleEntryToList = (newEntry) => {
    setSaleEntries((prevEntries) => [...prevEntries, newEntry]);

    // setSelectedItem(null);
    // setSelectedStock(null);
    // setTotalAmt("");
    // setRemainingAmtt("");
    // setAmtPaid("");
    // setSelectedCustomer("");
  }


  const fetchCustomerList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jewel/v1/getAllCustomer');
      setCustomerList(response.data);
    } catch (error) {
      console.error("Error while fetching customer list: " + error);
    }
  };



  const fetchItemList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/jewel/v1/getAllItems"
      );
      setItemList(response.data);
    } catch (error) {
      console.error("Error while fetching list " + error);
    }
  };


  const fetchStockList = async (itemId) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/jewel/v1/stockByItem",
        {
          params: {
            itemId: itemId,
          },
        }
      );

      setStockList(response.data);

    } catch (error) {
      console.error("Error while fetching stock list: ", error);
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
    setSelectedCustomerId(customer.id);
    handleClose();
  };


  const handleFormSubmit = async (e) => {
    
    e.preventDefault();
   
    if (saleEntries.length == 0) {
      console.log("No Sale Entries Added"); // C
      return;
    }
   


    try {
      const stockSaleEntries = saleEntries.map((entry) => ({
        stockName: entry.stockName,
        itemName: entry.itemName,
        caratValue: entry.caratValue,
        weight: entry.weight,
        amount: entry.amount,
        stockId: entry.stockId
      }));
      const requestData = {
        stockSale: stockSaleEntries,
        totalAmt: totalAmt,
        remainingAmt: remainingAmt,
        cgstAmt: cgstAmt,
        sgstAmt: sgstAmt,
        grandTotal: grandTotal,
        amtPaid: amtPaid,
        customerInfo: selectedCustomerId,
        cgst: cgst,
        sgst: sgst,
        date: date


      };

      const response = await axios.post(
        "http://localhost:8080/jewel/v1/addSaleEntry",
        requestData

      );
    
       const saleId = response.data.saleId;
       console.log("-------  " + saleId)
      setSaleId(saleId);
      setAddStock(response.data);
      setSelectedStock(null);
      setSelectedItem(null);
      // setCustomerList(null);
      //setTotalAmt(null);
      //setRemainingAmtt(null);
      setAmtPaid(null);

    } catch (error) {
      console.error("Error while adding stock: " + error);
    }
  };


  const handleItemSelection = (item) => {
    setSelectedItem(item);
    fetchStockList(item.id);
    setSelectedStock(null); //
    setAnchorElItem(null);
  };


  const handleStockSelection = (stock) => {
    setSelectedStock(stock);
    setAnchorElCarat(null);
  };



  const handleAddSaleEntry = (e) => {
    e.preventDefault();
    if (!selectedStock) {
      return;
    }

    const newEntry = {
      customerName: selectedCustomer.name,
      fatherName: selectedCustomer.fatherName,
      itemName: selectedItem.name,
      stockName: selectedStock.stockName,
      caratValue: selectedStock.carat.caratValue,
      weight: selectedStock.weight,
      // remainingAmt: remainingAmt,
      // amtPaid: amtPaid,
      customerInfo: selectedCustomerId,
      stockId: selectedStock.id,
      amount: amount,
    };

    addSaleEntryToList(newEntry);
  }


  const totalAmt = saleEntries.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);

  const cgstAmt = (totalAmt * parseFloat(cgst)) / 100 || 0;
  
  const sgstAmt = (totalAmt * parseFloat(sgst)) / 100 || 0;
  
  const grandTotal = totalAmt + cgstAmt + sgstAmt;

  const remainingAmt = grandTotal - amtPaid

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="end" mt="20px">
        <Button color="secondary" variant="contained" onClick={generateReceipt}>
          Download Receipt
        </Button>
      </Box>
      <Header title="Add Sale " subtitle="Create a New Sale Entry" />


      <form onSubmit={handleAddSaleEntry}>
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
            label="Select an item"
            value={selectedItem ? selectedItem.name : ""}
            autoCorrect="off"
            onClick={(e) => setAnchorElItem(e.currentTarget)}
            InputProps={{
              endAdornment: <span style={{ marginLeft: "auto" }}>▼</span>,
            }}
            sx={{ gridColumn: "span 2" }}
          />
          {/* Carat Selection */}
          <TextField
            fullWidth
            required
            variant="filled"
            type="text"
            label="Select a Stock"
            autoCorrect="off"
            value={
              selectedStock
                ? `${selectedStock.stockName} - Carat: ${selectedStock.carat.caratValue}, Weight: ${selectedStock.weight || "N/A"
                }`
                : ""
            }
            onClick={(e) => setAnchorElCarat(e.currentTarget)}
            InputProps={{
              endAdornment: <span style={{ marginLeft: "auto" }}>▼</span>,
            }}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Amount"
            autoCorrect="off"
            // onBlur={handleBlur}
            onChange={(e) => setAmount(e.target.value)}
            //value={values.carat}
            name="amount"
            sx={{ gridColumn: "span 2" }}
          // error={!!touched.carat && !!errors.carat}
          // helperText={touched.carat && errors.carat}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="CGST"
            sx={{ gridColumn: "span 1" }}
            onChange={(e) => setCgst(e.target.value)}
            name="cgst"

          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="SGST"
            sx={{ gridColumn: "span 1" }}
            onChange={(e) => setSgst(e.target.value)}
            name="sgst"
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Add Sale Entry
          </Button>
        </Box>
      </form>
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
          //rows={saleEntries.map(entry => ({ ...entry, id: entry.id.toString() }))}
          rows={saleEntries.map((entry, index) => ({ ...entry, id: index }))}
          columns={columns}
          autoHeight
          disableColumnMenu
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>Total Amount :</label>
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>{totalAmt}</label>

            <br />
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>CGST :</label>
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>{cgstAmt}</label>
            <br />
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>SGST :</label>
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>{sgstAmt}</label>
            <br />
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>Grand Total :</label>
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>{grandTotal}</label>
          </div>
        </Box>

        <Box display="flex" flexDirection="column" justifyContent="end" mt="20px">
          <div style={{ marginLeft: "auto", textAlign: "right", fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>
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
            <label style={{ marginRight: "50px", fontWeight: "bold", fontSize: "16px" }}>{remainingAmt}</label>
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



      <Menu
        id="item-menu"
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
        {itemList.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleItemSelection(item)}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        id="Stock-menu"
        anchorEl={anchorElCarat}
        open={Boolean(anchorElCarat)}
        onClose={() => setAnchorElCarat(null)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "30ch",
          },
        }}
      >
        {stockList.map((stock) => (
          <MenuItem
            key={stock.id}
            onClick={() => handleStockSelection(stock)}
          >
            {`Stock Name: ${stock.stockName}`}
            <br />
            {`Carat Value: ${stock.carat.caratValue}`}
            <br />
            {`Weight: ${stock.weight || "N/A"}`}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AddSale;
