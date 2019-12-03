import React from 'react';
import {Button, Card, Cascader, Checkbox, Form, Icon, Input, message, Tabs, Tooltip} from "antd";
import styles from "./Setting.css"
import {connect} from "dva";
import Link from 'umi/link';
import * as Server from "@/server/server";

class Setting extends React.Component {
  callback = (key) => {
    console.log(key);
    window.g_app._store.dispatch({
      type: 'setting/tabKeyChange',
      payload: {
        newTabKey: key
      }
    });
  };
  
  componentDidMount() {
    window.g_app._store.dispatch({
      type: 'setting/initialize',
    });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        window.g_app._store.dispatch({
          type: 'setting/updateUserInfo',
          payload: {
            data: (this.props.setting.currTabKey === 'personalInfo')?
              {
                nickname: values.nickname,
                degree: values.major[0],
                major: values.major[1]
              }:
              {
                oldPassword: values.currentPassword,
                newPassword: values.newPassword
              }
          }
        });
      }
    });
  };
  
  render() {
    const { TabPane } = Tabs;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    
    return <main className={styles.settingMain}>
      <Card>
        <Tabs defaultActiveKey="personalInfo" tabPosition={"left"} onChange={this.callback}>
          <TabPane tab="Personal Information" key="personalInfo">
            {(this.props.setting.currTabKey === 'personalInfo')?
              <Form className={styles.settingForm} {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item
                  label={
                    <span>
                    Nickname&nbsp;
                      <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
                  }
                >
                  {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    initialValue: this.props.setting.nickname
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Select Your Major">
                  {getFieldDecorator('major', {
                    rules: [
                      {
                        required: true,
                        message: 'Please select your major!'
                      }
                    ],
                    initialValue: this.props.setting.major
                  })(
                    <Cascader options={this.props.setting.majorOptions}
                              showSearch={
                                {
                                  filter(inputValue, path) {
                                    return path.some(option =>
                                      option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
                                  }
                                }
                              }
                              placeholder="Please select" />
                  )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" >
                    Update
                  </Button>
                </Form.Item>
              </Form>
              :null}
          </TabPane>
          <TabPane tab="Change Password" key="changePassword">
            {(this.props.setting.currTabKey === 'changePassword')?
              <Form className={styles.settingForm} {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Current Password" hasFeedback>
                  {getFieldDecorator('currentPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your current password!',
                      }
                    ],
                  })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="New Password" hasFeedback>
                  {getFieldDecorator('newPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your new password!',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm New Password" hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your new password!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" >
                    Update
                  </Button>
                </Form.Item>
              </Form>
              :null}
          </TabPane>
        </Tabs>,
      </Card>
    </main>
  }
}

export default Form.create({ name: 'setting' })(connect(({setting, loading}) =>
  ({setting, loading: loading.models.setting}))(Setting));
