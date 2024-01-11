import { useContext } from 'react';
import NotificationContext from '../contexts/NotificationContext';

export const Notification = () => {
  const [notification] = useContext(NotificationContext);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  return notification.message && <div style={style}>{notification.message}</div>;
};
