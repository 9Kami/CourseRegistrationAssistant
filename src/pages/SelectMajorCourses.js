import React from 'react';
import {Cascader, Form, Button, Checkbox} from "antd";
import styles from "./ChooseCourse.css"
import {connect} from "dva";

class SelectMajorCourses extends React.Component {
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
                 labelAlign={"left"}  onSubmit={this.handleSubmit}>
      {this.props.chooseCourse.majorCourseOptions.map((e,i,arr)=>
        <Form.Item {...this.props.formItemLayout} label={e.courseName} key={i}>
          {getFieldDecorator(e.courseID, {
            valuePropName: 'checked',
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

export default connect(({chooseCourse, loading}) =>
  ({chooseCourse, loading: loading.models.chooseCourse}))(Form.create({ name: 'majorCoursesSelected' })(SelectMajorCourses));
