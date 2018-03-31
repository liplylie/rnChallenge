import { StackNavigator } from 'react-navigation'
import Deleted from './views/Deleted'

const routeConfig = {
  Deleted: { screen: Deleted },
}

const stackNavigatorConfig = {
  initialRouteName: 'Deleted'
}
export const DeletedNavigator = StackNavigator(routeConfig,stackNavigatorConfig)