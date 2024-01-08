import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        backgroundColor: "#e3aeff",
        justifyContent: 'space-between',
        zIndex: 2,
    },
    authContainer: {
        width: '100%',
        height: '65%',
        paddingTop: 20,
        alignItems: 'center',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        gap: 5,
        backgroundColor: '#9e44cb',
    },
    logoContainer: {
        marginVertical: 'auto',
        width: '100%',
        height: '35%',
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
        zIndex: 5,
    },
    logoIcon:{
        color: '#4f2279',
        margin: 0,
        padding: 0,
        zIndex: 5,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "500",
    },
    subHeaderText: {
        fontSize: 18,
        marginBottom: 15,
    },
    continueButton: {
        alignSelf:'center',
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 25,
        width: '100%',
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
