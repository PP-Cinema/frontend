import React, {useContext, /*useState*/} from 'react';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import { UserContext } from '../../contexts';
import { useHistory, useLocation } from 'react-router-dom';
import './Navbar.css';
import { HOME_KEYS,EMPLOYEE_MODES, PATHS, PANEL_TYPES } from '../../strings';

const {SubMenu} = Menu;

const Navbar = (props) =>
{
    const location = useLocation();
    const {signOut} = useContext(UserContext);
    const history = useHistory();
    let content;

    const onClick = async values =>
    {
        if(values.key === "sign-out")
        {
            signOut();
            return history.push(PATHS.HOMEPAGE);
        }
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
                <Menu className = "navbar-menu" onClick={onClick} selectedKeys ={HOME_KEYS.find(({path}) => path===location.pathname) ? 
                HOME_KEYS.find(({path}) => path===location.pathname).key 
                 : location.pathname===PATHS.HOMEPAGE ? HOME_KEYS[0].key : ''} mode ="horizontal" theme="dark">
                    {menuList}
                </Menu>
            );
            break;
        case 'Admin':
            const adminMenu =[];
            PANEL_TYPES.forEach((pt) => {
                const typeList = EMPLOYEE_MODES.filter(({type}) => type===pt.key);
                const finalList = typeList.map((tl) => <Menu.Item key={tl.key}>{tl.value}</Menu.Item>)
                adminMenu.push(<SubMenu key={pt.key} title={pt.name} onTitleClick={() => pt.defaultPath ? history.push(pt.defaultPath) :''}>
                    {finalList}
                </SubMenu>)
            })
            content =
            (
                <Menu className = "navbar-menu" onClick={onClick} selectedKeys = {EMPLOYEE_MODES.find(({path}) => path===location.pathname) ? 
                EMPLOYEE_MODES.find(({path}) => path===location.pathname).key 
                : ''
                } 
                mode ="horizontal" theme="dark">
                    {adminMenu}
                    <Menu.Item key="sign-out" icon={<LogoutOutlined/>}>Sign out</Menu.Item>
                </Menu>
            );
            break;
        case 'Employee':
            const employeeMenu =[];
            PANEL_TYPES.forEach((pt) => {
                if(pt.key === 'Employee')
                    return;
                const typeList = EMPLOYEE_MODES.filter(({type}) => type===pt.key);
                const finalList = typeList.map((tl) => tl.role==='Employee' ? <Menu.Item key={tl.key}>{tl.value}</Menu.Item> : '');
                employeeMenu.push(<SubMenu key={pt.key} title={pt.name} onTitleClick={() => pt.defaultPath ? history.push(pt.defaultPath) :''}>
                    {finalList}
                </SubMenu>)
            })
            content =
            (
                <Menu className = "navbar-menu" onClick={onClick} selectedKeys = {EMPLOYEE_MODES.find(({path}) => path===location.pathname) ? 
                EMPLOYEE_MODES.find(({path}) => path===location.pathname).key 
                : ''
                } 
                mode ="horizontal" theme="dark">
                    {employeeMenu}
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