import { NotCompletedNavigator } from '../components/NotCompletedTab/navigationConfig'
import { NavigationActions } from 'react-navigation';

const NotCompletedReducer = (state, action) => {
  return NotCompletedNavigator.router.getStateForAction(action, state);
}

export default NotCompletedReducer; 