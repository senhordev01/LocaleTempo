import { useState } from "react";
import {StyleSheet,View,Text,TouchableOpacity,Image,Platform,KeyboardAvoidingView,ScrollView,TextInput,useWindowDimensions} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Lua from "../assets/Lua_PixelArt.png";
import Sol from "../assets/Sol_PixelArt.png";
import Lupa from "../assets/Lupa.png";
import Logout from "../assets/Logout.png";
import Lupa_Branca from "../assets/Lupa_Branca.png";

export default function Inicio() {
  const { width } = useWindowDimensions();
  const Mobile = width < 600;

  const route = useRoute();

  const usuario = route.params?.usuario;

  const [tema, setTema] = useState("#e9eaecde");
  const [temperatura, setTemperatura] = useState("");
  const [cep, setCep] = useState("");
  const [buscarCep, setBuscarCep] = useState("");
  const [cidade, setCidade] = useState("");

  const { navigate } = useNavigation();

  function Tema_Escuro() {
    setTema("black");
  }

  function Tema_Claro() {
    setTema("#e9eaecde");
  }

  async function Clima() {
    try {
      if (!cidade || cidade.trim() === "") {
        setTemperatura("Digite uma Cidade");
        return;
      }

      const chave_api = "58f396d2f5f7da19ca6303194e4b5dbc";

      const buscar_cidade = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${chave_api}`
      );

      const dados_cidade = await buscar_cidade.json();

      if (!dados_cidade.length) {
        setTemperatura("Cidade não encontrada");
        return;
      }

      const { lat, lon } = dados_cidade[0];

      const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chave_api}&units=metric&lang=pt_br`
      );

      const dados = await resposta.json();

      setTemperatura(`Temperatura:  ${dados.main.temp} °C`);
    } catch {
      setTemperatura("Erro ao buscar clima");
    }
  }

  async function Cep() {
    try {
      if (!cep) {
        setBuscarCep("Digite um CEP");
        return;
      }

      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await resposta.json();

      if (data.erro) {
        setBuscarCep("CEP não encontrado");
        return;
      }

      setBuscarCep(`${data.localidade} - ${data.uf} - ${data.logradouro} - ${data.bairro}`);
      setCidade(data.localidade);
    } catch {
      setBuscarCep("Erro ao buscar CEP");
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: tema }}>

          {/* NAVBAR */}
          <SafeAreaView style={styles.navbar}>
            <TouchableOpacity onPress={() => navigate("Login")}>
              <Image source={Logout} style={styles.icon} />
            </TouchableOpacity>

            <Text style={{color:"white", fontSize:20, fontWeight:"bold"}}>Olá, {usuario?.nome || "Usuário"}</Text>

            <TouchableOpacity onPress={tema === "#e9eaecde" ? Tema_Escuro : Tema_Claro}>
              <Image
                source={tema === "#e9eaecde" ? Lua : Sol}
                style={styles.icon}
              />
            </TouchableOpacity>
          </SafeAreaView>

          {/* CONTAINER */}
          <View
            style={[
              styles.container,
              { flexDirection: Mobile ? "column" : "row" }
            ]}
          >

            {/* CLIMA */}
            <View
              style={[
                styles.card,
                {
                  width: Mobile ? "90%" : 400,
                  backgroundColor: tema === "#e9eaecde" ? "white" : "#1F1F1F"
                }
              ]}
            >
              <Text style={[styles.titulo, { color: tema === "#e9eaecde" ? "black" : "white" }]}>
                Insira a Cidade
              </Text>

              <TextInput
                placeholder="Digite a cidade"
                placeholderTextColor="gray"
                onChangeText={setCidade}
                style={[styles.input, {
                  color: tema === "#e9eaecde" ? "black" : "white",
                  borderColor: tema === "#e9eaecde" ? "black" : "white"
                }]}
              />

              <TouchableOpacity onPress={Clima}>
                <Image source={tema === "#e9eaecde" ? Lupa : Lupa_Branca} style={styles.lupa} />
              </TouchableOpacity>

              <Text style={{ color: tema === "#e9eaecde" ? "black" : "white" }}>
                {temperatura}
              </Text>
            </View>

            {/* CEP */}
            <View
              style={[
                styles.card,
                {
                  width: Mobile ? "90%" : 400,
                  backgroundColor: tema === "#e9eaecde" ? "white" : "#1F1F1F"
                }
              ]}
            >
              <Text style={[styles.titulo, { color: tema === "#e9eaecde" ? "black" : "white" }]}>
                Insira o CEP
              </Text>

              <TextInput
                placeholder="Digite o CEP"
                keyboardType="numeric"
                placeholderTextColor="gray"
                onChangeText={setCep}
                style={[styles.input, {
                  color: tema === "#e9eaecde" ? "black" : "white",
                  borderColor: tema === "#e9eaecde" ? "black" : "white"
                }]}
              />

              <TouchableOpacity onPress={Cep}>
                <Image source={tema === "#e9eaecde" ? Lupa : Lupa_Branca} style={styles.lupa} />
              </TouchableOpacity>

              <Text style={{ color: tema === "#e9eaecde" ? "black" : "white" }}>
                {buscarCep}
              </Text>
            </View>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width:"100%",
    height: 100,
    backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  },

  card: {
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 20
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20
  },

  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: "center",
    marginBottom: 10
  },

  lupa: {
    width: 40,
    height: 40,
    marginBottom: 10
  },

  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain"
  }
});