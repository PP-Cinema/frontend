import React from 'react';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import './Navbar.css';
import { HOME_KEYS, ADMIN_MODES, EMPLOYEE_MODES } from '../../strings';


const Navbar = (props) =>
{
    let content;

    switch(props.type)
    {
        case 'Home':
            const menuList = HOME_KEYS.map((hk) => <Menu.Item key={hk.key}>{hk.value}</Menu.Item>)
            content = 
            (
                <Menu className = "navbar-menu" selectedKeys ={'1'} mode ="horizontal" theme="dark">
                    {menuList}
                </Menu>
            );
            break;
        case 'Admin':
            const adminList = ADMIN_MODES.map((am)=> <Menu.Item key={am.key}>{am.value}</Menu.Item>);
            const aEmployeeList = EMPLOYEE_MODES.map((em)=> <Menu.Item key={em.key}>{em.value}</Menu.Item>);
            content =
            (
                <Menu className = "navbar-menu" selectedKeys ={'1'} mode ="horizontal" theme="dark">
                    {adminList}
                    {aEmployeeList}
                    <Menu.Item key="sign-out" icon={<LogoutOutlined/>}>Sign out</Menu.Item>
                </Menu>
            );
            break;
        case 'Employee':
            const employeeList = EMPLOYEE_MODES.map((em)=> <Menu.Item key={em.key}>{em.value}</Menu.Item>);
            content =
            (
                <Menu className = "navbar-menu" selectedKeys ={'1'} mode ="horizontal" theme="dark">
                    {employeeList}
                    <Menu.Item key="sign-out" icon={<LogoutOutlined/>}>Sign out</Menu.Item>
                </Menu>
            );
            break;
        default:
            break;
    }

    return content;
}

export default Navbar;