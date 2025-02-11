import React from "react";
import { Flex, Spin, Typography } from "antd";

const LoadingApp: React.FC = () => (
  <Flex
    align="center"
    gap="middle"
    className="h-screen w-full flex justify-center items-center"
  >
    <Spin size="large" tip="Loading..." />
    <Typography.Title level={3}>Loading...</Typography.Title>
  </Flex>
);

export default LoadingApp;
