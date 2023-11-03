import { Menu } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { GrAchievement } from "react-icons/gr";


function SiderMenu() {
  const location = useLocation();

  const items = [
    {
      key: "/",
      label: <Link to="/">Gameplay</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: "ranking",
      label: <Link to="/ranking">Ranking</Link>,
      icon: <GrAchievement />,
    },
  ];

  return (
    <>
      <Menu
        defaultOpenKeys={["/"]}
        defaultSelectedKeys={location.pathname}
        mode="inline"
        items={items}
      />
    </>
  );
}

export default SiderMenu;
