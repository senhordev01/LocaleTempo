import { useState } from "react";
import {StyleSheet,View,Text,TouchableOpacity,Image,Platform,KeyboardAvoidingView,ScrollView,TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Lua from "../assets/Lua_PixelArt.png";
import Sol from "../assets/Sol_PixelArt.png";
import Lupa from "../assets/Lupa.png";
import Logout from "../assets/Logout.png";
import Lupa_Branca from "../assets/Lupa_Branca.png"

export default function Inicio() {
  const [tema, setTema] = useState("#e9eaecde");
  const [temperatura, setTemperatura] = useState("");
  const [cep, setCep] = useState("");
  const [Buscarcep, setBuscarCep] = useState("");
  const [cidade, setCidade] = useState("");

  const {navigate} = useNavigation();


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

        const cidadeFormatada = cidade.trim();
        const chave_api = "58f396d2f5f7da19ca6303194e4b5dbc";


        const buscar_cidade = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cidadeFormatada}&limit=1&appid=${chave_api}`
        );

        let dados_cidade = await buscar_cidade.json();

        if (!dados_cidade || dados_cidade.length === 0) {
            setTemperatura("Cidade não encontrada");
            return;
        }

        let latitude = dados_cidade[0].lat;
        let longitude = dados_cidade[0].lon;

        let resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${chave_api}&units=metric&lang=pt_br`
        );

        let dados_finais = await resposta.json();

        if (!dados_finais.main) {
            setTemperatura("Erro ao obter temperatura");
        return;
        }

        setTemperatura(`🌡️ Temperatura: ${dados_finais.main.temp} °C`);
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

      let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      let data = await resposta.json();

      if (data.erro) {
        setBuscarCep("CEP não encontrado");
        return;
      }

      setBuscarCep(
        `${data.localidade} - ${data.uf}\n${data.logradouro}\n${data.bairro}`
      );

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
        <View style={{ backgroundColor: tema, flex: 1 }}>

         {/* NAVBAR */}
          <View style={estilo.NavBar}> 

            {/* Logout */}            
            
            {/* <TouchableOpacity onPress={()=>navigate("Cadastro")}> */}
            <TouchableOpacity onPress={()=>navigate("Login")}>
              <Image source={Logout} style={estilo.Imagem_Logout} />
            </TouchableOpacity>

            {/* Tema */}
            <TouchableOpacity onPress={tema === "#e9eaecde" ? Tema_Escuro : Tema_Claro}>
              <Image
                source={tema === "#e9eaecde" ? Lua : Sol}
                style={tema === "#e9eaecde" ? estilo.Imagem_Lua : estilo.Imagem_Sol}
              />
            </TouchableOpacity>
           
            
          </View>
          {/* CORPO PRINCIPAL */}
          <View style={estilo.container}> 

            {/* Clima */}
            <View style={[estilo.bloco, estilo.Corpo_Elemento,{
              backgroundColor: tema === "#e9eaecde" ? "white": "#1F1F1F"
            }]}> 
                <View style={{marginBottom:40}}>
                    <Text style={{fontSize:50, fontWeight:"bold", color: tema === "#e9eaecde"?"#1F1F1F":"white"}}>Busque sua Cidade</Text>
                </View>
                
                <TextInput
                    placeholder="Digite o nome da cidade..."
                    onChangeText={(valor) => setCidade(valor)}
                    style={[estilo.input, {
                        color: tema === "#e9eaecde" ? "black":"white",
                        borderColor: tema === "#e9eaecde" ? "black":"white"
                      }
                    ]}
                />

                <TouchableOpacity onPress={Clima}>
                    <Image source={tema === "#e9eaecde" ? Lupa : Lupa_Branca} style={estilo.lupa} />
                </TouchableOpacity>

                <Text style={{color:tema === "#e9eaecde" ? "black" : "white", marginTop:50, fontSize:20}}>{temperatura}</Text>
            </View>


            {/* CEP */}
            <View style={[estilo.bloco, estilo.Corpo_Elemento,{
              backgroundColor: tema === "#e9eaecde" ? "white": "#1F1F1F"
            }]}> 

              <View style={{marginBottom:40}}>
                    <Text style={{fontSize:50, fontWeight:"bold", color: tema === "#e9eaecde"?"#1F1F1F":"white"}}>Busque seu CEP</Text>
              </View>
              <TextInput
                placeholder="Digite o CEP..."
                keyboardType="numeric"
                onChangeText={(valor) => setCep(valor)}
                style={[estilo.input, {
                    color: tema === "#e9eaecde" ? "black":"white",
                    borderColor: tema === "#e9eaecde" ? "black":"white"
                  }
                ]}
              />

              <TouchableOpacity onPress={Cep}>
                    <Image source={tema === "#e9eaecde" ? Lupa : Lupa_Branca} style={estilo.lupa} />
              </TouchableOpacity>

              <Text style={{color:tema === "#e9eaecde" ? "black" : "white", marginTop:50, fontSize:20}}>{Buscarcep}</Text>
            </View>

          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilo = StyleSheet.create({
  NavBar: {
    backgroundColor: "blue",
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },

  container: {
    flex: 1,
    marginTop: 120,
    alignItems: "center"
  },

  bloco: {
    alignItems: "center",
    marginBottom: 30
  },

  input: {
    borderWidth: 2,
    width: 350,
    height: 80,
    textAlign: "center",
    marginBottom: 10,
    borderRadius: 20
  },

  lupa: {
    width: 40,
    height: 40,
    position:"absolute",
    left:200,
    bottom:30
  },

  Imagem_Lua: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  Imagem_Sol: {
    width: 60,
    height: 50,
    resizeMode: "contain"
  },

  Imagem_Logout: {
    width: 40,
    height: 40,
    resizeMode: "contain"
  },
  Corpo_Elemento:{
    backgroundColor:"white",
    width:600,
    height:400,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"flex-start",
    paddingTop:20,
    marginBottom:200,
  }
});