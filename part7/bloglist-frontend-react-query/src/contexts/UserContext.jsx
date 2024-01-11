import { createContext, useReducer } from 'react';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, {});

  return <UserContext.Provider value={[user, userDispatch]}>{props.children}</UserContext.Provider>;
};

export default UserContext;
