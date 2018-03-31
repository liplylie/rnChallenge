import { StackNavigator } from 'react-navigation'
import Completed from './views/Completed'

const routeConfig = {
  Completed: { screen: Completed },
}

const stackNavigatorConfig = {
  initialRouteName: 'Completed'
}
export const CompletedNavigator = StackNavigator(routeConfig,stackNavigatorConfig)