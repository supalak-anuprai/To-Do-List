import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import 'antd/dist/reset.css'; // กำหนดสไตล์พื้นฐานของ Ant Design (ขึ้นอยู่กับเวอร์ชัน)
import './index.css';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
