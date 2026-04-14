import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Home(){
    const[tema, setTema]=useState("white")

    function Tema_Escuro(){
        setTema("black");
    }
    return(
        <>
            <View style={{backgroundColor:tema, flex:1}}>
                <View style={estilo.NavBar}></View>
                {/* <Button onPress={Tema_Escuro} title="Tema Escuro"></Button> */}
                <TouchableOpacity onPress={Tema_Escuro} style={estilo.Botao}>
                    <Text>Tema Escuro</Text>
                </TouchableOpacity>
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
        height:80
    },
    Botao:{
        width:100,
        height:50,
        backgroundColor:"red"
    }
});