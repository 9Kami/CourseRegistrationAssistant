import styles from './Login.css';
import React from 'react';
import {Form, Checkbox, Button, Input, Icon, message} from "antd";
import Link from 'umi/link';
import {request} from "@/server/server";
import router from "umi/router";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false
    };
  }

  handleLoginDown(response) {
    this.setState({loading: false});
    if(response.userId === null) {
      message.error('Username or password is wrong!');
    } else {
      message.success('Successfully logged in', 1, () => router.push('/dashboard'));
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({loading: true});
        request.post('/login', {
          data: {
            userId: values.aNumber,
            password: values.password,
            remember: values.remember
          }
        }).then((response) => {
          console.log(response);
          this.handleLoginDown(response);
        }).catch((error) => {
          console.log(error);
          this.setState({loading: false});
        });
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <main className={styles.login}>
      <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
        <Form.Item>
          {getFieldDecorator('aNumber', {
            rules: [{ required: true, message: 'Please input your A-number!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="A-number"
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
            initialValue: false,
          })(<Checkbox>Remember me</Checkbox>)}
          <Button type="primary" htmlType="submit" className={styles.loginButton} loading={this.state.loading}>
            Log In
          </Button>
          Or <Link to={"/sign-up"}>register now!</Link>
        </Form.Item>
      </Form>
      </main>
    );
  }
}

export default Form.create({ name: 'login' })(Login);
