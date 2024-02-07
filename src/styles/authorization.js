import {StyleSheet} from "react-native";
import {normalize, windowWidth} from "../helpers";

export const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        backgroundColor: "#e3aeff",
        justifyContent: 'space-between',
    },
    authContainer: {
        width: '100%',
        height: 600,
        paddingTop: 20,
        alignItems: 'center',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        gap: normalize(5),
        backgroundColor: '#9e44cb',
    },
    logoContainer: {
        width: '100%',
        maxHeight: '35%',
        paddingVertical: 32,
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoTextContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    logoText:{
        color: '#4f2279',
        fontSize: 38,
        fontWeight: "600",
    },
    logoIcon:{
        color: '#4f2279',
        margin: 0,
        padding: 0,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "500",
    },
    subHeaderText: {
        fontSize: 18,
        marginBottom: 15,
    },
    emailInput: {
        backgroundColor: '#b593d9',
        color: '#0d0117',
        borderRadius: 10,
        width: '100%',
        padding: 10,
        borderColor: '#f11'
    },
    continueButton: {
        alignSelf:'center',
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 25,
        width: normalize(520),
        maxWidth: windowWidth*0.85,
        backgroundColor: '#367dc7'
    },
    continueButtonText: {
        color: '#eeeeee',
        fontSize: 18,
        fontWeight: '700'
    },
    otherWayButton: {
        borderWidth: 1,
        marginTop: 20,
        borderColor: '#d0d3da',
        borderRadius: 25,
        width: 320,
        paddingVertical: 10,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    footerText: {
        color: '#271346',
        textAlign: 'center',
        zIndex: 5,
        paddingBottom: 5,
    }
})
