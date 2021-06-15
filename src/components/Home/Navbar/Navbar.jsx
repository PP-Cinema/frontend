import React from 'react';
import { Menu } from 'antd';
import './Navbar.css';


const Navbar = () =>
{
    return(
            <Menu className = "navbar-menu" selectedKeys ={'1'} mode ="horizontal" theme="dark">
                <Menu.Item key="performance">
                    Seanse
                </Menu.Item>
                <Menu.Item key="news">
                    Newsy
                </Menu.Item>
                <Menu.Item key="movie">
                    Filmy
                </Menu.Item>
                <Menu.Item key="reservation">
                    Rezerwacje
                </Menu.Item>
            </Menu>
    );
}

export default Navbar;