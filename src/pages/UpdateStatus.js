import React from 'react';
import {Cascader, Form, Button} from "antd";
import styles from "./ChooseCourses.css";
import {connect} from "dva";

class UpdateStatus extends React.Component {
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const updateData = {
          courses: this.props.chooseCourses.previousCourses.map(e => ((values[e.courseID][0] === 2)?
            {courseId: e.courseID, op:values[e.courseID][0], letterGrade:values[e.courseID][1] }:
            {courseId: e.courseID, op:values[e.courseID][0] }))
        };
        console.log(updateData);
        window.g_app._store.dispatch({
          type: 'chooseCourses/update',
          payload: {
            updateData
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return <main>
      <Form className={styles.coursesForm} colon={false} hideRequiredMark={true}
            labelAlign={"left"} onSubmit={this.handleSubmit}>
        {this.props.chooseCourses.previousCourses.map((e,i,arr)=>
          <Form.Item {...this.props.formItemLayout} label={e.courseName} key={i}>
            {getFieldDecorator(e.courseID, {
              rules: [
                {
                  required: true,
                  message: 'Please select the status for this course!',
                },
              ],
              initialValue: [1]
            })(<Cascader options={this.statusOptions} allowClear={false}/>)}
          </Form.Item>)}
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 8, offset: 16 },
          }}
        >
          <Button type="primary" htmlType="submit" loading={this.props.loading['chooseCourses/getCourseOptions']}>
            Next
          </Button>
        </Form.Item>
      </Form>
    </main>
  }
}

export default connect(({chooseCourses, loading}) =>
  ({chooseCourses, loading: loading.effects}))(Form.create({ name: 'updateStatus' })(UpdateStatus));
