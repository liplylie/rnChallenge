import { TabNavigator } from 'react-navigation'
import HomeNav from '../HomeTab/views/HomeNav'
import ProfileNav from '../ProfileTab/views/ProfileNav'
import CompletedNav from '../CompletedTab/views/CompletedNav'
import NotCompletedNav from '../NotCompletedTab/views/NotCompletedNav'
import DeletedNav from '../DeletedTab/views/DeletedNav'

var routeConfig = {
  HomeNav: { screen: HomeNav },
  CompletedNav: { screen: CompletedNav },
  NotCompletedNav: { screen: NotCompletedNav },
  DeletedNav: { screen: DeletedNav },
  ProfileNav: {screen: ProfileNav },
}

var tabBarConfig = {
  initialRouteName: 'HomeNav', 
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'blue',
    activeBackgroundColor: 'skyblue',
    inactiveBackgroundColor: 'lavender',
    labelStyle: {
      fontSize: .001,
      padding: 5
    }
  }
}

export const TabBarNavigator = TabNavigator(routeConfig,tabBarConfig)