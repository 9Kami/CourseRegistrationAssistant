import styles from './Login.css';
import React from 'react';
import {Form, Checkbox, Button, Input, Icon, Tooltip, Cascader, message, Spin, Typography} from "antd";
import router from "umi/router";
import * as Server from "@/server/server";

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
      majorOptions: [],
      majorOptionsLoading: true,
      loading: false
    };
  }
  
  componentDidMount() {
    Server.request.get('/sign-up-major')
      .then((response) => {
      console.log(response);
      if(response.status === Server.SUCCESSFUL){
        this.setState({...this.state, majorOptions:response.degreeMajor});
        this.setState({...this.state, majorOptionsLoading: false});
      } else {
        message.error(response.message);
        this.setState({...this.state, majorOptionsLoading: false});
      }
    }).catch((error) => {
      console.log(error);
      this.setState({...this.state, majorOptionsLoading: false});
    });
  }
  
  handleSignUpDown(response) {
    this.setState({...this.state, loading: false});
    switch(response.status) {
      case Server.SUCCESSFUL:
        message.success('Successfully signed up!', 1, () => router.push('/login'));
        break;
      case Server.FAILED:
        message.error(response.message);
        break;
      case Server.SERVERERROR:
        message.error(response.message);
        break;
      default:
        message.error('Unknown Error!');
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true});
        Server.request.post('/sign-up', {
          data: {
            userId: values.aNumber,
            password: values.password,
            nickname: values.nickname,
            degree: values.major[0],
            major: values.major[1]
          }
        }).then((response) => {
          console.log(response);
          this.handleSignUpDown(response);
        }).catch((error) => {
          console.log(error);
          this.setState({...this.state, loading: false});
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
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
  
    if(this.state.majorOptionsLoading) {
      return <div className={styles.signUpLoading}>
        <Spin size={"large"}/>
      </div>
    }
    
    return (
      <main className={styles.signUp}>
        <div className={styles.logo}>
          <img className={styles.logoImage} src={require("../assets/logo.png")} alt={"logo"} height={'200px'}/>
          <Typography.Title>Course Registration Assistant</Typography.Title>
        </div>
        <Form className={styles.signUpForm} {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="A-number">
            {getFieldDecorator('aNumber', {
              rules: [
                {
                  required: true,
                  message: 'Please input your A-number!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
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
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Select Your Major">
            {getFieldDecorator('major', {
              rules: [
                {
                  required: true,
                  message: 'Please select your major!',
                }
              ],
            })(
              <Cascader options={this.state.majorOptions}
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
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </main>
    );
  }
}

export default Form.create({ name: 'signUp' })(SignUp);
