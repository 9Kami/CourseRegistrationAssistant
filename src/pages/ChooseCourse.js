import React from 'react';
import {Icon, Steps, Card, Statistic, Avatar, Typography, Table, Form, Input} from "antd";
import styles from "./ChooseCourse.css"
import {connect} from "dva";
import UpdateStatus from "@/pages/UpdateStatus";
import SelectMajorCourses from "@/pages/SelectMajorCourses";
import SelectElectiveCourses from "@/pages/SelectElectiveCourses";

class ChooseCourse extends React.Component {
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  updateStatus = {
    title:'Update',
    description: 'Please update the status of your previous courses.',
    content: <UpdateStatus formItemLayout={this.formItemLayout}/>
  };

  normalSteps = [
    {
      title: 'Major Courses',
      description: 'Please choose your major courses.',
      content: <SelectMajorCourses formItemLayout={this.formItemLayout}/>,
    },
    {
      title: 'Elective Course',
      description: 'Please choose your elective courses.',
      content: <SelectElectiveCourses/>,
    },
    {
      title: 'Done',
      description: 'Course selection completed',
      content: "Done",
    },
  ];

  render() {
    const steps = (this.props.chooseCourse.needChangeStatus)? [this.updateStatus, ...this.normalSteps]:this.normalSteps;

    return <main className={styles.chooseCourseMain}>
      <Card>
        <Steps current={this.props.chooseCourse.currentStep}>
          {steps.map(item => (
            <Steps.Step key={item.title} title={item.title} description={item.description}/>
          ))}
        </Steps>
        <div className={styles.stepContent}>{steps[this.props.chooseCourse.currentStep].content}</div>
      </Card>
    </main>
  }
}

export default connect(({chooseCourse, loading}) =>
  ({chooseCourse, loading: loading.models.chooseCourse}))(Form.create({ name: 'course' })(ChooseCourse));
