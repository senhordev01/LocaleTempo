import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Lua from "../assets/lua.png";

export default function Home(){
    const[tema, setTema]=useState("white");

    function Tema_Escuro(){
        setTema("black");   
    }
    
    function Tema_Claro(){
        setTema("white");
    }
    
    return(
        <>
            <View style={{backgroundColor:tema, flex:1}}>
                <View style={estilo.NavBar}>
                {/* <Button onPress={Tema_Escuro} title="Tema Escuro"></Button> */}
                    {tema === "white"?(
                        <TouchableOpacity onPress={Tema_Escuro} style={estilo.Botao}>
                            <Text style={estilo.Texto}>Tema Escuro</Text>
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity onPress={Tema_Claro} style={estilo.Botao}>
                            <Text style={estilo.Texto}>Tema Claro</Text>
                        </TouchableOpacity>
                    )}
                    {/* <Image source={Lua} style={{width:40, height:40}} /> */}
                </View>
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