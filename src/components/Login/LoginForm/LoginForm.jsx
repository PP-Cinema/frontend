import {Form,Input,Button} from 'antd';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../contexts';
import { PATHS } from '../../../strings';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

const initialValues =
{
    login: "",
    password: ""
}


const LoginForm = () =>
{
    const {signIn} = useContext(UserContext);
    const history = useHistory();
    const onFinish = async values =>
    {
        console.log(values);
        console.log(signIn);
        console.log(values.login);

        if(await signIn(values.login,values.password))
        {
            history.push(PATHS.EMPLOYEE_PANEL);
        }
    }


    return(
    <Form {...layout} onFinish={onFinish} initialValues={{login:initialValues.login,password:initialValues.password}} className="form-layout" name="basic">
        <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
        <Input id="login"/>
        </Form.Item>
        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input.Password id="password"/>
        </Form.Item>
        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
    );
}

export default LoginForm;