import React from "react";
import { Button, Result } from "antd";

const View403: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
    />
  </div>
);

export default View403;
