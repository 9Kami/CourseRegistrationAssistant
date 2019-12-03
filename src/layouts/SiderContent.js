import React from 'react';
import {Menu, Icon, Typography} from "antd";
import styles from "./index.css";
import Link from 'umi/link';

class SiderContent extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.siderLogo}>
          <img className={styles.siderLogoImage} src={require("../assets/logo.png")} alt={"logo"} height={'32px'}/>
          <h1 className={styles.siderLogoTitle}>Registration Assistant</h1>
        </div>
        <Menu theme={"dark"} selectedKeys={this.props.selectedKeys}>
          <Menu.Item key={"dashboard"} >
            <Link to={"/dashboard"}>
              <Icon type="dashboard" />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={"chooseCourses"}>
            <Link to={"/choose-your-courses"}>
              <Icon type="book" />
              <span>Choose Your Courses</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={"trackCourses"}>
            <Link to={"/track-your-courses"}>
              <Icon type="file-search" />
              <span>Track Your Courses</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={"setting"}>
            <Link to={"/setting"}>
              <Icon type="setting" />
              <span>Setting</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default SiderContent;
