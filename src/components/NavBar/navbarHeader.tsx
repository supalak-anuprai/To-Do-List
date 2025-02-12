import {
  DownOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import Link from "antd/es/typography/Link";
import { useLocation, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { RootState } from "../../store";

//---------------------------------------------------------------------
//---------------------------------------------------------------------
export default function NavbarHeader({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const location = useLocation(); // ใช้ useLocation เพื่อติดตามเส้นทางปัจจุบัน
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const allTasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter((task) => task.userEmail === user?.email)
  );

  const handleLogOut = () => {
    googleLogout();
    dispatch(logout());
    navigate("/");
  };
  // เมนูโปรไฟล์
  const profileMenu: MenuProps["items"] = [
    { key: "1", label: "My Account", disabled: true },
    { type: "divider" },
    {
      key: "2",
      danger: isAuthenticated,
      label: (
        <Button
          type="link"
          href={!isAuthenticated ? "/register" : undefined}
          size="large"
        >
          <span>{isAuthenticated ? "Logout" : "Register"}</span>
        </Button>
      ),
      icon: isAuthenticated ? <LogoutOutlined /> : null,
      onClick: isAuthenticated ? handleLogOut : undefined,
    },
  ];

  const itemsNav = [
    { key: "1", label: "Home", path: "/" },
    { key: "2", label: "Manage Tasks", path: "/ManageTasks" },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
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
            label: (
              <Link href={item.path}>
                <Badge
                  count={item.key === "2" ? allTasks?.length : ""}
                  overflowCount={10}
                  offset={[0, -10]}
                >
                  <p className="font-bold text-amber-50">{item.label}</p>
                </Badge>
              </Link>
            ),
          }))}
        />
      </div>

      <div className="flex items-center gap-4 w-10 md:w-60">
        {!isAuthenticated && (
          <Button type="primary" icon={<LoginOutlined />} href="/login">
            Login
          </Button>
        )}
        <Dropdown
          menu={{ items: profileMenu }}
          placement="bottomRight"
          className={`${isAuthenticated ? "" : "hidden md:flex"}`}
        >
          <a className="flex items-center gap-2">
            <Avatar src={user?.picture} size={40} icon={<UserOutlined />} />
            <span className="font-bold hidden md:inline">
              {user?.email || "User"}
            </span>
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}
