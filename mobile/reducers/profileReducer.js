import { ProfileNavigator } from '../components/ProfileTab/navigationConfig'
import { NavigationActions } from 'react-navigation';

const ProfileReducer = (state, action) => {
  return ProfileNavigator.router.getStateForAction(action, state);
}

export default ProfileReducer; 