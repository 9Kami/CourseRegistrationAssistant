import React from 'react';
import {Icon, Row, Col, Card, Statistic, Avatar, Typography, Table } from "antd";
import styles from "./Dashboard.css"
import {connect} from "dva";
import Link from 'umi/link';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tabKey: 'inProgress'
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
      dataIndex: 'courseId',
      key: 'courseId',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
  ];

  tabList = [
    {
      key: 'inProgress',
      tab: 'In-Progress',
    },
    {
      key: 'completed',
      tab: 'Completed',
    },
  ];
  
  componentDidMount() {
    window.g_app._store.dispatch({
      type: 'dashboard/getDashboardInfo'
    });
  }
  
  render() {
    const tabContentList = {
      inProgress: <Table columns={this.coursesColumns} dataSource={this.props.dashboard.inProgressCourses}
                         rowKey={record => record.courseId} pagination={{ pageSize: 5 }}/>,
      completed: <Table columns={this.coursesColumns} dataSource={this.props.dashboard.completedCourses}
                        rowKey={record => record.courseId} pagination={{ pageSize: 5 }}/>
    };
    
    return (
      <main className={styles.dashboardMain}>
        <Row gutter={24} className={styles.dashboardRow}>
          <Col span={16}>
            <Card className={styles.dashboardUserCard} loading={this.props.loading}>
              <div className={styles.dashboardUser}>
                <div className={styles.dashboardUserAvatar}>
                  <Avatar size={103}
                          src={"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"}/>
                </div>
                <div className={styles.dashboardUserText}>
                  <Typography.Title level={3}>{this.props.dashboard.nickname}</Typography.Title>
                  <Typography.Text type="secondary" className={styles.dashboardUserContent}>
                    In {this.props.dashboard.major}, {this.props.dashboard.degree}
                  </Typography.Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card className={styles.dashboardUserDataCard} loading={this.props.loading}>
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
                    title="GPA Hours"
                    value={this.props.dashboard.gpaHours}
                    suffix="/ 120"
                    valueStyle={{fontSize:"52px"}}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="In-Progress"
                    value={this.props.dashboard.inProgressNo}
                    valueStyle={{fontSize:"52px"}}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} className={styles.dashboardRow}>
          <Col span={24}>
            <Card tabList={this.tabList} title={"Your Courses"} activeTabKey={this.state.tabKey}
                  onTabChange={(key)=>this.setState({...this.state, tabKey:key})}
                  extra={<Link to="/track-your-courses">Detail</Link>}
                  loading={this.props.loading}>
              {tabContentList[this.state.tabKey]}
            </Card>
          </Col>
        </Row>
      </main>
    );
  }
}

export default connect(({dashboard, loading}) =>
  ({dashboard, loading: loading.models.dashboard}))(Dashboard);
