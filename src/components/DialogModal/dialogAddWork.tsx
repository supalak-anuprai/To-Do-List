import { useDispatch } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { Button, DatePicker, Form, Input, Select, Modal } from "antd";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { addTask } from "../../features/tasks/tasksSlice";
import { Option } from "antd/es/mentions";

type Props = {
  open: boolean;
  onClose: () => void;
};
export default function DialogAddWork({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values: {
    title: string;
    details?: string;
    category: string;
    dueDate?: Dayjs | null;
  }) => {
    const newTask = {
      id: uuidv4(),
      title: values.title,
      details: values.details,
      category: values.category,
      dueDate: values.dueDate?.format("YYYY-MM-DD"),
    };

    dispatch(addTask(newTask));
    toast.success("เพิ่มงานสำเร็จ!");
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="เพิ่มงานใหม่"
      visible={open}
      onCancel={onClose}
      footer={null}
      className="rounded-lg shadow-lg"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="ชื่อเรื่อง"
          rules={[{ required: true, message: "กรุณากรอกชื่อเรื่อง" }]}
        >
          <Input
            placeholder="ชื่อเรื่องงาน"
            className="border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </Form.Item>

        <Form.Item name="details" label="รายละเอียด">
          <Input.TextArea
            placeholder="รายละเอียดเพิ่มเติม"
            className="border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="หมวดหมู่"
          rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่" }]}
        >
          <Select
            placeholder="เลือกหมวดหมู่"
            className="border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
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
          <DatePicker className="w-full rounded-lg" minDate={dayjs()} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300 rounded-lg py-2"
          >
            เพิ่มงาน
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
