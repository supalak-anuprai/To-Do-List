import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deleteTask } from "../features/tasks/tasksSlice";
import { Button, Empty, Modal } from "antd";
import toast from "react-hot-toast";
import DialogAddWork from "../components/DialogModal/dialogAddWork";

const ManageTasks: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "คุณต้องการลบงานนี้หรือไม่?",
      content: "การลบงานจะไม่สามารถกู้คืนได้",
      okText: "ลบ",
      okType: "danger",
      cancelText: "ยกเลิก",
      onOk: () => {
        dispatch(deleteTask(id));
        toast.success("ลบงานแล้ว");
      },
    });
  };

  const showModal = () => {
    setIsModalVisible(true); // แสดง Modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // ปิด Modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-8">
          <Button
            type="primary"
            onClick={showModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300 rounded-lg py-2"
          >
            เพิ่มงาน
          </Button>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
            รายการงาน
          </h2>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 pt-40">
              <Empty description={false} />
              <p className="text-gray-600 text-center text-xl">
                ไม่มีงานในรายการ
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  {task.details && (
                    <p className="text-gray-600 mt-2">{task.details}</p>
                  )}
                  <p className="mt-2 text-gray-700">
                    <strong>หมวดหมู่:</strong> {task.category}
                  </p>
                  {task.dueDate && (
                    <p className="mt-2 text-gray-700">
                      <strong>ครบกำหนด:</strong> {task.dueDate}
                    </p>
                  )}
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(task.id)}
                    className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white transition duration-300 rounded-lg"
                  >
                    ลบงาน
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <DialogAddWork open={isModalVisible} onClose={handleCancel} />
    </div>
  );
};

export default ManageTasks;
