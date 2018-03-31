import { HomeNavigator } from '../components/HomeTab/navigationConfig'
import { NavigationActions } from 'react-navigation';

const HomeReducer = (state, action) => {
  return HomeNavigator.router.getStateForAction(action, state);
}

export default HomeReducer; 