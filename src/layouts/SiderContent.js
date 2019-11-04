import React from 'react';
import {Menu, Icon} from "antd";
import styles from "./index.css";
import Link from 'umi/link';

class SiderContent extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.siderLogo}>
        </div>
        <Menu theme={"dark"} defaultSelectedKeys={["dashboard"]}>
          <Menu.Item key={"dashboard"} >
            <Link to={"/dashboard"}>
              <Icon type="dashboard" />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={"chooseCourses"}>
            <Icon type="book" />
            <span>Choose Your Courses</span>
          </Menu.Item>
          <Menu.Item key={"trackCourses"}>
            <Icon type="file-search" />
            <span>Track Your Courses</span>
          </Menu.Item>
          <Menu.Item key={"setting"}>
            <Icon type="setting" />
            <span>Setting</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default SiderContent;
