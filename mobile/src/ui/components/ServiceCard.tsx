import { ServicePreview } from '@/src/domain/service/Service'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { useAppTheme } from '../theme/useAppTheme'
import { Box } from './Box'
import { Text } from './Text'

interface ServiceCardProps {
  servicePreview: ServicePreview
}

export function ServiceCard({ servicePreview }: ServiceCardProps) {
  const theme = useAppTheme()
  const router = useRouter()

  function handleContract() {
    router.push(`/(protected)/contract-service/${servicePreview.id}`)
  }

  return (
    <Box
      backgroundColor='cardBackground'
      borderRadius='radius'
      padding='padding'
      marginBottom='padding'
    >
      <Text variant='headingSmall' color='text' marginBottom='paddingSmall'>
        {servicePreview.name}
      </Text>

      <Text variant='body' color='textSecondary' marginBottom='paddingSmall'>
        {servicePreview.provider}
      </Text>

      <Text variant='body' color='textSecondary' marginBottom='paddingSmall'>
        Categoria: {servicePreview.category}
      </Text>

      <Box
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Text variant='headingMedium' color='primary'>
          R$ {servicePreview.price.toLocaleString('pt-BR')}
        </Text>

        <TouchableOpacity
          onPress={handleContract}
          style={{
            backgroundColor: theme.colors.primary,
            paddingHorizontal: theme.spacing.padding,
            paddingVertical: theme.spacing.paddingSmall,
            borderRadius: theme.borderRadii.radius
          }}
        >
          <Text variant='buttonText' color='buttonText'>
            Contratar
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
