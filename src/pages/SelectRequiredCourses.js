import React from 'react';
import {Form, Button, Checkbox} from "antd";
import styles from "./ChooseCourses.css"
import {connect} from "dva";

class SelectRequiredCourses extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let requiredCoursesSelected =
          this.props.chooseCourses.requiredCourseOptions.filter(e => values[e.value]).map(e => ({courseId: e.value}));
        console.log(requiredCoursesSelected);
        window.g_app._store.dispatch({
          type: 'chooseCourses/selectRequiredCourses',
          payload: { requiredCoursesSelected }
        });
      }
    });
  };
  
  prev = () => {
    window.g_app._store.dispatch({
      type: 'chooseCourses/prevStep'
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return <Form className={styles.coursesForm} colon={false} hideRequiredMark={true}
                 labelAlign={"left"} onSubmit={this.handleSubmit}>
      {this.props.chooseCourses.requiredCourseOptions.map((e,i,arr)=>
        <Form.Item {...this.props.formItemLayout} label={e.label} key={i}>
          {getFieldDecorator(e.value, {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox/>)}
        </Form.Item>)}
      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: (this.props.chooseCourses.needChangeStatus)? {span: 18, offset: 6}:{ span: 8, offset: 16 },
        }}
      >
        {(this.props.chooseCourses.needChangeStatus)?
          <Button onClick={this.prev} style={{marginRight: "80px"}}>
            Previous
          </Button>:null}
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  }
}

export default connect(({chooseCourses, loading}) =>
  ({chooseCourses,
    loading: loading.effects}))(Form.create({ name: 'requiredCoursesSelected' })(SelectRequiredCourses));
