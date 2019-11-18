import React from 'react';
import {Steps, Card, Result, Button, PageHeader, Table, Form, Input} from "antd";
import styles from "./ChooseCourses.css"
import {connect} from "dva";
import UpdateStatus from "@/pages/UpdateStatus";
import SelectMajorCourses from "@/pages/SelectMajorCourses";
import SelectElectiveCourses from "@/pages/SelectElectiveCourses";
import Link from 'umi/link';

class ChooseCourses extends React.Component {
  handleChooseAgain = () => {
    window.g_app._store.dispatch({
      type: 'chooseCourses/again'
    });
  };

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

  updateStep = {
    title: "Update",
    description: "Please update the status of your previous courses.",
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
      content: <Result
        status="success"
        title="Successfully Chosen Your Courses!"
        subTitle={<span>You can view the courses you choose in
          <Link to={"/track-your-courses"}>Track Your Courses</Link>.
        </span>}
        extra={[
          <Link to={"/dashboard"} key={"backHome"}>
            <Button type={"primary"}>
              Back Home
            </Button>
          </Link>,
          <Button key={"chooseAgain"} onClick={this.handleChooseAgain}>Choose Again</Button>,
        ]}
      />,
    },
  ];

  render() {
    let steps = (this.props.chooseCourses.needChangeStatus)? [this.updateStep, ...this.normalSteps]:this.normalSteps;

    return <main>
              <PageHeader title={"Choose Your Courses"} ghost={false}>
                Please select your course from the options we offer.
              </PageHeader>
              <div className={styles.chooseCoursesContent}>
                <Card>
                  <Steps current={this.props.chooseCourses.currentStep}>
                    {steps.map(item => (
                      <Steps.Step key={item.title} title={item.title} description={item.description}/>)
                    )}
                  </Steps>
                  <div>{steps[this.props.chooseCourses.currentStep].content}</div>
                </Card>
              </div>
            </main>
  }
}

export default connect(({chooseCourses, loading}) =>
  ({chooseCourses, loading: loading.models.chooseCourses}))(Form.create({ name: 'course' })(ChooseCourses));
