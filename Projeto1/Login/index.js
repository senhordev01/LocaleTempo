import {KeyboardAvoidingView,Platform,ScrollView,StyleSheet,View,TextInput,TouchableOpacity,Text,Modal} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function Login() {

    const { navigate } = useNavigation();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [erro, setErro] = useState("");
    const [janelaModal, setModal] = useState(false);

    async function login() {
        try {
            if (!email || !senha) {
                setErro("Preencha email e senha");
                setModal(true);
                return;
            }

            const API = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            });

            const data = await API.json();

            if (!API.ok) {
                setErro(data.message || "Senha ou Email incorretos");
                setModal(true);
                return;
            }

            
            console.log("Login feito:", data);

            navigate("Inicio");

        } catch (error) {
            setErro("Erro de conexão com o servidor");
            setModal(true);
        }
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ backgroundColor: "#e9eaecde", flex: 1 }}>

                        <View style={estilo.container}>
                            <View style={estilo.Corpo_Elemento}>

                                <TextInput
                                    keyboardType="email-address"
                                    placeholder="Digite seu email..."
                                    style={estilo.Input}
                                    value={email}
                                    onChangeText={setEmail}
                                />

                                <TextInput
                                    placeholder="Digite sua senha..."
                                    secureTextEntry
                                    style={estilo.Input}
                                    value={senha}
                                    onChangeText={setSenha}
                                />

                                <TouchableOpacity onPress={() => navigate("Cadastro")}>
                                    <Text style={estilo.Texto_Marcado}>Cadastrar-se</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={login}>
                                    <Text style={estilo.Botao_Login}>Entrar</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* JANELA DE ERRO */}
            <Modal
                visible={janelaModal}
                transparent
                animationType="fade"
                onRequestClose={() => setModal(false)}
            >
                <View style={modalStyles.fundo}>
                    <View style={modalStyles.caixa}>

                        <Text style={{ color: "red", fontSize: 16, marginBottom: 20 }}>
                            {erro}
                        </Text>

                        <TouchableOpacity onPress={() => setModal(false)}>
                            <Text style={modalStyles.botaoFechar}>Fechar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },

    Corpo_Elemento: {
        backgroundColor: "white",
        width: 600,
        height: 400,
        marginTop: 150,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },

    Input: {
        width: 300,
        height: 50,
        borderRadius: 10,
        textAlign: "center",
        borderColor: "black",
        borderWidth: 2,
        marginBottom: 10
    },

    Botao_Login: {
        backgroundColor: "blue",
        width: 300,
        height: 40,
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        borderRadius: 20,
        textAlign: "center",
        marginTop: 10
    },

    Texto_Marcado: {
        color: "#0c9dc2",
        fontWeight: "bold",
        textAlign: "center",
        margin: 20
    }
});

const modalStyles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },

    caixa: {
        width: 300,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center"
    },

    botaoFechar: {
        backgroundColor: "red",
        color: "white",
        padding: 10,
        borderRadius: 10,
        width: 100,
        textAlign: "center"
    }
});