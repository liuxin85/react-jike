import { useEffect } from "react";
import { Layout, Menu, Popconfirm } from "antd";
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MenuInfo } from "rc-menu/lib/interface";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, clearUserInfo } from "@/store/modules/user";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const onMenuClck = (route: MenuInfo) => {
    console.log("menu clicked", route);
    const path = route.key;
    navigate(path);
  };

  // 反向高亮
  // 1. 获取当前路由路径
  const location = useLocation();

  const selectedKey = location.pathname;

  // 触发个人用户信息action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const name = useSelector((state) => state.user.userInfo.name);

  // 退出登录确认回调
  const onConfirm = () => {
    console.log("confirmed");
    dispatch(clearUserInfo());
    navigate("/login");
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            onClick={onMenuClck}
            mode="inline"
            theme="dark"
            selectedKeys={[selectedKey]}
            defaultSelectedKeys={["1"]}
            items={items}
            style={{ height: "100%", borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
