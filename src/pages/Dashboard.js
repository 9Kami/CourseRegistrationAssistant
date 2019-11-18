import React from 'react';
import {Icon, Row, Col, Card, Statistic, Avatar, Typography, Table } from "antd";
import styles from "./Dashboard.css"
import {connect} from "dva";
import Link from 'umi/link';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tabKey: 'inProcess'
    }
  }

  coursesColumns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Course Number',
      dataIndex: 'courseNo',
      key: 'courseNo',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
  ];

  tabList = [
    {
      key: 'inProcess',
      tab: 'In Process',
    },
    {
      key: 'completed',
      tab: 'Completed',
    },
  ];

  tabContentList = {
    inProcess: <Table columns={this.coursesColumns} />,
    completed: <Table columns={this.coursesColumns} bordered={true} />
  };

  render() {
    return (
      <main className={styles.dashboardMain}>
        <Row gutter={24} className={styles.dashboardRow}>
          <Col span={16}>
            <Card>
              <div className={styles.dashboardUser}>
                <div className={styles.dashboardUserAvatar}>
                  <Avatar size={103}
                          src={"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"}/>
                </div>
                <div className={styles.dashboardUserText}>
                  <Typography.Title level={3}>
                    9Kami
                  </Typography.Title>
                  <Typography.Text type="secondary" className={styles.dashboardUserContent}>
                    In Computer Science, Bachelor of Science
                  </Typography.Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="GPA"
                    value={this.props.dashboard.gpa}
                    precision={2}
                    suffix="/ 4.30"
                    valueStyle={{fontSize:"52px"}}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="GPA Hours Earned"
                    value={this.props.dashboard.gpaHours}
                    suffix="/ 120"
                    valueStyle={{fontSize:"52px"}}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Course in Processing"
                    value={this.props.dashboard.inProcessNo}
                    valueStyle={{fontSize:"52px"}}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} className={styles.dashboardRow}>
          <Col span={12}>
            <Card title="In Processing Courses" extra={<a href="#">Detail</a>}>
              <Table columns={this.coursesColumns} bordered={false} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Completed Courses" extra={<a href="#">Detail</a>}>
              <Table columns={this.coursesColumns} bordered={false} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} className={styles.dashboardRow}>
          <Col span={24}>
            <Card tabList={this.tabList} title={"Your Courses"} activeTabKey={this.state.tabKey}
                  onTabChange={(key)=>this.setState({...this.state, tabKey:key})}
                  extra={<Link to="/track-your-courses">Detail</Link>}>
              {this.tabContentList[this.state.tabKey]}
            </Card>
          </Col>
        </Row>
      </main>
    );
  }
}

export default connect(({dashboard, loading}) =>
  ({dashboard, loading: loading.models.dashboard}))(Dashboard);
