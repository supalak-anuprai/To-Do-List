import { JSX, useCallback, useState } from "react";
import { AutoComplete, Flex, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Task } from "../../features/tasks/tasksSlice";

type Props = {
  tasks: Task[];
  onSearchResult: (filteredTasks: Task[]) => void;
};

const SearchAutocomplete: React.FC<Props> = ({ tasks, onSearchResult }) => {
  const [searchResults, setSearchResults] = useState<
    { value: string; label: JSX.Element }[]
  >([]);

  const handleSearch = useCallback(
    (value: string) => {
      if (!value) {
        setSearchResults([]);
        onSearchResult(tasks); // ถ้าไม่มีค่า ให้แสดงทั้งหมด
        return;
      }

      const filteredTasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(value.toLowerCase()) ||
          (task.details &&
            task.details.toLowerCase().includes(value.toLowerCase()))
      );

      setSearchResults(
        filteredTasks.map((task) => ({
          value: task.title,
          label: (
            <Flex align="center" justify="space-between">
              {task.title}
              <span>
                <UserOutlined /> {task.category}
              </span>
            </Flex>
          ),
        }))
      );

      onSearchResult(filteredTasks); // อัปเดตรายการที่แสดงใน ManageTasks
    },
    [tasks, onSearchResult, setSearchResults]
  );

  return (
    <AutoComplete
      popupMatchSelectWidth={400}
      style={{ width: 320, zIndex: 100 }}
      options={[{ options: searchResults }]}
      onSearch={handleSearch}
      size="large"
      open={searchResults.length > 0}
    >
      <Input.Search size="large" placeholder="ค้นหางานของคุณ..." />
    </AutoComplete>
  );
};

export default SearchAutocomplete;
