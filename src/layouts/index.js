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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.globalLayout.needLogin) {
      router.push('/login');
    }
  }

  render() {
    if(this.props.location.pathname === '/') {
      router.push('/dashboard');
    }

    if(this.props.globalLayout.indexLoading) {
      return <div className={styles.indexLoading}>
        <Spin/>
      </div>
    }

    return (
      <Layout className={styles.normal}>
        <Sider className={styles.sider}
               theme={"dark"}
               collapsible={true}
               collapsed={this.props.globalLayout.siderCollapsed}>
          <SiderContent/>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <HeaderContent/>
          </Header>
          <Content className={styles.content}>
            {function ParentComponent(props){ return ( this.props.children ) }}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect(({globalLayout, loading}) =>
  ({globalLayout, loading: loading.models.globalLayout}))(BasicLayout));
