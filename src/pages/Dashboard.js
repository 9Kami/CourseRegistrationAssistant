import React from 'react';
import {Icon, Card} from "antd";
import styles from "./index.css"
import withRouter from "umi/withRouter";
import {connect} from "dva";

class Dashboard extends React.Component {

  render() {
    return (
      <main>
        {this.props.globalLayout.username}
      </main>
    );
  }
}

export default withRouter(connect(({dashboard, loading}) =>
  ({dashboard, loading: loading.models.globalLayout}))(Dashboard));
