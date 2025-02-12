import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deleteTask } from "../features/tasks/tasksSlice";
import { Button, Empty, Modal } from "antd";
import toast from "react-hot-toast";
import DialogAddWork from "../components/DialogModal/dialogAddWork";
import SearchAutocomplete from "../components/AutocompleteSearch/searchTasks";

const ManageTasks: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<any>(null); // ใช้สำหรับเก็บงานที่จะแก้ไข
  const user = useSelector((state: RootState) => state.auth.user);

  const allTasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter((task) => task.userEmail === user?.email)
  );

  const [filteredTasks, setFilteredTasks] = useState(allTasks);

  useEffect(() => {
    if (JSON.stringify(allTasks) !== JSON.stringify(filteredTasks)) {
      setFilteredTasks(allTasks);
    }
  }, [allTasks, filteredTasks]);

  const handleDelete = (id: string) => {
    if (!user?.email) return;

    Modal.confirm({
      title: "คุณต้องการลบงานนี้หรือไม่?",
      content: "การลบงานจะไม่สามารถกู้คืนได้",
      okText: "ลบ",
      okType: "danger",
      cancelText: "ยกเลิก",
      onOk: () => {
        dispatch(deleteTask({ id, userEmail: user.email }));
        toast.success("ลบงานแล้ว");
      },
    });
  };

  const handleEdit = (task: any) => {
    setTaskToEdit(task); // ตั้งค่า task ที่จะแก้ไข
    setIsModalVisible(true); // เปิด Modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-8 flex justify-between items-center">
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300 rounded-lg py-2"
          >
            เพิ่มงาน
          </Button>

          {/* ส่ง tasks ไปยัง search และรับผลลัพธ์กลับมา */}
          <SearchAutocomplete
            tasks={allTasks}
            onSearchResult={setFilteredTasks}
          />
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            รายการงานของคุณ
          </h2>
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center mt-15 justify-center gap-4 pt-40">
              <Empty description={false} />
              <p className="text-gray-600 text-center text-xl">
                ไม่มีงานในรายการ
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-15">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
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
                  <br className="my-4" />
                  <Button
                    type="primary"
                    onClick={() => handleEdit(task)}
                    className=" w-full bg-amber-400-300-600 hover:bg-blue-700 text-white transition duration-300 rounded-lg"
                  >
                    แก้ไขงาน
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <DialogAddWork
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        task={taskToEdit} // ส่งงานที่จะแก้ไข
      />
    </div>
  );
};

export default ManageTasks;
