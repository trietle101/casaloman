import "./App.scss";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Shop from "./components/Shop";
import Details from "./components/Details";
import ProductList from "./components/ProductList";
import ProductUpdate from "./components/ProductUpdate";
import CategoryList from "./components/CategoryList";
import CategoryUpdate from "./components/CategoryUpdate";
import Account from "./components/Account";
import { ProtectedRouter } from "./features/protected/ProtectedRouter";
import ChangePassword from "./components/ChangePassword";

function App() {
  const [isOpened, setIsOpened] = useState(false);
  function handleOpen() {
    setIsOpened(!isOpened);
    console.log(isOpened);
  }
  return (
    <>
      <BrowserRouter basename="/">
        <div className="container">
          <nav>
            <Nav setOpenedNav={handleOpen} />
          </nav>
          <main>
            <article>
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/products/*" exact element={<Shop />} />
                <Route
                  path="/products/details/:id_prod"
                  exact
                  element={<Details />}
                />
                <Route element={<ProtectedRouter />}>
                  <Route
                    path="/admin/productlist"
                    exact
                    element={<ProductList />}
                  />
                  <Route
                    path="/admin/productupdate/:id_update"
                    exact
                    element={<ProductUpdate />}
                  />
                  <Route
                    path="/admin/categorylist"
                    exact
                    element={<CategoryList />}
                  />
                  <Route
                    path="/admin/categoryupdate/:id_update"
                    exact
                    element={<CategoryUpdate />}
                  />
                  <Route
                    path="/changepassword/:id_change"
                    exact
                    element={<ChangePassword />}
                  />
                </Route>
                <Route path="/account" exact element={<Account />} />
              </Routes>
            </article>
            <aside></aside>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
        <Sidebar isOpenedSide={isOpened} setOpenedSide={handleOpen} />
      </BrowserRouter>
    </>
  );
}

export default App;
