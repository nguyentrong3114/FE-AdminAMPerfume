import { Layout, Menu, Avatar, Dropdown, Badge, theme } from "antd";
import {
    HomeOutlined,
    ShoppingOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    BellOutlined,
    SettingOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { useState } from "react";
import React from "react";

const { Header, Content, Sider } = Layout;
const { useToken } = theme;

const menuItems = [
    { label: "Dashboard", key: "/", icon: <HomeOutlined /> },
    { label: "Products", key: "/products", icon: <ShoppingOutlined /> },
    { label: "Users", key: "/users", icon: <UserOutlined /> },
    { label: "Orders", key: "/orders", icon: <ShoppingCartOutlined /> },
];

const userMenuItems = [
    {
        key: 'profile',
        label: 'Profile',
        icon: <UserOutlined />
    },
    {
        key: 'settings',
        label: 'Settings',
        icon: <SettingOutlined />
    },
    {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutOutlined />
    }
];

interface AdminLayoutProps {
    children: ReactNode;
    isDark: boolean;
    toggleTheme: () => void;
}

export default function AdminLayout({ children, isDark, toggleTheme }: AdminLayoutProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useToken();
    const [collapsed, setCollapsed] = useState(false);
    
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                breakpoint="lg"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    background: token.colorBgContainer,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
            >
                <div className="flex items-center justify-center py-6">
                    <span className={`ml-2 text-xl font-bold ${collapsed ? 'hidden' : ''}`}>AM-Admin</span>
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    onClick={(e) => navigate(e.key)}
                    items={menuItems}
                    style={{ border: 'none' }}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        background: token.colorBgContainer,
                        padding: '0 24px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center">
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger text-xl mr-4 cursor-pointer',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <h1 className="text-xl font-bold m-0">
                            {menuItems.find(item => item.key === location.pathname)?.label || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="px-2 py-1 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {isDark ? "Light Mode" : "Dark Mode"}
                        </button>
                        <Badge count={5} size="small">
                            <BellOutlined style={{ fontSize: '20px' }} className="cursor-pointer" />
                        </Badge>

                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                            <div className="flex items-center cursor-pointer">
                                <Avatar icon={<UserOutlined />} />
                                <span className="ml-2">Admin User</span>
                            </div>
                        </Dropdown>
                    </div>
                </Header>

                <Content
                    style={{
                        margin: '24px',
                        padding: '24px',
                        background: token.colorBgContainer,
                        borderRadius: token.borderRadiusLG,
                        minHeight: 280
                    }}
                >
                    <Outlet />  
                </Content>
            </Layout>
        </Layout>
    );
}
