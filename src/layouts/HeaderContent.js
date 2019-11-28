import React from 'react';
import {Icon, Avatar, Dropdown, Menu} from "antd";
import styles from "./index.css"
import withRouter from "umi/withRouter";
import {connect} from "dva";
import router from "umi/router";

class HeaderContent extends React.Component {
  handleCollapse(){
    window.g_app._store.dispatch({
      type: 'globalLayout/collapse'
    });
  }

  handleLogOut(){
    window.g_app._store.dispatch({
      type: 'globalLayout/logOut'
    });
  }

  render() {
    const dropdown = (
      <Menu>
        <Menu.Item key="0">
          <Icon className={styles.headerDropdownIcon} type="setting" />
          Setting
        </Menu.Item>
        <Menu.Item key="1" onClick={() => this.handleLogOut()}>
          <Icon className={styles.headerDropdownIcon} type="logout" />
          Log Out
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <a className={styles.siderCollapseButton} onClick={() => this.handleCollapse()}>
          <Icon type={(this.props.globalLayout.siderCollapsed)? "menu-unfold":"menu-fold"}/>
        </a>
        <Dropdown overlay={dropdown} trigger={['click']}>
          <span className={styles.headerUserInfo}>
            <Avatar className={styles.headerUserAvatar} src={this.props.globalLayout.avatar} />
            <span>{this.props.globalLayout.nickname}</span>
          </span>
        </Dropdown>
      </div>
    );
  }
}

export default withRouter(connect(({globalLayout, loading}) =>
  ({globalLayout, loading: loading.models.globalLayout}))(HeaderContent));
