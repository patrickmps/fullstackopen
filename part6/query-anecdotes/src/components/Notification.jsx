import { useContext, useEffect } from 'react';
import NotificationContext from '../contexts/NotificationContext';

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  return notification.message && <div style={style}>{notification.message}</div>;
};

export default Notification;
