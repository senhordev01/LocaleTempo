import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform,KeyboardAvoidingView,ScrollView,TextInput  } from "react-native";
import Lua from "../assets/lua.png";

export default function Home(){
    const[tema, setTema]=useState("white");

    function Tema_Escuro(){
        setTema("black");   
    }
    
    function Tema_Claro(){
        setTema("white");
    }
    async function Clima(){
        let cidade ="" ;
        const chave_api = "99eb985ea7ca0048c019b69d24536cda";

        const buscar_cidade = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${chave_api}`)
        let dados_cidade = await buscar_cidade.json();
        let latitude = dados_cidade[0].lat;
        let longitude =  dados_cidade[0].lon;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave_api}&units=metric&lang=pt_br`;
        let resposta = await fetch(url);
        let dados_finais = await resposta.json();


    }
    async function Cep(){}
    return(
        <>  
            <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios"?"padding":"height"}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={{backgroundColor:tema, flex:1}}>
                        <View style={estilo.NavBar}>
                        {/* <Button onPress={Tema_Escuro} title="Tema Escuro"></Button> */}
                            {tema === "white"?(
                                <TouchableOpacity onPress={Tema_Escuro} style={estilo.Botao}>
                                    <Image source={Lua} style={{width:40, height:40}} />
                                </TouchableOpacity>
                            ):(
                                <TouchableOpacity onPress={Tema_Claro} style={estilo.Botao}>
                                    <Text style={estilo.Texto}>Tema Claro</Text>
                                </TouchableOpacity>
                            )}
                            {/* <Image source={Lua} style={{width:40, height:40}} /> */}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View>
                <TextInput keyboardType="text"/>
                <TouchableOpacity>Clima</TouchableOpacity>
            </View>
        </>
    );
}

const estilo = StyleSheet.create({
    NavBar:{
        position:"absolute",
        left:0,
        top:0,
        backgroundColor:"blue",
        width:"100%",
        height:80,
        flex:1

    },
    Botao:{
        width:200,
        height:70,
        backgroundColor:"red",
        borderRadius:50,
        alignSelf:"flex-end",
        marginTop:5
        
    },
    Texto:{
        color:"white",
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center",
        margin:13
    }
});