import { DeletedNavigator } from '../components/DeletedTab/navigationConfig'
import { NavigationActions } from 'react-navigation';

const DeletedReducer = (state, action) => {
  return DeletedNavigator.router.getStateForAction(action, state);
}

export default DeletedReducer; 