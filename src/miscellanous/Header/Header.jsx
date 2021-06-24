import {HEADERS,PATHS} from '../../strings';
import { useHistory } from 'react-router';
import { Image, Space } from 'antd';
import './Header.css';
import logo from '../../assets/favicon-32x32.png';

const Header = (props) => 
{
  const history = useHistory();
  let content;

  switch(props.type)
  {
    case 'Home':
        content = 
        <div className='header'>
            <Space size='large'>
                <Image src={logo} width='100%' height='110%' style={{cursor:'pointer'}} preview={false} onClick={() => history.push(PATHS.HOMEPAGE)}/>
                {HEADERS[0]}
            </Space>
        </div>
        break;
    case 'Login':
        content =
        <div className='header'>
            <Space size='large'>
                <Image src={logo} width='100%' height='110%' style={{cursor:'pointer'}} preview={false} onClick={() => history.push(PATHS.HOMEPAGE)}/>
                {HEADERS[1]}
            </Space>
        </div>
        break;
    case 'Panel':
        content =         
        <div className='header'>
            <Space size='large'>
                <Image src={logo} width='100%' height='110%' style={{cursor:'pointer'}} preview={false} onClick={() => history.push(PATHS.EMPLOYEES)}/>
                {HEADERS[2]}
            </Space>
        </div>
        break;
    default:
        break;
  }

  return content;

}

export default Header;