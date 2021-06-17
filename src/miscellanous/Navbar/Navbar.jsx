import React from 'react';
import { Menu } from 'antd';
import './Navbar.css';

const HOME_KEYS = 
[
    {key:"performances", value:"Seanse"},
    {key:"news", value:"Newsy"},
    {key:"movies", value:"Filmy"},
    {key:"reservations", value:"Rezerwacje"}
];


const Navbar = (props) =>
{
    let content;

    switch(props.type)
    {
        case 'Home':
            const menuList = HOME_KEYS.map((hk) => <Menu.Item key={hk.key}>{hk.value}</Menu.Item>)
            content = 
            <Menu className = "navbar-menu" selectedKeys ={'1'} mode ="horizontal" theme="dark">
                {menuList}
            </Menu>
            break;
        case 'Admin':
            break;
        case 'Employee':
            break;
        default:
            break;
    }


    return content;
}

export default Navbar;