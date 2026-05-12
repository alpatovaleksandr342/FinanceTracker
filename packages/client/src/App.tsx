import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppSh } from "./components/AppShell";
import { Home } from "./pages/home";
import { Dashboard } from "./pages/Dashboard";
import { CategorieaPage } from "./pages/CategoriesPage/CategorieaPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AppSh>
              <Outlet />
            </AppSh>
          }
        >
          <Route path="/Home" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Categories" element={<CategorieaPage />} />
          <Route path="/Products" element={<ProductPage/>}/>
          <Route path="*" element={<h1>404 Not found</h1>} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <AppSh>
                <Outlet />
              </AppSh>
            }
          >
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
