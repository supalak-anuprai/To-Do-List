import React from "react";
import { Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 h-screen flex items-center justify-center px-6 lg:px-12 text-center">
      {/* แสงเงาเบื้องหลังเพิ่มมิติ */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30"></div>

      <div className="relative z-10">
        {/* Title พร้อมเงาเรืองแสง */}
        <Title
          level={1}
          className="text-7xl md:text-9xl font-light mb-6"
          style={{
            color: "#fff",
            textShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
          }}
        >
          ยินดีต้อนรับสู่
          <span className="bg-gradient-to-r ml-2 from-white via-gray-200 to-white bg-clip-text text-transparent">
            To Do Web!
          </span>
        </Title>

        {/* คำบรรยายพร้อม Animation */}
        <Paragraph
          strong
          className="text-lg md:text-xl mb-6 animate__animated animate__fadeInUp animate__delay-1s"
        >
          เว็บแอปพลิเคชันจัดการงาน ที่ช่วยให้คุณบริหารงานได้ง่ายขึ้น
          <br /> เพิ่ม, ลบ, และค้นหางานที่ต้องทำได้สะดวกสุด ๆ
        </Paragraph>

        <Button
          type="primary"
          size="large"
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
          href="/ManageTasks"
        >
          เริ่มต้นใช้งานเลย!
        </Button>
      </div>
    </div>
  );
};

export default Hero;
