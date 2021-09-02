import React, {useContext,useEffect} from 'react';
import {Layout,Card, Form, Input, Button, Checkbox} from 'antd';
import { Header,Navbar,Footer } from '../../miscellanous';
import { UserContext } from '../../contexts';
import { Redirect, useHistory } from 'react-router';
import { PATHS, REQUEST_STATUS, EMPLOYEE_MODES } from '../../strings';
import { displayNotification } from '../../miscellanous';
import { UserService } from '../../services';
import '../Panel/Panel.css';

const {Content} = Layout;

const AddEmployee = () =>
{
    const history = useHistory();

    useEffect(() => {
        document.title=process.env.REACT_APP_PANEL_PAGE;
     }, []);

    const onFinish = async values =>
    {
        if(values.password !== values.passwordRepeat)
        {
            displayNotification('error', 'Error', 'Given passwords are not the same');
            return;
        }
        const {status,error} = await UserService.createUser(values.login,values.password,values.isAdmin);
        if(status === REQUEST_STATUS.SUCCESS)
        {
            displayNotification('success','Success','Successfully added new employee');
            history.push(EMPLOYEE_MODES.find(({key}) => key==='view-employees').path);
        }
        else
        {
             displayNotification('error','Error',`Request failure: ${error.response.data.message}`);
             history.push(EMPLOYEE_MODES.find(({key}) => key==='view-employees').path);
        }
    }

    const {accessToken, role} = useContext(UserContext);

    if(!accessToken)
    {
        displayNotification('error', 'Error', 'You have to be logged in as an administrator');
        return <Redirect to={PATHS.HOMEPAGE} />;
    }

    if(role !== "Admin")
    {
        displayNotification('error', 'Error', 'You need admin permissions to manage users');
        return <Redirect to={PATHS.EMPLOYEES} />;
    }
    else
    {
        return(
            <Layout>
                <Header type="Panel"/>
                <Navbar type={role}/>
                <Content className="content-layout">
                    <Card title="Add new employee" style={{width: 500}}>
                        <Form style={{maxWidth: 400, margin: 25}} name="basic" onFinish={onFinish}>
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
                            <Form.Item
                                label="Repeat password"
                                name="passwordRepeat"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                            <Input.Password id="repeat-password"/>
                            </Form.Item>
                            <Form.Item
                                label="Admin rights"
                                name="isAdmin"
                                valuePropName="checked"
                            >
                            <Checkbox style = {{ display:'flex',justifyContent: 'right'}}/>
                            </Form.Item>
                            <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Create Employee
                            </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Content>
                <Footer/>
            </Layout>
        );
    }
}

export default AddEmployee;