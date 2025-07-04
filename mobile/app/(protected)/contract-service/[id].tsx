import { useServiceFindById } from '@/src/domain/service/operations/useServiceFindById'
import { Box } from '@/src/ui/components/Box'
import { Screen } from '@/src/ui/components/Screen'
import { Text } from '@/src/ui/components/Text'
import { useAppTheme } from '@/src/ui/theme/useAppTheme'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as yup from 'yup'

interface ContractForm {
  fullName: string
  email: string
  phone: string
}

const schema = yup.object().shape({
  fullName: yup.string().required('Nome completo é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  phone: yup.string().required('Telefone é obrigatório')
})

export default function ContractServiceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: service, isLoading } = useServiceFindById(id)
  const theme = useAppTheme()
  const { top, bottom } = useSafeAreaInsets()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ContractForm>({
    resolver: yupResolver(schema)
  })

  function onSubmit(data: ContractForm) {
    console.log('=== DADOS DO FORMULÁRIO ===')
    console.log('Serviço:', service?.name)
    console.log('Nome completo:', data.fullName)
    console.log('Email:', data.email)
    console.log('Telefone:', data.phone)
    console.log('==========================')

    Alert.alert(
      'Contratação Enviada!',
      `Olá ${data.fullName}! Sua solicitação para contratar "${service?.name}" foi enviada com sucesso. Entraremos em contato em breve.`,
      [
        {
          text: 'OK',
          onPress: () => router.back()
        }
      ]
    )
  }

  if (isLoading) {
    return (
      <Screen>
        <Box flex={1} justifyContent='center' alignItems='center'>
          <Text variant='headingMedium' color='text'>
            Carregando...
          </Text>
        </Box>
      </Screen>
    )
  }

  if (!service) {
    return (
      <Screen>
        <Box flex={1} justifyContent='center' alignItems='center'>
          <Text variant='headingMedium' color='text'>
            Serviço não encontrado
          </Text>
        </Box>
      </Screen>
    )
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
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
              Contratar Serviço
            </Text>

            <Box
              backgroundColor='cardBackground'
              borderRadius='radius'
              padding='padding'
              marginBottom='s32'
              style={styles.card}
            >
              <Text variant='headingMedium' color='text' marginBottom='s8'>
                {service.name}
              </Text>
              <Text variant='body' color='textSecondary' marginBottom='s16'>
                {service.provider}
              </Text>
              <Text variant='headingSmall' color='primary'>
                R$ {service.price.toLocaleString('pt-BR')}
              </Text>
            </Box>

            <Text variant='headingMedium' color='text' marginBottom='s24'>
              Dados para Contratação
            </Text>

            <Box flex={1}>
              <Controller
                control={control}
                name='fullName'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Box marginBottom='s24'>
                    <Text variant='body' color='text' marginBottom='s8'>
                      Nome Completo *
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          borderColor: errors.fullName
                            ? theme.colors.error
                            : theme.colors.border,
                          color: theme.colors.text,
                          backgroundColor: theme.colors.cardBackground
                        }
                      ]}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder='Digite seu nome completo'
                      placeholderTextColor={theme.colors.textSecondary}
                    />
                    {errors.fullName && (
                      <Text variant='caption' color='error' marginTop='s4'>
                        {errors.fullName.message}
                      </Text>
                    )}
                  </Box>
                )}
              />

              <Controller
                control={control}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Box marginBottom='s24'>
                    <Text variant='body' color='text' marginBottom='s8'>
                      Email *
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          borderColor: errors.email
                            ? theme.colors.error
                            : theme.colors.border,
                          color: theme.colors.text,
                          backgroundColor: theme.colors.cardBackground
                        }
                      ]}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder='Digite seu email'
                      placeholderTextColor={theme.colors.textSecondary}
                      keyboardType='email-address'
                      autoCapitalize='none'
                      autoComplete='email'
                    />
                    {errors.email && (
                      <Text variant='caption' color='error' marginTop='s4'>
                        {errors.email.message}
                      </Text>
                    )}
                  </Box>
                )}
              />

              <Controller
                control={control}
                name='phone'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Box marginBottom='s32'>
                    <Text variant='body' color='text' marginBottom='s8'>
                      Telefone *
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          borderColor: errors.phone
                            ? theme.colors.error
                            : theme.colors.border,
                          color: theme.colors.text,
                          backgroundColor: theme.colors.cardBackground
                        }
                      ]}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder='Digite seu telefone'
                      placeholderTextColor={theme.colors.textSecondary}
                      keyboardType='phone-pad'
                    />
                    {errors.phone && (
                      <Text variant='caption' color='error' marginTop='s4'>
                        {errors.phone.message}
                      </Text>
                    )}
                  </Box>
                )}
              />
            </Box>

            <Box gap='s16'>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={[
                  styles.button,
                  { backgroundColor: theme.colors.primary }
                ]}
              >
                <Text variant='buttonText' color='buttonText'>
                  Enviar Solicitação
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.back()}
                style={[
                  styles.button,
                  {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: theme.colors.border
                  }
                ]}
              >
                <Text variant='buttonText' color='text'>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
