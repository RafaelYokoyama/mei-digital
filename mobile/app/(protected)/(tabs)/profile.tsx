import { useAuth } from '@/src/domain/auth/AuthContext'
import { Box } from '@/src/ui/components/Box'
import { Screen } from '@/src/ui/components/Screen'
import { Text } from '@/src/ui/components/Text'
import { useAppTheme } from '@/src/ui/theme/useAppTheme'
import { useRouter } from 'expo-router'
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  const theme = useAppTheme()
  const { top, bottom } = useSafeAreaInsets()
  const router = useRouter()
  const { user } = useAuth()

  function handleLogout() {
    Alert.alert('Sair', 'Tem certeza que deseja sair do app?', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          router.replace('/sign-in')
        }
      }
    ])
  }

  return (
    <Screen>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: bottom + theme.spacing.padding
        }}
      >
        <Box
          flex={1}
          padding='padding'
          style={{ paddingTop: Math.max(top, 20) }}
        >
          <Text variant='headingLarge' color='text' marginBottom='s32'>
            Perfil
          </Text>

          <Box
            backgroundColor='cardBackground'
            borderRadius='radius'
            padding='padding'
            marginBottom='s24'
            style={styles.card}
          >
            <Text variant='headingMedium' color='text' marginBottom='s8'>
              {user?.name}
            </Text>
            <Text variant='body' color='textSecondary' marginBottom='s16'>
              {user?.email}
            </Text>
            <Text variant='caption' color='textSecondary'>
              ID: {user?.id}
            </Text>
          </Box>

          <Box
            backgroundColor='cardBackground'
            borderRadius='radius'
            padding='padding'
            marginBottom='s24'
            style={styles.card}
          >
            <Text variant='headingSmall' color='text' marginBottom='s16'>
              Como usar o app
            </Text>
            <Box gap='s12'>
              <Text variant='body' color='textSecondary'>
                1. Navegue pelos serviços disponíveis na tela inicial
              </Text>
              <Text variant='body' color='textSecondary'>
                2. Clique em Contratar no serviço desejado
              </Text>
              <Text variant='body' color='textSecondary'>
                3. Preencha o formulário com seus dados
              </Text>
              <Text variant='body' color='textSecondary'>
                4. Os dados serão impressos no console para demonstração
              </Text>
            </Box>
          </Box>

          <Box flex={1} justifyContent='flex-end'>
            <TouchableOpacity
              onPress={handleLogout}
              style={[
                styles.logoutButton,
                {
                  backgroundColor: theme.colors.fieryRed,
                  marginBottom: Math.max(bottom, 16)
                }
              ]}
            >
              <Text variant='buttonText' color='buttonText'>
                Sair do App
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  card: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84
  },
  logoutButton: {
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
