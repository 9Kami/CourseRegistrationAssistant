import React from 'react';
import {Icon, Avatar} from "antd";
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

  render() {
    return (
      <div>
        <a className={styles.siderCollapseButton} onClick={() => this.handleCollapse()}>
          <Icon type={(this.props.globalLayout.siderCollapsed)? "menu-unfold":"menu-fold"}/>
        </a>
        <span className={styles.headerUserInfo}>
          <Avatar className={styles.headerUserAvatar} src={this.props.globalLayout.avatar} />
          <span>{this.props.globalLayout.username}</span>
        </span>
      </div>
    );
  }
}

export default withRouter(connect(({globalLayout, loading}) =>
  ({globalLayout, loading: loading.models.globalLayout}))(HeaderContent));
