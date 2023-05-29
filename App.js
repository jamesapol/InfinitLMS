import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import { AuthProvider } from './src/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#313131" translucent={true} style='light' />
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}
