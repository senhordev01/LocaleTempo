import { View, StatusBar} from 'react-native';
import Cadastro from './Cadastro';
import Inicio from './Pagina_Inicial';

export default function App() {
  return (
    <View style={{flex:1}}>
      {/* <Cadastro/> */}
      <StatusBar style="auto"/>
      <Inicio/>
    </View>
  );
}