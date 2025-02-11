import { /* Navigate, */ Route, Routes } from "react-router-dom";
import NavbarHeader from "./components/NavBar/navbarHeader";
import { Layout, theme } from "antd";
import FooterApp from "./components/Footer/footerApp";
import { Content } from "antd/es/layout/layout";
import { useUser } from "@clerk/clerk-react";
import ManageTasks from "./pages/ManageTasks";
import Hero from "./pages/Hero";
import View403 from "./components/Status/View403";
import LoadingApp from "./components/Loading/LodingApp";

//-----------------------------------------------------------------

//-----------------------------------------------------------------

function App() {
  const { user, isSignedIn, isLoaded } = useUser();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (!isLoaded) {
    return <LoadingApp />;
  }

  return (
    <Layout>
      <NavbarHeader user={user} />
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
              element={isSignedIn ? <ManageTasks /> : <View403 />}
            />
          </Routes>
        </div>
      </Content>
      <FooterApp />
    </Layout>
  );
}

export default App;
