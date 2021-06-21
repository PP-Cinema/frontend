import {HEADERS,PATHS} from '../../strings';
import { useHistory } from 'react-router';
import './Header.css';


const Header = (props) => 
{
  const history = useHistory();
  let content;

  switch(props.type)
  {
    case 'Home':
        content = <div className='header' onClick={() => history.push(PATHS.HOMEPAGE)}>{HEADERS[0]}</div>
        break;
    case 'Login':
        content = <div  className='header'> {HEADERS[1]}</div>
        break;
    case 'Panel':
        content = <div className='header' onClick={() => history.push(PATHS.EMPLOYEES)}> {HEADERS[2]}</div>
        break;
    default:
        break;
  }

  return content;

}

export default Header;