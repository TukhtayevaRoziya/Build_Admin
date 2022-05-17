import React from "react";
import "antd/dist/antd.css";
import { Button, Layout, Menu, Result } from "antd";
import { ContactsOutlined, CommentOutlined } from "@ant-design/icons";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HistoryIcon from "@mui/icons-material/History";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { Routes, Route, NavLink } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { Contact } from "../contact/Contact";
import { History } from "./../history/History";
import { Navigation } from "./../navigation/Navigation";
import { News } from "../news/News";
import { OurSevice } from "./../ourSevice/OurSevice";
import { Carousel } from "./../carousel/Carousel";
import { Project } from "./../project/Project";
// import { Network } from './../network/Network';
import { NetworkUrl } from "./../networkUrl/NetworkUrl";
import { UserComment } from "./../userComment/UserComment";

const { Header, Sider } = Layout;
function LogOut(params) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div className="headerDesc">
        <div>
          <img className="logoIcon" src={logo} alt="Rasm Yo`q" />
        </div>
        <div className="btnLogOut">
          <Button type="danger" onClick={logoutHandler}>
            Chiqish
          </Button>
        </div>
      </div>
    </Header>
  );
}

export class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          width={"250"}
        >
          <div className="logo">
            {!collapsed ? (
              <>
                <AdminPanelSettingsIcon /> Build Admin
              </>
            ) : (
              <AdminPanelSettingsIcon />
            )}
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<ContactsOutlined />}>
              <NavLink to={"contact"}>Bog'lanish</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<HistoryIcon />}>
              <NavLink to={"history "}>Tarix</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<NewspaperIcon />}>
              <NavLink to={"news"}>Yangiliklar</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<CleaningServicesIcon />}>
              <NavLink to={"ourService"}>Xizmatlar</NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<CommentOutlined />}>
              <NavLink to={"carousel"}>Carousel</NavLink>
            </Menu.Item>
            <Menu.Item key="6" icon={<CommentOutlined />}>
              <NavLink to={"project"}>Project</NavLink>
            </Menu.Item>
            {/* <Menu.Item key="7" icon={<CommentOutlined />}>
              <NavLink to={"socialNetwork"}>Ijtiomiy tarmoqlar</NavLink>
            </Menu.Item> */}
            <Menu.Item key="7" icon={<CommentOutlined />}>
              <NavLink to={"socialNetworkUrl"}>Ijtiomiy tarmoq Urllari</NavLink>
            </Menu.Item>
            <Menu.Item key="8" icon={<CommentOutlined />}>
              <NavLink to={"userComment"}>Foydalanuvchi Izohi</NavLink>
            </Menu.Item>
            {/* <SubMenu key="sub1" icon={<UserOutlined />} title="Qurilish">
              <Menu.Item key="3">
                <NavLink to={"about"}>Sarlavha</NavLink>
              </Menu.Item>
              <Menu.Item key="4">Asosiy</Menu.Item>
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <LogOut />
          <Routes>
            <Route index element={<Contact />} />
            {/* <Route path="category" element={<Category />} />
            <Route path="construction" element={<Construction />} /> */}
            <Route path="contact" element={<Contact />} />
            <Route path="history" element={<History />} />
            <Route path="navigation" element={<Navigation />} />
            <Route path="news" element={<News />} />
            <Route path="ourService" element={<OurSevice />} />
            {/* <Route path="recentComment" element={<RecentComment />} /> */}
            <Route path="carousel" element={<Carousel />} />
            <Route path="project" element={<Project />} />
            {/* <Route path="socialNetwork" element={<Network />} /> */}
            <Route path="socialNetworkUrl" element={<NetworkUrl />} />
            <Route path="userComment" element={<UserComment />} />
            <Route
              path="*"
              element={
                <Result
                  status="404"
                  title="404"
                  subTitle="Kechirasiz, siz tashrif buyurgan sahifa mavjud emas."
                  extra={
                    <NavLink to={"/"}>
                      <Button type="primary">Orqaga qaytish</Button>
                    </NavLink>
                  }
                />
              }
            />
          </Routes>
        </Layout>
      </Layout>
    );
  }
}
