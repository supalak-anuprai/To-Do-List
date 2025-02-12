import { Navigate, Route, Routes } from "react-router-dom";
import NavbarHeader from "./components/NavBar/navbarHeader";
import { Layout, theme } from "antd";
import FooterApp from "./components/Footer/footerApp";
import { Content } from "antd/es/layout/layout";
import ManageTasks from "./pages/ManageTasks";
import Hero from "./pages/Hero";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store";

//-----------------------------------------------------------------

//-----------------------------------------------------------------

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Layout>
      <NavbarHeader isAuthenticated={isAuthenticated} />
      <Content>
        <div
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Hero />} />

            <Route
              path="/ManageTasks"
              element={
                isAuthenticated ? <ManageTasks /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/Register"
              element={
                !isAuthenticated ? <Register /> : <Navigate to="/ManageTasks" />
              }
            />

            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/ManageTasks" />
              }
            />
          </Routes>
        </div>
      </Content>
      <FooterApp />
    </Layout>
  );
}

export default App;
