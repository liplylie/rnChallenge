import { StackNavigator } from 'react-navigation'
import NotCompleted from './views/NotCompleted'

const routeConfig = {
  NotCompleted: { screen: NotCompleted },
}

const stackNavigatorConfig = {
  initialRouteName: 'NotCompleted'
}
export const NotCompletedNavigator = StackNavigator(routeConfig,stackNavigatorConfig)