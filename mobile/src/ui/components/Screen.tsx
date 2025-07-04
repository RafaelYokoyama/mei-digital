import { PropsWithChildren } from 'react'
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native'
import { Box, BoxProps } from './Box'

type ScreenProps = PropsWithChildren &
  BoxProps & {
    scrollable?: boolean
    style?: ViewStyle
  }

export function Screen({
  children,
  scrollable = false,
  style,
  ...boxProps
}: ScreenProps) {
  const Container = scrollable ? ScrollView : View

  return (
    <Box
      flex={1}
      backgroundColor='background'
      {...boxProps}
      style={[styles.container, style]}
    >
      <Container style={styles.content}>{children}</Container>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  }
})
