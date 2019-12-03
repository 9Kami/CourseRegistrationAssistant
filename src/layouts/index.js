import styles from './index.css';
import React from 'react';
import {Layout, Spin} from "antd";
import withRouter from 'umi/withRouter';
import {connect} from "dva";
import HeaderContent from "./HeaderContent";
import SiderContent from "./SiderContent";
import router from "umi/router";


const { Header, Sider, Content } = Layout;

class BasicLayout extends React.Component {

  componentDidMount() {
    window.g_app._store.dispatch({
      type: 'globalLayout/initialize'
    });
  }

  render() {
    if(this.props.location.pathname === '/') {
      router.push('/dashboard');
    }

    if(this.props.globalLayout.indexLoading) {
      return <div className={styles.indexLoading}>
        <Spin size={"large"}/>
      </div>
    }

    let selectedKeys;
    switch (this.props.location.pathname) {
      case "/dashboard":
        selectedKeys = ["dashboard"];
        break;
      case "/choose-your-courses":
        selectedKeys = ["chooseCourses"];
        break;
      case "/track-your-courses":
        selectedKeys = ["trackCourses"];
        break;
      case "/setting":
        selectedKeys = ["setting"];
        break;
      default:
        selectedKeys = [];
    }

    return (
      <Layout className={styles.normal}>
        <Sider className={styles.sider}
               theme={"dark"}
               collapsible={true}
               collapsed={this.props.globalLayout.siderCollapsed}>
          <SiderContent selectedKeys={selectedKeys}/>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <HeaderContent/>
          </Header>
          <Content className={styles.content}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect(({globalLayout, loading}) =>
  ({globalLayout, loading: loading.models.globalLayout}))(BasicLayout));
