import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { RootState } from "../store";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth);

  // Regex ตรวจสอบรหัสผ่าน:
  // ต้องมีตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่, ตัวเลข, อักขระพิเศษ (@, #, $, %) และความยาว 8-64 ตัวอักษร
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%]).{8,64}$/;

  const onFinish = (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน!");
      return;
    }
    if (!passwordRegex.test(values.password)) {
      toast.error(
        "รหัสผ่านต้องมีตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข, และอักขระพิเศษ (@, #, $, %) ความยาว 8-64 ตัวอักษร"
      );
      return;
    }
    // สำหรับโปรเจกต์นี้ สมมติว่าการสมัครสมาชิกสำเร็จ
    dispatch(register({ email: values.email, password: values.password }));

    if (user?.users?.find((user) => user.email === values.email)) {
      return toast.error("มีผู้ใช้นี้อยู่แล้ว");
    }

    toast.success("สมัครสมาชิกสำเร็จ!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">สมัครสมาชิก</h2>
        <Form name="register" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "กรุณากรอกอีเมล!" },
              { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง!" },
            ]}
          >
            <Input placeholder="อีเมล" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน!" }]}
          >
            <Input.Password placeholder="รหัสผ่าน" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: "กรุณายืนยันรหัสผ่าน!" }]}
          >
            <Input.Password placeholder="ยืนยันรหัสผ่าน" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              สมัครสมาชิก
            </Button>
          </Form.Item>
          <Form.Item>
            <p className="text-center">
              มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
