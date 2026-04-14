import { View, TextInput, StyleSheet, Button } from "react-native";

export default function Cadastro(){
    return(
        <View style={estilo.container}>
            <TextInput placeholder="Digite seu Nome..." style={estilo.borda}/>
            <TextInput placeholder="Digite seu Email..." keyboardType="email-address" style={estilo.borda} />
            <TextInput placeholder="Confirme seu Email..." keyboardType="email-address" style={estilo.borda}/>
            <TextInput placeholder="Digite sua Senha..." secureTextEntry={true} style={estilo.borda}/>
            <TextInput placeholder="Confirme sua Senha..." secureTextEntry={true} style={estilo.borda}/>
            <Button title="Cadastre-se" style={estilo.Botao}></Button>
        </View>
    );
}

const estilo = StyleSheet.create({
    borda:{
        borderBottomWidth:4,
        borderColor:"white",
        textAlign:"center",
        height:40,
        color:"white",
        width:300,
        textDecorationLine: "none",
        
    },
    container:{
        backgroundColor:"red",
        width:500,
        height:400,
        borderRadius:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        gap:20
    },
    Botao:{
        width:200,
        height:500
    }
})