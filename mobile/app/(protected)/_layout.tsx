import { useAuth } from '@/src/domain/auth/AuthContext'
import { Redirect, Stack } from 'expo-router'

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Redirect href='/sign-in' />
  }

  return (
    <Stack
      screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}
    >
      <Stack.Screen name='(tabs)' />
    </Stack>
  )
}
