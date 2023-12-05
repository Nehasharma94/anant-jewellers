import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};


const SubItem = ({ title, to, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};


const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [isItemEntryOpen, setIsItemEntryOpen] = useState(false);
  const [isBorrowedMoneyOpen, setIsBorrowedMoneyOpen] = useState(false);
  const [isStockEntryOpen, setIsStockEntryOpen] = useState(false);
  const [isCustomerInfoOpen, setIsCustomerInfoOpen] = useState(false);
  const [isSaleEntryOpen, setIsSaleEntryOpen] = useState(false);
  const [isGirviEntryOpen, setIsGirviEntryOpen] = useState(false);

  const toggleItemEntry = () => {
    setIsItemEntryOpen(!isItemEntryOpen);
    setIsStockEntryOpen(false); // Close Stock Entry sub-menu
    setIsBorrowedMoneyOpen(false);
    setIsSaleEntryOpen(false);
    setIsGirviEntryOpen(false);
  };

  const toggleStockEntry = () => {
    setIsStockEntryOpen(!isStockEntryOpen);
    setIsItemEntryOpen(false); // Close Item Entry sub-menu
    setIsBorrowedMoneyOpen(false);
    setIsSaleEntryOpen(false);
    setIsGirviEntryOpen(false);

  };
  const toggleBorrowedMoney = () => {
    setIsBorrowedMoneyOpen(!isBorrowedMoneyOpen);
    setIsItemEntryOpen(false); // Close Item Entry sub-menu
    setIsStockEntryOpen(false);
    setIsSaleEntryOpen(false);
    setIsGirviEntryOpen(false);
  };

  const toggleCustomerInfo = () => {
    setIsCustomerInfoOpen(!isCustomerInfoOpen);
    setIsItemEntryOpen(false); // Close Item Entry sub-menu
    setIsStockEntryOpen(false);
    setIsBorrowedMoneyOpen(false);
    setIsSaleEntryOpen(false);
    setIsGirviEntryOpen(false);
  };

  const toggleSaleEntry = () => {
    setIsSaleEntryOpen(!isSaleEntryOpen);
    setIsItemEntryOpen(false); // Close Item Entry sub-menu
    setIsStockEntryOpen(false);
    setIsBorrowedMoneyOpen(false);
    setIsGirviEntryOpen(false);

  };

  const toggleGirviEntry = () => {
    setIsGirviEntryOpen(!isGirviEntryOpen);
    setIsItemEntryOpen(false); // Close Item Entry sub-menu
    setIsStockEntryOpen(false);
    setIsBorrowedMoneyOpen(false);
    setIsSaleEntryOpen(false);

  };
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>

            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>

            <Menu iconShape="square">
              {/* ... Existing menu items ... */}

              {/* Main "Item Entry" item with nested sub-menu */}
              {/* <MenuItem
                style={{
                  color: colors.grey[100],
                }}
                icon={<PersonOutlinedIcon />}
                onClick={toggleItemEntry}
              >
                <Typography>Item-Carat Entry</Typography>
              </MenuItem>

              {isItemEntryOpen && (

                <Box paddingLeft="50px">
                  <SubItem
                    title="Add Item-Carat"
                    to="/add-item"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <SubItem
                    title="Item-Carat List"
                    to="/item-carat"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              )} */}

              <MenuItem
                style={{
                  color: colors.grey[100],
                }}
                icon={<ContactsOutlinedIcon />}
                onClick={toggleCustomerInfo}
              >
                <Typography>Customer Info Entry</Typography>
              </MenuItem>

              {isCustomerInfoOpen && (

                <Box paddingLeft="50px">
                  <SubItem
                    title="Add Customer Info"
                    to="/add-cust-info"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <SubItem
                    title="Customer List"
                    to="/customer-list"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              )}

              <MenuItem
                style={{
                  color: colors.grey[100],
                }}
                icon={<PersonOutlinedIcon />}
                onClick={toggleStockEntry}
              >
                <Typography>Stock Entry</Typography>
              </MenuItem>

              {isStockEntryOpen && (

                <Box paddingLeft="50px">
                  <SubItem
                    title="Add Stock"
                    to="/add-stock"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <SubItem
                    title="Stock List"
                    to="/stock-list"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              )}

              <MenuItem
                style={{
                  color: colors.grey[100],
                }}
                icon={<PersonOutlinedIcon />}
                onClick={toggleBorrowedMoney}
              >
                <Typography>Add Udhari</Typography>
              </MenuItem>

              {isBorrowedMoneyOpen && (

                <Box paddingLeft="50px">
                  <SubItem
                    title="Add Borrowed Money"
                    to="/add-borrowed-money"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <SubItem
                    title="Borrowed Money List"
                    to="/borrowedMoneyList"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              )}

              <MenuItem
                style={{
                  color: colors.grey[100],
                }}
                icon={<ReceiptOutlinedIcon />}
                onClick={toggleSaleEntry}
              >
                <Typography>Add Sale</Typography>
              </MenuItem>

              {isSaleEntryOpen && (

                <Box paddingLeft="50px">
                  <SubItem
                    title="Add Sale Entry"
                    to="/add-sale"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <SubItem
                    title="Sale List"
                    to="/sale-list"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              )}

              <MenuItem
                style={{
                  color: colors.grey[100],
                }}
                icon={<ReceiptOutlinedIcon />}
                onClick={toggleGirviEntry}
              >
                <Typography>Add Girvi</Typography>
              </MenuItem>

              {isGirviEntryOpen && (

                <Box paddingLeft="50px">
                  <SubItem
                    title="Add Girvi Entry"
                    to="/add-girvi"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <SubItem
                    title="Girvi List"
                    to="/girvi-list"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              )}



            </Menu>


            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
