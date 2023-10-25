import { useState } from 'react'
import { Outlet } from 'react-router-dom';

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import SiderMenu from "../../components/SiderMenu";

import logo from '../../assets/images/core/logo.png'
import logoFold from '../../assets/images/core/logoFold.png'

import { MenuUnfoldOutlined } from "@ant-design/icons";
import './layoutDefault.scss'


function LayoutDefault() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <header className="layout__header">
        <div
          className={"layout__logo " + (collapsed && "layout__logo--fold")}
        >
          <img src={collapsed ? logoFold : logo} alt="Logo" />
        </div>
        <div className="layout__nav">
          <span
            className="layout__icon-collapse"
            onClick={() => setCollapsed(!collapsed)}
          >
            <MenuUnfoldOutlined />
          </span>
          {/* <span className="layout__nav-right">
            <MiniNotification />
          </span> */}
        </div>
      </header>
      <Layout hasSider>
        <Sider
          theme="light"
          className="layout__sider"
          collapsed={collapsed}
          breakpoint="lg"
          onBreakpoint={(e) => setCollapsed(e)}
        >
          <SiderMenu />
        </Sider>
        <Content
          className={
            "layout__content " + (collapsed && "layout__content--full")
          }
        >
          <Outlet />
          </Content>
      </Layout>
      <footer className={
        "layout__footer " + (collapsed && "layout__footer--full")
      }>
        <h3>Footer Testing</h3>
      </footer>
    </Layout>
  )
}

export default LayoutDefault;