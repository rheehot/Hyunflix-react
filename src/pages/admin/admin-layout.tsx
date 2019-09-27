import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';

import './admin-layout.css';

const { Header, Content, Footer, Sider } = Layout;

interface Props extends RouteComponentProps {
  isMobile: boolean;
}

interface State {
  collapsed: boolean;
}

class AdminLayout extends React.Component<Props, State> {
  state = {
    collapsed: false,
  };
  
  renderMenu = () => {
    const path: string = this.props.location.pathname;
    
    const items = [
      { name: '파일 탐색기',   path: '/admin/explorer',       icon: 'folder' },
      { name: '비디오 인코딩', path: '/admin/encode',         icon: 'youtube' },
      { name: '회원가입 코드', path: '/admin/register-codes', icon: 'bold' },
      { name: '비디오 관리',   path: '/admin/video-manage',   icon: 'play-circle' },
      { name: '홈으로',        path: '/home',                 icon: 'home' },
    ]
    
    const selectedKeys: string[] = items.filter(i => path.startsWith(i.path)).map(i => i.path);
    
    const itemComps = items.map(i => (
      <Menu.Item key={i.path}>
        <Icon type={i.icon} />
        <span className="nav-text">{i.name}</span>
      </Menu.Item>
    ))
    
    return (
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} onClick={this.menuClicked}>
        {itemComps}
      </Menu>  
    )
  }
  
  render() {
    const { isMobile } = this.props;
    const { collapsed } = this.state;
    
    const siderLayoutClass = (collapsed)
      ? "sider-layout collapsed"
      : "sider-layout expanded"
    
    return (
      <Layout className="admin-layout" style={{ minHeight: '100vh' }}>
        <div className={siderLayoutClass}>
          <Sider
            className="sider"
            breakpoint={isMobile ? "md" : undefined}
            collapsed={isMobile ? collapsed : false}
            collapsedWidth={0}
            trigger={null}
          >
            <div className="logo" />
            { this.renderMenu() }
          </Sider>
          <div className="sider-rest" onClick={this.toggle}/>
        </div>
        <Layout className="main">
          <Header style={{ background: '#eee', padding: 0 }} >
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{ "display": isMobile ? "block" : "none" }}
            />
          </Header>
          <Content className="content">
            <div className="content-inner">
              { this.props.children }
            </div>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Content>
        </Layout>
      </Layout>
    )
  }
  
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };
  
  menuClicked = (e) => {
    this.props.history.push(e.key);
    this.toggle();
  }
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.etc.isMobile,
  }
}

export default connect(mapStateToProps)(withRouter(AdminLayout));