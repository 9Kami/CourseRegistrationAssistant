import React from 'react';
import {Cascader, Form, Button, Alert} from "antd";
import styles from "./ChooseCourses.css";
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
          type: 'chooseCourses/update'
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return <main>
      <Form className={styles.coursesForm} colon={false} hideRequiredMark={true}
            labelAlign={"left"} onSubmit={this.handleSubmit}>
        <Alert message="After submitting, the status of the non-processing courses can not be changed."
               type="info" showIcon />
               <br/>
        {this.props.chooseCourses.previousCourses.map((e,i,arr)=>
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
    </main>
  }
}

export default connect(({chooseCourses, loading}) =>
  ({chooseCourses, loading: loading.models.chooseCourses}))(Form.create({ name: 'updateStatus' })(UpdateStatus));
