import React, { useState } from "react";
import { Button, Input, Spin, Typography, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Hero: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleAddTask = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Here you can add functionality after adding the task, like showing a success message
    }, 2000); // Simulate a network request or task being added
  };

  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="relative bg-blue-600 text-white py-32 px-6 lg:px-12">
      <div className="absolute inset-0 bg-opacity-50 bg-gradient-to-r from-blue-600 to-blue-800"></div>
      <div className="relative z-10 text-center">
        <Title
          level={1}
          className="text-4xl md:text-5xl font-extrabold mb-4 animate__animated animate__fadeIn animate__delay-1s"
        >
          Welcome to Your To-Do List!
        </Title>
        <Paragraph className="text-lg md:text-xl mb-6 animate__animated animate__fadeIn animate__delay-2s">
          Stay organized and manage your tasks efficiently.
        </Paragraph>

        <Row justify="center" className="mb-8">
          <Col xs={24} md={12}>
            <Input
              className="w-full md:w-96 rounded-full py-3 px-6"
              placeholder="Enter your task..."
              size="large"
              allowClear
            />
          </Col>
        </Row>

        <Button
          type="primary"
          size="large"
          className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out rounded-full"
          onClick={handleAddTask}
          loading={loading}
        >
          {loading ? <Spin indicator={loadingIcon} /> : "Add Task"}
        </Button>

        {loading && (
          <div className="mt-6 text-center">
            <Spin size="large" />
            <p className="text-white mt-2">Adding your task...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
