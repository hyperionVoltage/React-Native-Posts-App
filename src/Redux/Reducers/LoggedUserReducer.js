const initialState = {
  loggedIn: false,
  user: {token: '', userId: '', email: ''},
};

const LoggedUserReducer = (state = initialState, action) => {
  let nextState = {};
  switch (action.type) {
    case 'LOGIN':
      nextState = {
        loggedIn: true,
        user: {
          token: action.payload.token,
          userId: action.payload.user_id,
          email: action.payload.email,
        },
      };
      break;

    case 'LOGOUT':
      nextState = initialState;
      break;

    default:
      nextState = state;
  }
  return nextState;
};

export default LoggedUserReducer;
