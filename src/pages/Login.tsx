import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, loginWithGoogle } from "../features/auth/authSlice";
import { Button, Form, Input } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface GoogleUser {
  email: string;
  picture: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const onFinish = (values: { email: string; password: string }) => {
    // สำหรับโปรเจกต์นี้ สมมติว่าการเข้าสู่ระบบสำเร็จเมื่อมีข้อมูล
    dispatch(login({ email: values.email, password: values.password }));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          เข้าสู่ระบบ
        </h2>

        <Form name="login" onFinish={onFinish} className="space-y-6">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "กรุณากรอกอีเมล!" },
              { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง!" },
            ]}
          >
            <Input
              placeholder="อีเมล"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน!" }]}
          >
            <Input.Password
              placeholder="รหัสผ่าน"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </Form.Item>

          <GoogleLogin
            onSuccess={(credentialResponse: any) => {
              const user = jwtDecode<GoogleUser>(credentialResponse.credential);
              dispatch(
                loginWithGoogle({ email: user?.email, picture: user?.picture })
              );
            }}
            onError={(e: void) => {
              console.log("🚀 ~ e:", e);
            }}
            auto_select={true}
          />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md"
            >
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
          <Form.Item>
            <p className="text-center text-gray-600">
              ยังไม่มีบัญชี?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                สมัครสมาชิก
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
