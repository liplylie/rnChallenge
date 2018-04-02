import { StackNavigator } from 'react-navigation'
import DefaultPage from './views/DefaultPage'
import LogIn from './views/LogIn'
import SignUp from './views/SignUp'
import TabBar from '../App'

const routeConfig = {
  DefaultPage: { screen: DefaultPage },
  // LogIn: { screen: LogIn},
  // SignUp: { screen: SignUp},
  // TabBar: {screen: TabBar}
}

const stackNavigatorConfig = {
  initialRouteName: 'DefaultPage'
}
export const AuthNavigator = StackNavigator(routeConfig,stackNavigatorConfig)