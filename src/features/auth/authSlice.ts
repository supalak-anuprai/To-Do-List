import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface User {
  email: string;
  password?: string;
  picture?: string;
  provider: "web" | "google";
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action: PayloadAction<User>) {
      const { email, password } = action.payload;
      const existingUser = state.users.find((user) => user.email === email);
      if (!existingUser) {
        state.users.push({ email, password, provider: "web" });
        state.isAuthenticated = true;
        state.user = { email, password, provider: "web" };
        toast.success("สมัครสมาชิกสำเร็จ!");
      } else {
        toast.error("อีเมลนี้มีการลงทะเบียนแล้ว");
        state.isAuthenticated = false;
        state.user = null;
      }
    },

    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const { email, password } = action.payload;
      const existingUser = state.users.find(
        (user) =>
          user.email === email &&
          user.password === password &&
          user.provider === "web"
      );
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

    loginWithGoogle(
      state,
      action: PayloadAction<{ email: string; picture: string }>
    ) {
      const { email, picture } = action.payload;

      if (!email) {
        state.isAuthenticated = false;
        state.user = null;
        toast.error("ไม่พบข้อมูลการเข้าสู่ระบบด้วย Google");
        return; // ไม่ต้องคืนค่าใดๆ
      }

      const existingUser = state.users.find(
        (user) => user.email === email && user.provider === "google"
      );

      if (existingUser) {
        state.isAuthenticated = true;
        state.user = existingUser;
        toast.success("เข้าสู่ระบบด้วย Google สำเร็จ!");
      } else {
        // หากผู้ใช้ใหม่
        state.isAuthenticated = true;
        state.user = {
          email,
          picture,
          provider: "google",
        };
        state.users.push(state.user); // เพิ่มผู้ใช้ใหม่ลงใน users array
        toast.success("เข้าสู่ระบบด้วย Google สำเร็จ!");
      }
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      toast.success("ออกจากระบบเรียบร้อย!");
    },
  },
});

export const { register, login, loginWithGoogle, logout } = authSlice.actions;
export default authSlice.reducer;
