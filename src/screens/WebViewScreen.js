import React, { Component } from 'react'
import {
  WebView,
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from 'react-native'
import { Footer } from 'native-base'
import { Icon } from 'react-native-elements'
import Share from 'react-native-share'
import { ViewContainer, BookmarkIcon } from '../components'
import { colors } from '../config'

class WebViewScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasPrevious: false,
      hasNext: false,
    }
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut()
  }

  onNavigationStateChange(event) {
    this.setState({
      hasPrevious: event.canGoBack,
      hasNext: event.canGoForward,
    })
  }

  render() {
    const { title, source_url } = this.props.navigation.state.params
    const { hasPrevious, hasNext } = this.state

    return (
      <ViewContainer noPadding>
        <WebView
          ref={ref => { this.webview = ref }}
          source={{ uri: source_url }}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
        <Footer style={styles.footer}>
          <View style={styles.footerLeft}>
            <TouchableOpacity
              style={{ width: 45 }}
              onPress={() => this.webview.goBack()}
            >
              <Icon
                type="font-awesome"
                name='arrow-left'
                size={13}
                color={hasPrevious ? colors.primaryBlue : colors.fontLightGray}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 45 }}
              onPress={() => this.webview.goForward()}
            >
              <Icon
                type="font-awesome"
                name='arrow-right'
                size={13}
                color={hasNext ? colors.primaryBlue : colors.fontLightGray}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.footerRight}>
            <View style={styles.rightButtonsContainer}>
              <TouchableOpacity
                onPress={() => Share.open({
                    source_url,
                    message: title,
                    title,
                    subject: '【1D News】ニュースの共有'
                  })
                  .catch(err => console.log(err))
                }
                style={styles.footerShareIcon}
              >
                <Icon
                  type="entypo"
                  name='share-alternative'
                  size={20}
                />
              </TouchableOpacity>
              <BookmarkIcon containerStyle={styles.bookmarkIcon} />
            </View>
          </View>
        </Footer>
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  // FIXME: shadow効かせる
  footer: {
    height: 40,
    backgroundColor: '#FFF',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  footerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  footerShareIcon: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 30,
  },
  bookmarkIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20
  },
})

export default WebViewScreen
