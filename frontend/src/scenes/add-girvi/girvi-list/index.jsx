import { Box, Button, DialogContent, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState } from "react";
import { differenceInMonths, set } from "date-fns";
import axios from "axios";
import { da } from "date-fns/locale";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";


const GirviList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [girviList, setGirviList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [amtPaid, setAmtPaid] = useState();
  const [principalAmtPaid, setPrincipalAmtPaid] = useState();
  const [principalAmt, setPrincipalAmt] = useState();
  const [remainingAmt, setRemainingAmt] = useState("");
  const [newTotalAmt, setNewTotalAmt] = useState("");
  const [numberOfMonths, setNumberOfMonths] = useState();



  const handleInputChange = (event) => {
    setAmtPaid(event.target.value);

  };


  const handleSubmit = async () => {
    try {

     
      let newRemainingAmt = 0;
      let newAmtPaid = 0;
      const amtPaidInt = parseInt(amtPaid);
      // let principalAmt = selectedRow.principalAmt;
     console.log("==========" + selectedRow.principalAmt)
      if (selectedPaymentType === "amount_payment") {
        
        setPrincipalAmtPaid(amtPaid)
        
       const principal =  selectedRow.principalAmt - principalAmtPaid;
       setPrincipalAmt(principal)
      const  totalAmt = principalAmt + (principalAmt * (selectedRow.roi) / 100 * numberOfMonths);
      setNewTotalAmt(totalAmt)
        newAmtPaid = selectedRow.principalAmtPaid + principalAmtPaid;
        newRemainingAmt  = newTotalAmt - newAmtPaid;
      console.log("principalAmt inside if "  + principalAmt)
      console.log("newTotalAmt if inside " + newTotalAmt)
      console.log("newAmtPaid if inside " + newAmtPaid)
      console.log("newRemainingAmt if inside " + newRemainingAmt)
      console.log("principalAmtPaid if inside " + principalAmtPaid)
      console.log("amtPaid if inside " + amtPaid)


      }else{


       newAmtPaid = selectedRow.amtPaid + amtPaidInt;
      console.log("newAmtPaid --  " + newAmtPaid)
       newTotalAmt = principalAmt + (principalAmt * (selectedRow.roi) / 100 * numberOfMonths);
      console.log("newTotalAmt --  " + newTotalAmt)
       newRemainingAmt = newTotalAmt - newAmtPaid;

      console.log("principalAmt --  " + principalAmt)
    
      setRemainingAmt(newRemainingAmt);
      }
      console.log("newRemainingAmt --  " + newRemainingAmt)
      const newSelectedRow = {
        ...selectedRow,
        amtPaid: newAmtPaid,
        remainingAmt: newRemainingAmt,
        principalAmt: principalAmt,
        totalAmt: newTotalAmt,
        principalAmtPaid: principalAmtPaid

      };

      

      console.log("newSelectedRow " + JSON.stringify(newSelectedRow));
      const response = await axios.post(
        'http://localhost:8080/jewel/v1/addGirviAmt',
        {
          girviEntry: { ...newSelectedRow, amtPaid: newAmtPaid, principalAmt: principalAmt }
        },
        {
          params: {
            paymentType: selectedPaymentType,
          },
        }
      );



      const data = response.data;
      const updatedGirviList = girviList.map((item) => {
        if (item.id === data.id) {
          return data;
        }
        return item;
      });

      setGirviList(updatedGirviList);
      setRemainingAmt(newRemainingAmt);
      setAmtPaid("");

     // window.location.reload();
    } catch (error) {
      console.error("Error while Adding amt  " + error);
    }
  };
  const calculateTotalAmt = (principalAmt, roiMonthly, numberOfMonths) => {

    const totalAmt = principalAmt + (principalAmt * (roiMonthly) / 100 * numberOfMonths);

    return totalAmt;
  };

  const fetchGirviList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jewel/v1/getAllGirvi');
      const currentDate = new Date();

      const updatedGirviList = response.data.map((item, index) => {
        const entryDate = new Date(item.date);
        const numberOfMonths = differenceInMonths(currentDate, entryDate);
        setNumberOfMonths(numberOfMonths)
        const totalAmt = calculateTotalAmt(item.principalAmt, item.roi, numberOfMonths);
        const remainingAmts = item.remainingAmt == null ? totalAmt : item.remainingAmt;
       const principalAmtPaid1 = item.principalAmtPaid == null ? 0 : item.principalAmtPaid
        console.log("remaining+++++" + item.remainingAmt)
        console.log("total" + totalAmt)

        return {
          ...item,

          serialNumber: index + 1,
          totalAmt: totalAmt,
          numberOfMonths: numberOfMonths,
          remainingAmt: remainingAmts,
          principalAmtPaid: principalAmtPaid1

        };
      });


      setGirviList(updatedGirviList);


    } catch (error) {
      console.error("Error while fetching list " + error)
    }
  }


  useEffect(() => {
    fetchGirviList();

  }, [])



  const girviLists = girviList.map((item, index) => ({
    ...item,
    serialNumber: index + 1,
  }));
  const handleOpenMenu = (event, row) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuItemClick = (paymentType) => {
    const formattedPaymentType = paymentType.toLowerCase().replace(/\s+/g, '_');
    setSelectedPaymentType(formattedPaymentType);
    setAnchorEl(null);
  };

  const columns = [
    { field: 'serialNumber', headerName: 'Sr No', flex: 1 },
    {
      field: "customerInfo.name", valueGetter: params => params.row.customerInfo.name,
      headerName: "Customer Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "customerInfo.fatherName", valueGetter: params => params.row.customerInfo.fatherName,
      headerName: "Father's Name",
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
      field: "goldOrSilver",
      headerName: "Type",
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
      field: "totalAmt",
      headerName: "Total Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "remainingAmt",
      headerName: "Remaining Amount",
      flex: 1,
      renderCell: (params) => {
        const remainingAmt = params.row.remainingAmt !== "" ? params.row.remainingAmt : params.row.totalAmt;
        return <span>{remainingAmt}</span>;
      },
      cellClassName: "name-column--cell",
    },



    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "amtPaid",
      headerName: "Total Amount Paid",
      flex: 1,
      cellClassName: "name-column--cell",
    },



    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button
            onClick={(event) => handleOpenMenu(event, params.row)}
            variant="contained"
            color="primary"
            endIcon={<ArrowDropDownIcon />}
          >
            Payment Type
          </Button>
        </div>
      ),
    },



    {
      field: 'text-field',
      headerName: 'Enter Amount Paid',
      flex: 1,
      renderCell: (params) => (

        selectedRow && selectedRow.id === params.row.id ? (
          <TextField

            value={amtPaid}
            onChange={handleInputChange}
            fullWidth
          />
        ) : null
      ),
    },


    {
      field: 'principalAmtPaid',
      headerName: 'Principal Amt Paid',
      flex: 1,
      renderCell: (params) => (

        selectedRow && selectedRow.id === params.row.id ? (
          <TextField

            value={principalAmtPaid}
            onChange={handleInputChange}
            fullWidth
          />
        ) : null
      ),
    },




    {
      field: 'submit',
      headerName: 'Submit',
      flex: 1,
      renderCell: (params) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      ),
    },





  ];

  return (
    <Box m="20px">
      <Header title="Girvi Lists" subtitle="List of Girvi" />
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
            rows={girviLists}
            columns={columns}

          />
          {selectedRow && (
            <Menu
              id={`dropdown-menu-${selectedRow.id}`}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleMenuItemClick("Full Closure")}>
                Full Closure
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("Partial Payment")}>
                Partial Payment
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("Amount Payment")}>
                Amount Payment
              </MenuItem>
            </Menu>
          )}
          <div>



          </div>
        </Box>

      </Box>
    </Box>
  );
};

export default GirviList;
