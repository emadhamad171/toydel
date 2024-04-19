import {SetStateAction} from "react";
import {Image, Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {windowHeight, windowWidth} from "@shared";
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
            marginHorizontal: 20,
            marginTop: 32,
            flexGrow: 1
        }}>
            <View style={{
                gap: 14
            }}>
                <MotiView>
                    <Text style={{
                        fontSize: 28,
                        fontFamily: 'Cera-Pro-Bold',
                        lineHeight: 34
                    }}>
                        Грай, обмінюйся,
                        насолоджуйся!
                    </Text>
                </MotiView>
                <MotiView>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'Manrope',
                        color: '#2D2D30'
                    }}>
                        Грай, обмінюйся, насолоджуйся! Грай, обмінюйся, насолоджуйся! Грай, обмінюйся, насолоджуйся!
                    </Text>
                </MotiView>
            </View>
            <View style={{
                gap: 24
            }}>
                <TouchableOpacity style={{
                    backgroundColor: '#7065EB',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 16,
                }}
                                  onPress={()=>{
                                      setIsOnboarding(false);
                                      setIsLogin(false);
                                  }}>
                    <Text style={{
                        textTransform: 'uppercase',
                        fontFamily: 'Cera-Pro-Black',
                        letterSpacing: .3,
                        fontSize: 14,
                        color: '#FBF7F0'
                    }}>
                        Зареєструватись
                    </Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    gap: 14
                }}>
                    <Text style={{
                        fontFamily: 'Cera-Pro',
                        color: '#2d2d30'
                    }}>
                        Вже є акаунт?
                    </Text>
                    <TouchableOpacity onPress={()=>{
                        setIsOnboarding(false);
                        setIsLogin(true);
                    }}>
                        <Text style={{
                            fontFamily: 'Cera-Pro-Bold',
                            textDecorationLine: 'underline',
                            color: '#32207A'
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
