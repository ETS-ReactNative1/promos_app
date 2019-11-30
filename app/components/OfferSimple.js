import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import Txt from './Txt'

import { connect } from 'react-redux'
import { globalStyles as gs } from '../utils/styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import { colors } from '../utils/constants'
import { fnSetOffer } from '../actions/actions'

class OfferSimple extends React.Component {
    openOffer() {
        this.props.fnSetOffer(this.props.item)
        this.props.navigation.navigate('Offer', {
            viewTitle: this.props.item.name
        })
    }

    render() {
        return (
            <View
                style={{
                    width: Dimensions.get('window').width / 2,
                    marginRight: 15
                }}>
                <TouchableOpacity
                    style={{ width: '100%' }}
                    onPress={() => {
                        this.openOffer()
                    }}>
                    <Image
                        source={{ uri: this.props.item.logoBanner }}
                        resizeMode={'stretch'}
                        style={[gs.mb5, { width: '100%', height: 100 }]}
                    />

                    <Txt style={gs.dfSimpleTitle}>{this.props.item.name}</Txt>
                    <Txt style={gs.dfSimpleSubtitle}>Martes</Txt>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

const mapDispatchToProps = { fnSetOffer }

export default connect(mapStateToProps, mapDispatchToProps)(OfferSimple)
