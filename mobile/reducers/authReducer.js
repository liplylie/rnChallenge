import { AuthNavigator } from '../components/Auth/navigationConfig'
import { NavigationActions } from 'react-navigation';

const AuthReducer = (state, action) => {
  return AuthNavigator.router.getStateForAction(action, state);
}

export default AuthReducer; 