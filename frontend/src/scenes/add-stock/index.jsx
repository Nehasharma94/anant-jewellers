import React, { useEffect, useState } from "react";
import {
  Paper, Box,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import '@mui/material/styles';


const AddStock = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");


  const ITEM_HEIGHT = 48;

  const [anchorElItem, setAnchorElItem] = useState(null);

  const openItemMenu = Boolean(anchorElItem);


  const [selectedItem, setSelectedItem] = useState(null); // Change to null
  const [itemMenuOpen, setItemMenuOpen] = useState(false);

  const [anchorElCarat, setAnchorElCarat] = useState(null);
  const [selectedCarat, setSelectedCarat] = useState("");
  const [addStockName, setAddStockName] = useState("");
  const [addStock, setAddStock] = useState("");


  const [item, setItem] = useState([]);
  const [carat, setCarat] = useState([]);
  const [weight, setWeight] = useState();
  const [caratList, setCaratList] = useState([]);

  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    fetchItemList();
    fetchCaratist();
  }, []);

  const fetchItemList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jewel/v1/getAllItems');
      setItemList(response.data);
      
    } catch (error) {
      console.error("Error while fetching list " + error)
    }
  }

  const fetchCaratist = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jewel/v1/getAllCarat');
      setCaratList(response.data);

    } catch (error) {
      console.error("Error while fetching list " + error)
    }
  }

  const handleFormSubmit = async (values) => {
  
    try {
      const response = await axios.post('http://localhost:8080/jewel/v1/addStock', {
        // stock_name: stockname, 
        item: item,
        carat: carat,
        weight: weight,
        stockName: addStockName
      });
      setAddStock(response.data);
      setAddStockName("");
      setWeight("");
      setSelectedItem("");
      setSelectedCarat("");

      console.log('Stock added:', response.data);
      
      
    } catch (error) {
      console.error("Error while adding stock: " + error);
    }

  };





  const handleClick = (event, field) => {
    if (field === "item") {
      setAnchorElItem(event.currentTarget);
    } else if (field === "carat") {
      setAnchorElCarat(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorElItem(null);
    setAnchorElCarat(null);
  };

  const handleMenuItemClick = (value, field) => {
    if (field === "item") {
      setSelectedItem(value);
      setAnchorElItem(null);
    } else if (field === "caratValue") {
      setSelectedCarat(value);
      setAnchorElCarat(null);
    } else if (field === "empty") { 
      setSelectedItem(null);  
      setSelectedCarat("");   
      setAnchorElItem(null);
      setAnchorElCarat(null);
    }
  };
  
  const handleCloseItemMenu = () => {
    setAnchorElItem(null);
  };


  const handleItemAdd = (e) => {
    setItem(selectedItem)
    setCarat(selectedCarat)

  };
  const handleCaratAdd = (e) => {

    setCarat(selectedCarat)

  };
  const handleWeightChange = (e) => {

    setWeight(e.target.value)


  };
  const handleStockNameChange = (e) => {

    setAddStockName(e.target.value)


  };

  return (
    <Box m="20px">
      <Header title="Add Stock" subtitle="Create a New Stock Entry" />

      <Formik
       
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
                fullWidth
                required
                variant="filled"
                type="text"
                onSelect={handleItemAdd}
                label="Select an item"
                onBlur={handleBlur}
                onChange={handleChange}
                value={selectedItem ? selectedItem.name : ""}
                onClick={(e) => handleClick(e, "item")}
                name="item"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.item && !!errors.item}
                helperText={touched.item && errors.item}
                autoComplete="off"
                InputProps={{
                  endAdornment: <span style={{ marginLeft: "auto" }}>▼</span>,
                  // style: { paddingRight: '0' }, // Remove the paddingRight for the icon button
                }}
              />

              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Select a Carat"
                onBlur={handleBlur}
                onChange={handleChange}
                onSelect={handleCaratAdd}
                value={selectedCarat ? selectedCarat.caratValue : ""}
                autoComplete="off"
                onClick={(e) => handleClick(e, "carat")}
                name="carat"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.carat && !!errors.carat}
                helperText={touched.carat && errors.carat}
                InputProps={{
                  endAdornment: <span style={{ marginLeft: "auto" }}>▼</span>,
                }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Stock Name"
                onBlur={handleBlur}
                onChange={handleStockNameChange}
                value={addStockName}
                name="stockname"
                error={!!touched.stockname && !!errors.stockname}
                helperText={touched.stockname && errors.stockname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Weight"
                onBlur={handleBlur}
                onChange={handleWeightChange}
                value={weight}
                name="weight"
                error={!!touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
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
        id="item-menu"
        anchorEl={anchorElItem}
        open={Boolean(anchorElItem)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "30ch",
          },
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick(null, "empty")}>Clear Selection</MenuItem>
        {itemList.map((item) => (
          <MenuItem
            key={item.id}
            selected={item === selectedItem}
            onClick={() => handleMenuItemClick(item, "item")}
          >
            {item.name}
          </MenuItem>
        ))}
        
      </Menu>
      
      <Menu
        id="carat-menu" 
        anchorEl={anchorElCarat}
        open={Boolean(anchorElCarat)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "30ch",
          },
        }}
      >
        {caratList.map((carat) => (
          <MenuItem
            key={carat.id}
            selected={carat === selectedCarat}
            onClick={() => handleMenuItemClick(carat, "caratValue")}
          >
            {carat.caratValue}
          </MenuItem>
        ))}
      </Menu>
  
    </Box>

    
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  item: yup.string(),

  carat: yup
    .string(),


  weight: yup.string(),

});

const initialValues = {
  item: "",
  stockname: "",

  carat: "",
  weight: "",

};

export default AddStock;
