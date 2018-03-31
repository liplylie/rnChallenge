import { StackNavigator } from 'react-navigation'
import Home from './views/Home'

const routeConfig = {
  Home: { screen: Home },
}

const stackNavigatorConfig = {
  initialRouteName: 'Home'
}
export const HomeNavigator = StackNavigator(routeConfig,stackNavigatorConfig)