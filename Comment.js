/**
 * Created by tino on 6/6/17.
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'
import TimeAgo from 'react-native-timeago'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import Collapsible from 'react-native-collapsible'
import * as Animatable from 'react-native-animatable'

export default class Comment extends Component {

  constructor (props) {
    super(props)
    this.bookmark = null
    this.props = props
  }

  smallImage () {
    if (this.props.child) {
      return {width: 30, height: 30, borderRadius: 30}
    }
    return {}
  }

  render () {
    return (
      <View style={styles.commentContainer}>
        <View style={styles.left}>
          <TouchableHighlight onPress={() => this.props.usernameTapAction(this.props.username)}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={[styles.image, this.smallImage()]}
                source={{uri: this.props.image}}/>
              {this.props.likes.length ? <TouchableHighlight style={[styles.actionButton, {paddingTop: 5}]}
                                                             onPress={() =>
                                                               this.props.likesTapAction()}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name={'heart'} color={'#df1740'} size={15}/>
                  <Text style={styles.likeNr}> {this.props.likes.length}</Text>
                </View>
              </TouchableHighlight> : null}
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.right}>
          <View style={styles.rightContent}>
            <View style={styles.rightContentTop}>
              <TouchableHighlight onPress={() => this.props.usernameTapAction(this.props.username)}>
                <Text style={styles.name}>{this.props.username}</Text>
              </TouchableHighlight>

              {this.props.canEdit?<TouchableHighlight
                style={styles.editIcon}
                onPress={() => this.props.editComment()}>
                <Icon name={'edit'} size={15}/>
              </TouchableHighlight>:null}
            </View>
            <Text style={styles.body}>{this.props.body}</Text>
          </View>
          <View style={styles.rightActionBar}>
            <TimeAgo style={styles.time} time={this.props.updatedAt}/>
            <TouchableHighlight style={styles.actionButton}
                                onPress={() => this.props.likeAction()}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.actionText, {color: this.props.liked ? '#4DB2DF' : null}]}>Like </Text>

              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.actionButton} onPress={() => this.props.replyAction()}>
              <Text style={styles.actionText}>Reply</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.actionButton} onPress={() => this.props.reportAction()}>
              {this.props.reported ? <Text style={{fontStyle: 'italic', fontSize: 11,}}>Reported</Text>
                : <Text style={styles.actionText}>Report</Text>}
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}
