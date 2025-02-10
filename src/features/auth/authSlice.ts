import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  users: User[]; // เก็บผู้ใช้ที่ลงทะเบียน
}

// const navigate = useNavigate();

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  users: [], // เริ่มต้นเป็นอาร์เรย์ว่าง
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action: PayloadAction<User>) {
      // ใช้งานจริงจะส่งไปเข้ารหัส
      const { email, password } = action.payload;
      const existingUser = state.users.find((user) => user.email === email);
      if (!existingUser) {
        state.users.push({ email, password }); // เก็บผู้ใช้ใหม่เข้าไปใน state
        state.isAuthenticated = true;
        state.user = { email, password };
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const { email, password } = action.payload;
      const existingUser = state.users.find(
        (user) => user.email === email && user.password === password
      );
      // ใช้งานจริงจะส่งไปเข้ารหัสตรวจสอบ
      if (existingUser) {
        state.isAuthenticated = true;
        state.user = existingUser;
        toast.success("เข้าสู่ระบบสำเร็จ!");
      } else {
        toast.error("Email หรือ Password ไม่ถูกต้อง");
        state.isAuthenticated = false;
        state.user = null;
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
