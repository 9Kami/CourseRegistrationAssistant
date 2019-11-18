import React from 'react';
import {Steps, Card, Result, Button, Typography, Table, Form, Input, PageHeader} from "antd";
import styles from "./TrackCourses.css"
import {connect} from "dva";
import Link from 'umi/link';

class TrackCourses extends React.Component {
  inProcessCoursesColumns = [
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
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
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
      dataIndex: 'courseNo',
      key: 'courseNo',
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
      title: 'GPA',
      dataIndex: 'gpa',
      key: 'gpa',
    },
    {
      title: 'GPA Hours',
      dataIndex: 'gpaHours',
      key: 'gpaHours',
    },
  ];

  render() {
    return <main>
      <PageHeader title={"Track Your Couses"} ghost={false}>
        Track Your Couses
      </PageHeader>
      <div className={styles.trackCoursesContent}>
        <Card title="In Processing Courses" className={styles.trackCoursesCard}>
          <Table columns={this.inProcessCoursesColumns} bordered={false} />
        </Card>
        <Card title="Completed Courses" className={styles.trackCoursesCard}>
          <Table columns={this.completedCoursesColumns} bordered={false} />
        </Card>
      </div>
    </main>
  }
}

export default connect(({trackCourses, loading}) =>
  ({trackCourses, loading: loading.models.trackCourses}))(TrackCourses);
