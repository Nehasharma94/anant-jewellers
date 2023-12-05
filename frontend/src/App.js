import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";

import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import AddStock from "./scenes/add-stock";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import AddItem from "./scenes/add-item";

import AddSale from "./scenes/add-sale";
import ItemAndCarat from "./scenes/add-item/itemcarat-list";
import StockList from "./scenes/add-stock/stockList";
import AddCustomerInfo from "./scenes/add-cust-info";
import CustomerList from "./scenes/add-cust-info/customerlist";
import AddBorrowedMoney from "./scenes/add-borrowed-money";
import BorrowedMoneyList from "./scenes/add-borrowed-money/borrowedMoneyList";
import SaleList from "./scenes/add-sale/sale-list";
import AddGirvi from "./scenes/add-girvi";
import GirviList from "./scenes/add-girvi/girvi-list";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/item-carat" element={<ItemAndCarat />} />

              <Route path="/borrowedMoneyList" element={<BorrowedMoneyList />} />
              <Route path="/customer-list" element={<CustomerList />} />
              <Route path="/stock-list" element={<StockList />} />
              <Route path="/sale-list" element={<SaleList />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/add-stock" element={<AddStock />} />
              <Route path="/add-borrowed-money" element={<AddBorrowedMoney />} />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/add-sale" element={<AddSale />} />
              <Route path="/add-girvi" element={<AddGirvi />} />
              <Route path="/girvi-list" element={<GirviList />} />
              <Route path="/add-cust-info" element={<AddCustomerInfo />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
