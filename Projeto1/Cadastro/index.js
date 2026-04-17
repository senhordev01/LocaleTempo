import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function Cadastro() {
    const { navigate } = useNavigation();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [confirmar_email, setConfirmar_Email] = useState("");
    const [senha, setSenha] = useState("");
    const [Confirmar_senha, setConfirmar_Senha] = useState("");

    const [erro, setErro] = useState("");
    const [janelaModal, setModal] = useState(false);

    async function cadastro() {
        try {
            if (!nome || !email || !confirmar_email || !senha || !Confirmar_senha) {
                setErro("Não pode deixar campos vazios");
                setModal(true);
                return;
            }

            if (email !== confirmar_email) {
                setErro("Emails não coincidem");
                setModal(true);
                return;
            }

            if (senha !== Confirmar_senha) {
                setErro("Senhas não coincidem");
                setModal(true);
                return;
            }

            const response = await fetch("http://localhost:8000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setErro(data.message || "Erro ao cadastrar");
                setModal(true);
                return;
            }

            console.log("Cadastrado:", data);

            navigate("Inicio");

        } catch (erro) {
            console.log("ERRO:", erro);
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
                                    placeholder="Digite seu nome..."
                                    style={estilo.Input}
                                    value={nome}
                                    onChangeText={setNome}
                                />

                                <TextInput
                                    placeholder="Digite seu email..."
                                    keyboardType="email-address"
                                    style={estilo.Input}
                                    value={email}
                                    onChangeText={setEmail}
                                />

                                <TextInput
                                    placeholder="Confirme seu email..."
                                    keyboardType="email-address"
                                    style={estilo.Input}
                                    value={confirmar_email}
                                    onChangeText={setConfirmar_Email}
                                />

                                <TextInput
                                    placeholder="Digite sua senha..."
                                    secureTextEntry
                                    style={estilo.Input}
                                    value={senha}
                                    onChangeText={setSenha}
                                />

                                <TextInput
                                    placeholder="Confirme sua senha..."
                                    secureTextEntry
                                    style={estilo.Input}
                                    value={Confirmar_senha}
                                    onChangeText={setConfirmar_Senha}
                                />

                                <TouchableOpacity onPress={() => navigate("Login")}>
                                    <Text style={estilo.Texto_Marcado}>
                                        Faça seu Login
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={cadastro}>
                                    <Text style={estilo.Botao_Cadastro}>
                                        Cadastrar-se
                                    </Text>
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

                        <Text style={{ color: "red", marginBottom: 20 }}>
                            {erro}
                        </Text>

                        <TouchableOpacity onPress={() => setModal(false)}>
                            <Text style={modalStyles.botaoFechar}>
                                Fechar
                            </Text>
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
        height: 450,
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

    Botao_Cadastro: {
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