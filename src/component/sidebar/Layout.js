import React from "react";
import { Button, Layout } from "antd";
import { logout } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { Sidebar } from "./Sidebar";

const { Header } = Layout;

export function SidebarBody() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <Sidebar>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <div className="headerDesc">
            <div>
              <img src="icon" alt="Rasm Yo`q" />
            </div>
            <div className="btnLogOut">
              <Button type="danger" onClick={logoutHandler}>
                Chiqish
              </Button>
            </div>
          </div>
        </Header>
      </Layout>
    </Sidebar>
  );
}
