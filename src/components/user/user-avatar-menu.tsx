import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { RootState } from 'src/reducers';
import { logoutAction } from 'src/actions';

interface Props {
  username: string;
  logout(): ReturnType<typeof logoutAction>;
}

const USER_VIDEOS = 'user-videos';
const LOGOUT = 'logout';
const CHANGE_PASSWORD = 'change-password';

const UserAvatarMenu: React.FunctionComponent<Props> = (props) => {
  const onClick = ({ key }) => {
    if (key === LOGOUT) {
      props.logout();
    }
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item>
        @
        {props.username}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key={USER_VIDEOS}><Link to="/user/videos">시청 기록</Link></Menu.Item>
      <Menu.Item key={CHANGE_PASSWORD}><Link to="/user/password-change">비밀번호 변경</Link></Menu.Item>
      <Menu.Divider />
      <Menu.Item key={LOGOUT}>로그아웃</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Avatar icon={<UserOutlined />} />
    </Dropdown>
  );
};

const mapDispatchToProps = {
  logout: logoutAction,
};

const mapStateToProps = (state: RootState) => ({
  username: '', // TODO
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatarMenu);
