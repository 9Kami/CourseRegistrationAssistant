import React from 'react';
import {Form, Button, Checkbox} from "antd";
import styles from "./ChooseCourses.css"
import {connect} from "dva";

class SelectMajorCourses extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        let majorCoursesSelected = this.props.chooseCourses.majorCourseOptions.filter(e => values[e.courseID]);
        console.log(majorCoursesSelected);
        window.g_app._store.dispatch({
          type: 'chooseCourses/nextStep'
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return <Form className={styles.coursesForm} colon={false} hideRequiredMark={true}
                 labelAlign={"left"} onSubmit={this.handleSubmit}>
      {this.props.chooseCourses.majorCourseOptions.map((e,i,arr)=>
        <Form.Item {...this.props.formItemLayout} label={e.courseName} key={i}>
          {getFieldDecorator(e.courseID, {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox/>)}
        </Form.Item>)}
      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 8, offset: 16 },
        }}
      >
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  }
}

export default connect(({chooseCourses, loading}) =>
  ({chooseCourses,
    loading: loading.models.chooseCourses}))(Form.create({ name: 'majorCoursesSelected' })(SelectMajorCourses));
