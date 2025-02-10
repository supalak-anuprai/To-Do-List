import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addTask, deleteTask } from "../features/tasks/tasksSlice";
import { logout } from "../features/auth/authSlice";
import { Button, Form, Input, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const { Option } = Select;

const Dashboard: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values: {
    title: string;
    details?: string;
    category: string;
    dueDate?: string;
  }) => {
    const newTask = {
      id: uuidv4(),
      title: values.title,
      details: values.details,
      category: values.category,
      dueDate: values.dueDate,
    };
    dispatch(addTask(newTask));
    toast.success("เพิ่มงานสำเร็จ!");
    form.resetFields();
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
    toast.success("ลบงานแล้ว");
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("ออกจากระบบ เรียบร้อย");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div>
          <span className="mr-4">สวัสดี, {user?.email}</span>
          <Button type="primary" danger onClick={handleLogout}>
            ออกจากระบบ
          </Button>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">เพิ่มงานใหม่</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="ชื่อเรื่อง"
            rules={[{ required: true, message: "กรุณากรอกชื่อเรื่อง" }]}
          >
            <Input placeholder="ชื่อเรื่องงาน" />
          </Form.Item>
          <Form.Item name="details" label="รายละเอียด">
            <Input.TextArea placeholder="รายละเอียดเพิ่มเติม" />
          </Form.Item>
          <Form.Item
            name="category"
            label="หมวดหมู่"
            rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่" }]}
          >
            <Select placeholder="เลือกหมวดหมู่">
              <Option value="Work">งาน</Option>
              <Option value="Personal">ส่วนตัว</Option>
              <Option value="Urgent">ด่วน</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dueDate" label="วันครบกำหนด">
            <Input placeholder="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              เพิ่มงาน
            </Button>
          </Form.Item>
        </Form>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">รายการงาน</h2>
        {tasks.length === 0 ? (
          <p>ไม่มีงานในรายการ</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 bg-white rounded shadow">
                <h3 className="text-xl font-bold">{task.title}</h3>
                {task.details && <p>{task.details}</p>}
                <p>
                  <strong>หมวดหมู่:</strong> {task.category}
                </p>
                {task.dueDate && (
                  <p>
                    <strong>ครบกำหนด:</strong> {task.dueDate}
                  </p>
                )}
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(task.id)}
                >
                  ลบงาน
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
