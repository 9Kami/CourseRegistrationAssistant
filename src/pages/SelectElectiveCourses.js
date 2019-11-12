import React from 'react';
import {Cascader, Form, Button, Icon, message} from "antd";
import styles from "./ChooseCourse.css"
import {connect} from "dva";

let id = 0;

class SelectElectiveCourses extends React.Component {
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, electiveCourses } = values;
        const data = keys.map(key => electiveCourses[key]);
        if(this.dataValidation(data)){
          console.log('Merged values:', data);
          window.g_app._store.dispatch({
            type: 'chooseCourse/nextStep'
          });
        }
      }
    });
  };

  dataValidation(data){
    let stringData = data.map((e)=>e.toString());
    for(let i = 0; i < stringData.length; i++){
      let curr = stringData[i];
      let array = stringData.slice(0);
      array.splice(i,1);
      if(array.indexOf(curr) !== -1){
        message.error('Do not choose a repeating course!');
        return false;
      }
    }
    return true;
  }

  prev = () => {
    window.g_app._store.dispatch({
      type: 'chooseCourse/prevStep'
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 18, offset: 6 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Elective Courses' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`electiveCourses[${k}]`, {
          validateTrigger: ['onChange'],
          rules: [
            {
              required: true,
              message: "Please select a course or delete this field.",
            },
          ],
        })(<Cascader style={{ width: '60%', marginRight: 8 }} options={this.props.chooseCourse.electiveCourseOptions}/>)}
          <Icon
            className={styles.deleteField}
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
      </Form.Item>
    ));

    return <Form onSubmit={this.handleSubmit} className={styles.statusForm}>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add a Course
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button onClick={this.prev} style={{marginRight: "80px"}}>
            Previous
          </Button>
          <Button type="primary" htmlType="submit">
            Done
          </Button>
        </Form.Item>
      </Form>
  }
}

export default connect(({chooseCourse, loading}) =>
  ({chooseCourse, loading: loading.models.chooseCourse}))(Form.create({ name: 'electiveCoursesSelected' })(SelectElectiveCourses));
