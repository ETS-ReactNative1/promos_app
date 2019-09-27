import React from 'react'
// import { Linking, Share } from 'react-native'
import moment from 'moment'
import 'moment/locale/fr'
import I18n from '../utils/i18n'
import { constants } from '../utils/constants'

export const formatDateYy = function(d) {
    try {
        if (d) {
            if (d.indexOf('0000') >= 0) {
                return ''
            }
            d = d.split(' ')[0]
            moment.locale('en')
            const r = moment(d).format('DD/MM/YY')
            // return moment(new Date(d)).format('DD/MM/YY')
            // console.log(r)
            return r
        } else {
            return d
        }
    } catch (error) {
        console.warn(error)
        return d
    }
}

export const bottomReached = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
}) => {
    const paddingToBottom = 20
    return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    )
}

// export const openUrl = url => {
//     Linking.openURL(url).catch(err => {
//         throw err
//     })
// }

// export const shareContent = (title, message, url, dialogTitle) => {
//     try {
//         Share.share(
//             { title, message, url },
//             {
//                 dialogTitle,
//             },
//         )
//     } catch (error) {}
// }
