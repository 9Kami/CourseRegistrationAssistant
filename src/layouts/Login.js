import styles from './Login.css';
import React from 'react';
import {Form, Checkbox, Button, Input, Icon, message} from "antd";
import Link from 'umi/link';

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        message.error('Username or password is wrong!');
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <main className={styles.login}>
      <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Button type="primary" htmlType="submit" className={styles.loginButton}>
            Log in
          </Button>
          Or <Link to={"/sign-up"}>register now!</Link>
        </Form.Item>
      </Form>
      </main>
    );
  }
}

export default Form.create({ name: 'login' })(Login);
