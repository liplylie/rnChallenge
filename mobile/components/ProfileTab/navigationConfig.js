import { StackNavigator } from 'react-navigation'
import Profile from './views/Profile'

const routeConfig = {
  Profile: { screen: Profile },
}

const stackNavigatorConfig = {
  initialRouteName: 'Profile'
}
export const ProfileNavigator = StackNavigator(routeConfig,stackNavigatorConfig)
