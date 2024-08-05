import { Layout, theme } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

const { Content, Header } = Layout;

const styles = {
  headerStyle: {
    display: 'flex',
    alignItems: 'center',
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9,
  },
  brandName: { color: '#ffffff', fontFamily: 'cursive', fontSize: '20px' },
  content: {
    padding: '0 48px',
    marginTop: 60,
    minHeight: 'calc(100vh - 69px)',
  },
  contentDiv: {
    background: '',
    height: 'auto',
    margin: '40px 0px',
    padding: 24,
    borderRadius: 0,
  },
};

/**
 * @component AppLayout
 * @description
 *  Create common AppLayout component like header, brandname and nav links for whole application
 * @returns { ReactNode }
 */
const AppLayout = (): React.ReactElement => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  styles.contentDiv.background = colorBgContainer;
  styles.contentDiv.borderRadius = borderRadiusLG;

  return (
    <Layout>
      <Header style={styles.headerStyle}>
        <div style={styles.brandName}>
          <strong>Task Management</strong>
        </div>
      </Header>
      <Content style={styles.content}>
        <div style={styles.contentDiv}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
