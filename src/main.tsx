import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store, { persistor } from "./store";
import "antd/dist/reset.css"; // กำหนดสไตล์พื้นฐานของ Ant Design (ขึ้นอยู่กับเวอร์ชัน)
import "./index.css";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

if (!CLIENT_ID) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> */}
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
    {/* </ClerkProvider> */}
  </StrictMode>
);
