import React, {useContext, useState} from 'react';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import { UserContext } from '../../contexts';
import { useHistory, useLocation } from 'react-router-dom';
import './Navbar.css';
import { HOME_KEYS,EMPLOYEE_MODES, PATHS } from '../../strings';



const Navbar = (props) =>
{
    const location = useLocation();
    const [current, setCurrent] = useState();
    const {signOut} = useContext(UserContext);
    const history = useHistory();
    let content;

    const onClick = async values =>
    {
        if(values.key === "sign-out")
        {
            return signOut();
        }
        setCurrent(values.key);
        switch(props.type)
        {
            case 'Home':
                switch(values.key)
                {
                    case 'performances':
                        history.push(PATHS.PERFORMANCES);
                        break;
                    case 'articles':
                        history.push(PATHS.ARTICLES);
                        break;
                    case 'movies':
                        history.push(PATHS.MOVIES);
                        break;
                    case 'reservations':
                        history.push(PATHS.RESERVATIONS);
                        break;
                    default:
                        history.push(PATHS.HOMEPAGE);
                }
                break;
            case 'Admin':
                history.push(EMPLOYEE_MODES.find(({key}) => key === values.key).path);
                break;
            case 'Employee':
                history.push(EMPLOYEE_MODES.find(({key}) => key === values.key).path);
                break;
            default:
                history.push(PATHS.HOMEPAGE);
        }
    }


    switch(props.type)
    {
        case 'Home':
            const menuList = HOME_KEYS.map((hk) => <Menu.Item key={hk.key}>{hk.value}</Menu.Item>)
            content = 
            (
                <Menu className = "navbar-menu" onClick={onClick} selectedKeys ={current ? current : HOME_KEYS[0].key} mode ="horizontal" theme="dark">
                    {menuList}
                </Menu>
            );
            break;
        case 'Admin':
            const aEmployeeList = EMPLOYEE_MODES.map((em)=> <Menu.Item key={em.key}>{em.value}</Menu.Item>);
            content =
            (
                <Menu className = "navbar-menu" onClick={onClick} selectedKeys = {current} mode ="horizontal" theme="dark">
                    {aEmployeeList}
                    <Menu.Item key="sign-out" icon={<LogoutOutlined/>}>Sign out</Menu.Item>
                </Menu>
            );
            break;
        case 'Employee':
            const employeeList = EMPLOYEE_MODES.map((em)=> em.role === 'Employee' ? <Menu.Item key={em.key}>{em.value}</Menu.Item> : '');
            content =
            (
                <Menu className = "navbar-menu" onClick={onClick} selectedKeys ={current} mode ="horizontal" theme="dark">
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