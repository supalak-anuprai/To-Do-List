import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import dayjs, { Dayjs } from "dayjs";
import { Button, DatePicker, Form, Input, Select, Modal } from "antd";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { addTask, updateTask } from "../../features/tasks/tasksSlice";
import { Option } from "antd/es/mentions";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  task?: any; // เพิ่ม task ที่จะแก้ไข
};

export default function DialogAddWork({ open, onClose, task }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user); // ดึง email ผู้ใช้จาก Redux
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        details: task.details,
        category: task.category,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
      });
    }
  }, [task, form]);

  const onFinish = (values: {
    title: string;
    details?: string;
    category: string;
    dueDate?: Dayjs | null;
  }) => {
    if (!user?.email) {
      toast.error("กรุณาเข้าสู่ระบบก่อนเพิ่มงาน!");
      return;
    }

    if (task) {
      // แก้ไขงาน
      const updatedTask = {
        ...task,
        title: values.title,
        details: values.details,
        category: values.category,
        dueDate: values.dueDate?.format("YYYY-MM-DD"),
      };
      dispatch(updateTask(updatedTask));
      toast.success("แก้ไขงานสำเร็จ!");
    } else {
      // เพิ่มงานใหม่
      const newTask = {
        id: uuidv4(),
        userEmail: user.email,
        title: values.title,
        details: values.details,
        category: values.category,
        dueDate: values.dueDate?.format("YYYY-MM-DD"),
      };
      dispatch(addTask(newTask));
      toast.success("เพิ่มงานสำเร็จ!");
    }

    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={task ? "แก้ไขงาน" : "เพิ่มงานใหม่"}
      visible={open}
      onCancel={onClose}
      footer={null}
      width={{
        xs: "90%",
        sm: "60%",
        md: "60%",
        lg: "60%",
        xl: "60%",
        xxl: "40%",
      }}
      className=" rounded-lg shadow-lg"
    >
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
            <Option value="general">General Work</Option>
            <Option value="personal">Personal Work</Option>
            <Option value="urgent">Urgent Work</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="วันครบกำหนด"
          rules={[{ required: true, message: "กรุณาเลือกวันครบกำหนด" }]}
        >
          <DatePicker className="w-full" minDate={dayjs()} disabled={task} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {task ? "อัพเดตงาน" : "เพิ่มงาน"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
