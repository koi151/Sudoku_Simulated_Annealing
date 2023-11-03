import { useState, useEffect } from 'react'
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

  useEffect(() => {
    const header = document.querySelector('header');
    const sider = document.querySelector('aside');

    let lastScrollTop = 0;
    const onScroll = () => {
      const contentLayout = document.querySelector('.layout__content');
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 70) {
        contentLayout.classList.add('pad-lr-0');
       
        // Scrolling down, hide the navbar
        header.style.top = '-80px';
        if (collapsed) {
          sider.style.left = '-80px';
        } else {
          sider.style.left = '-200px';
        }

      } else {
        // Scrolling up, show the navbar
        contentLayout.classList.remove('pad-lr-0');
        header.style.top = '0';
        sider.style.left = '0';
      }
      lastScrollTop = scrollTop;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [collapsed]);

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