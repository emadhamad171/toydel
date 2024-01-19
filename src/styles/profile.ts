import {StyleSheet} from "react-native";

const profileStyles = StyleSheet.create({
    userPhoto: {
        borderRadius: 50,
        width: 100,
        height: 100,
        resizeMode: 'stretch'
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600'
    },
    baseText: {
        fontSize: 18,
    },
    subText: {
        fontSize: 16,
        fontWeight: '200'
    },
    defaultPlanContainer: {
        alignSelf:'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        marginBottom: 12,
        width: '100%',
        maxWidth: 330,
        borderRadius: 15,
        backgroundColor: '#999'
    },
    defaultPlanSign: {
        backgroundColor: '#ffd22d',
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top:0,
        right: 0,
        borderRadius: 50,
        padding: 5
    },
})
export default profileStyles;
