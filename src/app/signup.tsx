import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, ScrollView, Platform,
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(null);
    setSuccess(null);
    if (!email || !password || !confirm) return setError('Fill in all fields');
    if (password.length < 6) return setError('Password must be 6+ characters');
    if (password !== confirm) return setError('Passwords do not match');

    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);

    if (error) setError(error);
    else setSuccess('Account created. Check your email to confirm.');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />

        {error && <Text style={styles.error}>{error}</Text>}
        {success && <Text style={styles.success}>{success}</Text>}

        <TouchableOpacity
          style={[styles.btn, loading && { opacity: 0.5 }]}
          onPress={submit}
          disabled={loading}
        >
          <Text style={styles.btnText}>{loading ? 'Creating…' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <Link href="/login" style={styles.link}>
          Already have an account? Log in
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, gap: 12 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  btn: { backgroundColor: '#007AFF', height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  error: { color: '#d00', fontSize: 14 },
  success: { color: '#080', fontSize: 14 },
  link: { textAlign: 'center', color: '#007AFF', marginTop: 12 },
});