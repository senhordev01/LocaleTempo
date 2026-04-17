import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Cadastro(){
    const {navigate} = useNavigation();
    return(
        <>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{backgroundColor:"#e9eaecde", flex:1}}>
                        {/* CORPO PRINCIPAL */}
                        <View style={estilo.container}>
                            <View style={estilo.Corpo_Elemento}>
                                 {/* Login */}
                                <View>
                                    <TextInput placeholder="Digite seu nome..."  style={estilo.Input}/>
                                    <TextInput placeholder="Digite seu email..." keyboardType="email-address" style={estilo.Input}/>
                                    <TextInput placeholder="Confirme seu email..." keyboardType="email-address"  style={estilo.Input}/>
                                    <TextInput placeholder="Digite sua Senha..." secureTextEntry={true} style={estilo.Input}/>
                                    <TextInput placeholder="Confirme sua Senha..." secureTextEntry={true} style={estilo.Input}/>
                                    <TouchableOpacity>
                                        <Text onPress={()=>navigate('Login')} style={estilo.Texto_Marcado}>Faça seu Login</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={estilo.Botao_Login}>Entrar</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}
const estilo = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center"
    },

    Corpo_Elemento:{
        backgroundColor:"white",
        width:600,
        height:400,
        marginTop:150,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center"
    },
    Input:{
        width:300,
        height:50,
        borderRadius:10,
        textAlign:"center",
        borderColor:"black",
        borderWidth:2
    },
    Botao_Login:{
        backgroundColor:"blue",
        width:300,
        height:40,
        color:"white",
        fontWeight:"bold",
        fontSize:20,
        borderRadius:20,
        textAlign:"center"
    },
    Texto_Marcado:{
        color:"#0c9dc2",
        fontWeight:"bold",
        textAlign:"center",
        margin:20
    }
})