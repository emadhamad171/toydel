import Modal from "react-native-modal";
import {Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BackHandler } from 'react-native';
import {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";

function WrapperComponent({ItemModal, setModal, modalName}) {
    const navigation = useNavigation();
    useEffect(() => {
            const onClickBack = () => {
                try {
                    if(Object.is(ItemModal, null)){
                        navigation.canGoBack() ? navigation.goBack() : BackHandler.exitApp();
                    }else {
                        setModal(null);
                        BackHandler.removeEventListener('hardwareBackPress', onClickBack);
                    }

                } catch (e) {
                    console.log(e);
                }
                return true;
            }
            BackHandler.addEventListener('hardwareBackPress', onClickBack);
    }, [ItemModal]);

    return (
        <Modal propagateSwipe style={{padding: 0, margin: 0, flex:1}}  animationInTiming={600} animationOutTiming={500} animationOut={'slideOutDown'} coverScreen={false} backdropOpacity={0} isVisible={!!ItemModal} onBackdropPress={() => setModal(null)}>
            <View style={{backgroundColor: '#fff',borderRadius:0,paddingHorizontal:10,paddingTop:20, width:"100%", height: '100%'}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity style={{backgroundColor:'#ccc',borderRadius:50,width:40,height:40,alignItems:'center',justifyContent:'center', marginRight: 32}} onPress={()=>setModal(null)}>
                        <Icon name={'chevron-left'} size={32} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 24}}>{modalName}</Text>
                </View>
                {!!ItemModal && <ItemModal />}
            </View>
        </Modal>
    );
}
export default WrapperComponent;
