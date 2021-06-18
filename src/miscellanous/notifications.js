import {notification} from 'antd';

export const displayNotification = (type,title,description) => {
  notification[type]({
    message: title,
    description: description,
    placement: 'bottomLeft'
  });
};