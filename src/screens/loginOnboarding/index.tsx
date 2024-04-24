import {SetStateAction} from "react";
import {Image, Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {ContinueButton, Description, Header, normalize, windowHeight, windowWidth} from "@shared";
import {MotiView} from "moti";

const LoginOnboardingScreen = ({setIsOnboarding, setIsLogin} :{setIsOnboarding: React.Dispatch<SetStateAction<boolean>>, setIsLogin: React.Dispatch<SetStateAction<boolean>>}) => {
    return <SafeAreaView style={{
        flex: 1,
        backgroundColor: '#FBF7F0',
        justifyContent: 'space-between',
        paddingVertical: 24,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 12 : 0
    }}>
        <Image
            source={require('../../../assets/loginOnboardingImage.png')}
            style={{
                width: '100%',
                height: '100%',
                maxHeight: windowHeight*0.5,
                maxWidth: windowWidth*0.98,
                padding: 5,
                borderRadius: 20,
                alignSelf: 'center',
                backgroundColor: '#FBF7F0'
            }}
        />
        <View style={{
            justifyContent: 'space-between',
            marginHorizontal: normalize(28),
            marginTop: normalize(44),
            flexGrow: 1
        }}>
            <View style={{
                gap: normalize(16)
            }}>
                <MotiView>
                    <Header>
                        Грай, обмінюйся,
                        насолоджуйся!
                    </Header>
                </MotiView>
                <MotiView>
                    <Description>
                        Грай, обмінюйся, насолоджуйся! Грай, обмінюйся, насолоджуйся! Грай, обмінюйся, насолоджуйся!
                    </Description>
                </MotiView>
            </View>
            <View style={{
                gap: 24
            }}>
                <ContinueButton onPress={()=>{
                    setIsOnboarding(false);
                    setIsLogin(false);
                }} >
                    Зареєструватись
                </ContinueButton>
                <View style={{
                    flexDirection: 'row',
                    alignItems:'center',
                    gap: 14
                }}>
                    <Description fontSize={normalize(20)}>
                        Вже є акаунт?
                    </Description>
                    <TouchableOpacity onPress={()=>{
                        setIsOnboarding(false);
                        setIsLogin(true);
                    }}>
                        <Text style={{
                            fontFamily: 'Cera-Pro-Bold',
                            textDecorationLine: 'underline',
                            color: '#32207A',
                            fontSize: normalize(20)
                        }}>
                            Тицьни сюди
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>;
}

export default LoginOnboardingScreen;
