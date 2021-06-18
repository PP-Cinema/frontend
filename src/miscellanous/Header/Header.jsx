import {HEADERS} from '../../strings';
import './Header.css';

const Header = (props) => 
{

  let content;

  switch(props.type)
  {
    case 'Home':
        content = <div className='header'>{HEADERS[0]}</div>
        break;
    case 'Login':
        content = <div  className='header'> {HEADERS[1]}</div>
        break;
    case 'Panel':
        content = <div className='header'> {HEADERS[2]}</div>
        break;
    default:
        break;
  }

  return content;

}

export default Header;