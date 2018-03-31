import { TabBarNavigator } from '../components/TabBar/navigationConfig'
import { NavigationActions } from 'react-navigation';

const TabBarReducer = (state , action) => {
  return TabBarNavigator.router.getStateForAction(action, state);
}

export default TabBarReducer; 
