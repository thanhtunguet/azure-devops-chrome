import {Layout, Menu} from 'antd';
import React from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {menu} from './config/menu';

const {Header, Content, Footer} = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  return (
    <Layout>
      <Header className="d-flex align-items-center">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          onClick={(item: {key: string}) => {
            navigate(item.key);
          }}
          items={menu}
          className="d-flex w-100"
        />
      </Header>
      <Content className="m-2 flex-grow-1">
        <Outlet />
      </Content>
      <Footer className="text-center">
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
