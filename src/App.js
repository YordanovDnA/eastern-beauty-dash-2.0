//React
import React from "react";

//Toastify container and CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//React router dom
import { Routes, Route, BrowserRouter } from "react-router-dom";


import ProtectedRoute from "./components/protectedRoute";
import UsersTable from "./components/usersTable";
import NewUserForm from "./components/newUserForm";

import Categories from "./pages/categories";
import CategoryForm from './pages/categories/components/forms/categoryForm';
import Subcategory from './pages/categories/subcategory';
import Product from './pages/categories/product';
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Page404 from "./pages/page404";
import Logout from "./pages/logout";
import Products from "./pages/products";
import MyProfile from "./pages/myProfile";
import SubcategoryForm from './pages/categories/components/forms/subcategoryForm';
import NewHealthyAlternatives from './pages/categories/components/forms/newHealthyAlternatives';
import NewHandmadeCosmetics from './pages/categories/components/forms/newHandmadeCosmeticsForm';
import NewOilForm from './pages/categories/components/forms/newOilForm';
import NewHerbForm from './pages/categories/components/forms/newHerbForm';
import NewBlockbustersForm from './pages/categories/components/forms/newBlockbusterForm';
import AllUsers from "./pages/users/allUsers";



function App() {


  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>

          <Route path="/profile/:_id" element={<ProtectedRoute><MyProfile/></ProtectedRoute>}/>
          
          <Route path="/user" element={<ProtectedRoute><NewUserForm/></ProtectedRoute>}>
            <Route path=":_id" element={<ProtectedRoute><NewUserForm/></ProtectedRoute>}/>
          
          </Route>
          
          <Route path="/users" element={<ProtectedRoute><AllUsers/></ProtectedRoute>}/>
          
          <Route path="/categories">
            <Route path=":lang" element={<ProtectedRoute><Categories/></ProtectedRoute>}/>
            <Route path="sub/product/:_id" element={<ProtectedRoute><Product/></ProtectedRoute>}/>
            <Route path="sub/:lang/:_id" element={<ProtectedRoute><Subcategory/></ProtectedRoute>}/>
            <Route path="sub/new/:lang/:_id" element={<ProtectedRoute><SubcategoryForm/></ProtectedRoute>}/>
            <Route path="sub/edit/:_id" element={<ProtectedRoute><SubcategoryForm/></ProtectedRoute>}/>
            <Route path="new/:lang/:level" element={<ProtectedRoute><CategoryForm/></ProtectedRoute>}/>
            <Route path="edit/:_id" element={<ProtectedRoute><CategoryForm/></ProtectedRoute>}/>
          </Route>

          <Route path="/products">
            <Route path="new-healty-alternative/:cat:lang" element={<ProtectedRoute><NewHealthyAlternatives/></ProtectedRoute>}>
              <Route path=":id" element={<ProtectedRoute><NewHealthyAlternatives/></ProtectedRoute>} />
            </Route>

            <Route path="new-handmade-cosmetic/:cat/:lang" element={<ProtectedRoute><NewHandmadeCosmetics/></ProtectedRoute>}>
              <Route path=":id" element={<ProtectedRoute><NewHandmadeCosmetics/></ProtectedRoute>} />
            </Route>

            <Route path="new-oil/:cat/:lang" element={<ProtectedRoute><NewOilForm/></ProtectedRoute>}>
              <Route path=":id" element={<ProtectedRoute><NewOilForm/></ProtectedRoute>} />
            </Route>

            <Route path="new-herb/:cat/:lang" element={<ProtectedRoute><NewHerbForm/></ProtectedRoute>}>
              <Route path=":id" element={<ProtectedRoute><NewHerbForm/></ProtectedRoute>} />
            </Route>

            <Route path="new-blockbuster/:cat/:lang" element={<ProtectedRoute><NewBlockbustersForm/></ProtectedRoute>}>
              <Route path=":id" element={<ProtectedRoute><NewBlockbustersForm/></ProtectedRoute>} />
            </Route>
          </Route>
          
          <Route path="/all-products" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" exact element={<Login/>}/>
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </BrowserRouter>

        <ToastContainer />
    
    </React.Fragment>
  );
}

export default App;
