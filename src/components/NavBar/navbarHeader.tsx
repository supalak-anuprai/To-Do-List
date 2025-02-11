import React from "react";
import {
  DownOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import { Avatar, Button, Dropdown, Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import Link from "antd/es/typography/Link";
import { UserResource } from "@clerk/types";
import { useLocation } from "react-router-dom";

//---------------------------------------------------------------------
type NavbarProps = {
  user?: UserResource | null; // ทำให้ user เป็น Optional
};

// เมนูโปรไฟล์
const profileMenu: MenuProps["items"] = [
  { key: "1", label: "My Account", disabled: true },
  { type: "divider" },
  {
    key: "2",
    danger: true,
    label: (
      <SignOutButton>
        <span>Logout</span>
      </SignOutButton>
    ),
    icon: <LogoutOutlined />,
  },
];
//---------------------------------------------------------------------
export default function NavbarHeader({ user }: NavbarProps) {
  const location = useLocation(); // ใช้ useLocation เพื่อติดตามเส้นทางปัจจุบัน

  const itemsNav = [
    { key: "1", label: "Home", path: "/" },
    { key: "2", label: "Manage Tasks", path: "/ManageTasks" },
    // { key: "3", label: "Dashboard", path: "/dashboard" },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="flex items-center gap-4 w-full">
        <Link href="/">
          <span className="text-3xl font-extrabold">ToDoWeb</span>
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[
            itemsNav.find((item) => item.path === location.pathname)?.key ||
              "1",
          ]}
          style={{ flex: 1, minWidth: 0 }}
          items={itemsNav.map((item) => ({
            key: item.key,
            label: <Link href={item.path}>{item.label}</Link>,
          }))}
        />
      </div>

      <div className="flex items-center gap-4 w-50">
        <SignedOut>
          <SignInButton mode="modal">
            <Button type="primary" icon={<LoginOutlined />}>
              Login
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Dropdown menu={{ items: profileMenu }} placement="bottomRight">
            <a
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-2"
            >
              <Avatar src={user?.imageUrl} size={40} icon={<UserOutlined />} />
              <span className="font-bold">{user?.fullName || "User"}</span>
              <DownOutlined />
            </a>
          </Dropdown>
        </SignedIn>
      </div>
    </Header>
  );
}
