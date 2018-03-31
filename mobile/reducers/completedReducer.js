import { CompletedNavigator } from '../components/CompletedTab/navigationConfig'
import { NavigationActions } from 'react-navigation';

const CompletedReducer = (state, action) => {
  return CompletedNavigator.router.getStateForAction(action, state);
}

export default CompletedReducer; 