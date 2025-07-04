import { useAuth } from '@/src/domain/auth/AuthContext'
import { useAuthSignIn } from '@/src/domain/auth/operations/useAuthSignIn'
import { Box } from '@/src/ui/components/Box'
import { Screen } from '@/src/ui/components/Screen'
import { Text } from '@/src/ui/components/Text'
import { useAppTheme } from '@/src/ui/theme/useAppTheme'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SignInScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { mutate: signIn, isLoading } = useAuthSignIn()
  const theme = useAppTheme()
  const { top, bottom } = useSafeAreaInsets()
  const { setUser } = useAuth()

  function validateFields() {
    let isValid = true

    if (!email.trim()) {
      setEmailError('Email é obrigatório')
      isValid = false
    } else {
      setEmailError('')
    }

    if (!password.trim()) {
      setPasswordError('Senha é obrigatória')
      isValid = false
    } else {
      setPasswordError('')
    }

    return isValid
  }

  async function handleSignIn() {
    if (validateFields()) {
      try {
        const user = await signIn({
          email: email.trim(),
          password: password.trim()
        })
        if (user) {
          setUser(user)
          router.replace('../(protected)/(tabs)' as any)
        } else {
          setEmailError('Email ou senha inválidos')
        }
      } catch (error) {
        if (error instanceof Error) {
          setEmailError(error.message)
        } else {
          setEmailError('Erro ao fazer login')
        }
      }
    }
  }

  const isFormValid = email.trim() !== '' && password.trim() !== ''

  return (
    <Screen style={styles.screen} paddingHorizontal='padding'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Box
          flex={1}
          justifyContent='center'
          style={{
            paddingTop: Math.max(top, 20),
            paddingBottom: Math.max(bottom, 20)
          }}
        >
          <Text
            variant='headingLarge'
            color='text'
            textAlign='center'
            marginBottom='s24'
          >
            Serviços App
          </Text>

          <Text
            variant='body'
            color='textSecondary'
            textAlign='center'
            marginBottom='s32'
          >
            Entre com um dos emails disponíveis
          </Text>

          {emailError ? (
            <Box
              backgroundColor='error'
              padding='padding'
              borderRadius='radius'
              marginBottom='s24'
            >
              <Text variant='body' color='buttonText' textAlign='center'>
                {emailError}
              </Text>
            </Box>
          ) : null}

          <Box marginBottom='s24'>
            <Text variant='body' color='text' marginBottom='s8'>
              Email
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: emailError
                    ? theme.colors.error
                    : theme.colors.border,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.cardBackground
                }
              ]}
              value={email}
              onChangeText={(text) => {
                setEmail(text)
                setEmailError('')
              }}
              placeholder='Digite seu email'
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType='email-address'
              autoCapitalize='none'
              autoComplete='email'
              editable={!isLoading}
            />
          </Box>

          <Box marginBottom='s32'>
            <Text variant='body' color='text' marginBottom='s8'>
              Senha
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: passwordError
                    ? theme.colors.error
                    : theme.colors.border,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.cardBackground
                }
              ]}
              value={password}
              onChangeText={(text) => {
                setPassword(text)
                setPasswordError('')
              }}
              placeholder='Digite sua senha'
              placeholderTextColor={theme.colors.textSecondary}
              secureTextEntry
              autoComplete='password'
              editable={!isLoading}
            />
          </Box>

          <TouchableOpacity
            onPress={handleSignIn}
            disabled={isLoading || !isFormValid}
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.primary,
                opacity: !isFormValid ? 0.5 : 1
              }
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.colors.buttonText} />
            ) : (
              <Text variant='buttonText' color='buttonText'>
                Entrar
              </Text>
            )}
          </TouchableOpacity>

          <Box marginTop='s24'>
            <Text variant='caption' color='textSecondary' textAlign='center'>
              💡 Dica: Use e-mail:
            </Text>
            <Text variant='caption' color='textSecondary' textAlign='center'>
              admin@test.com / user@test.com
            </Text>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'PoppinsRegular'
  },
  button: {
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
