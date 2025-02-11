import { Footer } from "antd/es/layout/layout";

export default function FooterApp() {
  return (
    <Footer style={{ textAlign: "center" }}>
      To Do Web Design ©{new Date().getFullYear()} Created by{" "}
      <span className="font-bold">Supalak Anuprai</span>
    </Footer>
  );
}
