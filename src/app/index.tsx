import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 🎉</Text>
      <Text style={styles.email}>Logged in as: {user?.email}</Text>
      <TouchableOpacity style={styles.btn} onPress={signOut}>
        <Text style={styles.btnText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold' },
  email: { fontSize: 16, color: '#555' },
  btn: { backgroundColor: '#d00', height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});