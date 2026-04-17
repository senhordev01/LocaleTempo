import { View} from 'react-native';
import Cadastro from './Cadastro';
import Inicio from './Pagina_Inicial';
import{NavigationContainer} from "@react-navigation/native";
import{createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from './Login';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <View style={{flex:1}}>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name='Inicio' component={Inicio} options={{headerShown:false}}/>
          <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
          <Stack.Screen name='Cadastro' component={Cadastro} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}