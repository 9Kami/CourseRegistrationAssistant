import React from 'react';
import {Cascader, Form, Button} from "antd";
import styles from "./ChooseCourse.css"
import {connect} from "dva";

class UpdateStatus extends React.Component {
  statusOptions = [
    {
      label: "In process",
      value: "In process"
    },
    {
      label: "Passed",
      value: "Passed",
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
      value: "Failed"
    },
    {
      label: "Dropped",
      value: "Dropped"
    },
  ];

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        window.g_app._store.dispatch({
          type: 'chooseCourse/nextStep'
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return <Form className={styles.statusForm} colon={false} hideRequiredMark={true}
                 labelAlign={"left"} onSubmit={this.handleSubmit}>
      {this.props.chooseCourse.previousCourses.map((e,i,arr)=>
        <Form.Item {...this.props.formItemLayout} label={e.courseName} key={i}>
          {getFieldDecorator(e.courseID, {
            rules: [
              {
                required: true,
                message: 'Please select the status for this course!',
              },
            ],
            initialValue: ["In process"]
          })(<Cascader options={this.statusOptions} allowClear={false}/>)}
        </Form.Item>)}
      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 8, offset: 16 },
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  }
}

export default connect(({chooseCourse, loading}) =>
  ({chooseCourse, loading: loading.models.chooseCourse}))(Form.create({ name: 'updateStatus' })(UpdateStatus));
