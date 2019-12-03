import React from 'react';
import {Popconfirm, Card, Table, PageHeader, Cascader} from "antd";
import styles from "./TrackCourses.css"
import {connect} from "dva";
import Link from 'umi/link';

class TrackCourses extends React.Component {
  componentDidMount() {
    window.g_app._store.dispatch({
      type: 'trackCourses/getRegisteredCourses'
    });
  }
  
  statusOptions = [
    {
      label: "In-progress",
      value: 1
    },
    {
      label: "Passed",
      value: 2,
      children: [
        {
          label: "A+",
          value: "A+"
        },
        {
          label: "A",
          value: "A"
        },
        {
          label: "A-",
          value: "A-"
        },
        {
          label: "B+",
          value: "B+"
        },
        {
          label: "B",
          value: "B"
        },
        {
          label: "B-",
          value: "B-"
        },
        {
          label: "C+",
          value: "C+"
        },
        {
          label: "C",
          value: "C"
        },
        {
          label: "C-",
          value: "C-"
        },
        {
          label: "D",
          value: "D"
        }
      ]
    },
    {
      label: "Failed",
      value: 3
    },
    {
      label: "Dropped",
      value: 4
    },
  ];
  
  changeStatus(record, value) {
    console.log(record);
    console.log(value);
    let data = { courses: [
      (value[0] === 2)? { courseId: record.courseId, op: value[0], letterGrade: value[1] }
      :{courseId: record.courseId, op: value[0]}
      ]};
    console.log(data);
    window.g_app._store.dispatch({
      type: 'trackCourses/changeStatus',
      payload: {
        data
      }
    });
  }
  
  inProgressCoursesColumns = [
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
    {
      title: 'Change Status',
      dataIndex: '',
      key: 'action',
      render: (text, record, index) =>
        <Cascader options={this.statusOptions} allowClear={false}
                  onChange={(value, selectedOptions) =>this.changeStatus(record, value)}/>
    },
  ];

  completedCoursesColumns = [
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
    {
      title: 'Letter Grade',
      dataIndex: 'letterGrade',
      key: 'letterGrade',
    },
    {
      title: 'Grade Point',
      dataIndex: 'gradePoint',
      key: 'gradePoint',
    },
    {
      title: 'GPA Hours',
      dataIndex: 'creditHour',
      key: 'creditHour',
    },
    {
      title: 'Change Status',
      dataIndex: '',
      key: 'action',
      render: (text, record, index) =>
        <Cascader options={this.statusOptions} allowClear={false}
                  onChange={(value, selectedOptions) =>this.changeStatus(record, value)}/>
    },
  ];

  render() {
    return <main>
      <PageHeader title={"Track Your Couses"} ghost={false}>
        Track Your Couses
      </PageHeader>
      <div className={styles.trackCoursesContent}>
        <Card title="In-progress Courses" className={styles.trackCoursesCard}>
          <Table columns={this.inProgressCoursesColumns} dataSource={this.props.trackCourses.inProgressCourses}
                 rowKey={record => record.courseId} pagination={{ pageSize: 5 }}/>
        </Card>
        <Card title="Completed Courses" className={styles.trackCoursesCard}>
          <Table columns={this.completedCoursesColumns} dataSource={this.props.trackCourses.completedCourses}
                 rowKey={record => record.courseId} pagination={{ pageSize: 5 }}/>
        </Card>
      </div>
    </main>
  }
}

export default connect(({trackCourses, loading}) =>
  ({trackCourses, loading: loading.models.trackCourses}))(TrackCourses);
