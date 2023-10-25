import { Menu } from "antd";
import {
  DashboardOutlined,
  // AppstoreOutlined,
  // UnorderedListOutlined,
  // SettingOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

function SiderMenu() {
  const location = useLocation();

  const items = [
    {
      key: "gameplay",
      label: <Link to="/">Gameplay</Link>,
      icon: <DashboardOutlined />,
      // children: [
      //   {
      //     key: "/",
      //     label: <Link to="/">Home</Link>,
      //   },
        // {
        //   key: "/crm",
        //   label: <Link to="/crm">CRM</Link>,
        // },
        // {
        //   key: "/booking-room",
        //   label: <Link to="/booking-room">Booking Room</Link>,
        // },
    //   ],
    // },
    // {
    //   key: "/room",
    //   label: <Link to="/room">Room Manager</Link>,
    //   icon: <UnorderedListOutlined />,
    // },
    // {
    //   key: "/setting",
    //   label: <Link to="/setting">Setting</Link>,
    //   icon: <SettingOutlined />,
    // },
    // {
    //   key: "apps",
    //   label: "Apps",
    //   icon: <AppstoreOutlined />,
    //   children: [
    //     {
    //       key: "chat",
    //       label: "Chat",
    //     },
    //     {
    //       key: "projects",
    //       label: "Projects",
    //       children: [
    //         {
    //           key: "projects-list",
    //           label: "Projects List",
    //         },
    //         {
    //           key: "project-detail",
    //           label: "Project Detail",
    //         },
    //       ],
    //     },
    //   ],
    },
  ];

  return (
    <>
      <Menu
        defaultOpenKeys={["dashboard"]}
        defaultSelectedKeys={location.pathname}
        mode="inline"
        items={items}
      />
    </>
  );
}

export default SiderMenu;
