import { View} from 'react-native';
import Cadastro from './Cadastro';
import Home from './Pagina_Inicial';

export default function App() {
  return (
    <View style={{flex:1}}>
      {/* <Cadastro/> */}
      <Home/>
    </View>
  );
}