import React, { Component } from 'react'
import { View, YellowBox, Platform } from 'react-native'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
// import SplashScreen from 'react-native-splash-screen'

YellowBox.ignoreWarnings(['ViewPagerAndroid: ...'])

import { createAppContainer } from 'react-navigation'

import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import I18n from '../utils/i18n'

import HeaderLogo from '../components/HeaderLogo'
import dataReducer from '../reducers/dataReducer'

import Sidebar from '../components/Sidebar'

import Wizard from '../views/Wizard'

import Home from '../views/Home'
import Discover from '../views/Discover'
import Profile from '../views/Profile'

import { colors } from '../utils/constants'
import DefaultFooterTabBar from '../components/DefaultFooterTabBar'
// import Txt from '../components/Txt'
// import TabBarDefault from '../components/TabBarDefault'

const reducer = combineReducers({
    dataReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

const MainStack = createMaterialTopTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarPosition: 'bottom',
                title: 'Home'
            }
        },
        Discover: {
            screen: Discover,
            navigationOptions: {
                tabBarPosition: 'bottom',
                title: 'Discover'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarPosition: 'bottom',
                title: 'Profile'
            }
        }
    },
    {
        initialRouteName: 'Home',
        tabBarComponent: DefaultFooterTabBar,
        tabBarOptions: {
            tabStyle: {
                height: 40
            }
        },
        navigationOptions: {
            swipeEnabled: true,
            header: <HeaderLogo />
        }
    }
)

const SessionStack = createStackNavigator(
    {
        Main: {
            screen: MainStack
        },
        Wizard: {
            screen: Wizard,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'Main'
    }
)

const DrawerNavigator = createDrawerNavigator(
    {
        Session: {
            screen: SessionStack
        }
    },
    {
        initialRouteName: 'Session',
        swipeEnabled: true,
        contentComponent: Sidebar,
        navigationOptions: {
            gesturesEnabled: false
        }
    }
)

const RootStack = (hasSession = false) => {
    return createStackNavigator(
        {
            // Login: {
            //     screen: LoginView,
            //     navigationOptions: {
            //         header: null,
            //         gesturesEnabled: false,
            //     },
            // },
            DrawerNavigator: {
                screen: DrawerNavigator,
                navigationOptions: {
                    header: null,
                    gesturesEnabled: false
                }
            }
        },
        {
            // initialRouteName: hasSession == '1' ? 'DrawerNavigator' : 'Login',
            initialRouteName: 'DrawerNavigator',
            navigationOptions: {
                header: { headerMode: 'screen', visible: false }
            }
        }
    )
}

// const AppContainer = createAppContainer(RootStack(true))

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoaded: true
        }
    }

    componentDidMount() {
        // SplashScreen.hide()
    }

    render() {
        if (this.state.isLoaded) {
            const AppContainer = createAppContainer(RootStack(false))
            return (
                <Provider store={store}>
                    <View style={{ flex: 1 }}>
                        <AppContainer />
                    </View>
                </Provider>
            )
        } else {
            return <View></View>
        }
    }
}
