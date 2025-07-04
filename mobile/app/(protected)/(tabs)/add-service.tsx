import { useServiceCreate } from '@/src/domain/service/operations/useServiceCreate'
import { useServiceFindAll } from '@/src/domain/service/operations/useServiceFindAll'
import { Box } from '@/src/ui/components/Box'
import { Screen } from '@/src/ui/components/Screen'
import { Text } from '@/src/ui/components/Text'
import { useAppTheme } from '@/src/ui/theme/useAppTheme'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'expo-router'
import React, { useEffect, useMemo } from 'react'
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

interface ServiceForm {
  name: string
  description: string
  price: number
  category: string
  provider: string
  duration: string
}

const schema = yup.object().shape({
  name: yup.string().required('Nome do serviço é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
  price: yup
    .number()
    .positive('Preço deve ser positivo')
    .required('Preço é obrigatório'),
  category: yup.string().required('Categoria é obrigatória'),
  provider: yup.string().required('Prestador é obrigatório'),
  duration: yup.string().required('Duração é obrigatória')
})

const defaultValues = {
  name: '',
  description: '',
  price: undefined,
  category: '',
  provider: '',
  duration: ''
}

export default function AddServiceScreen() {
  const theme = useAppTheme()
  const { top, bottom } = useSafeAreaInsets()
  const router = useRouter()
  const { mutate: createService, isLoading } = useServiceCreate()
  const { data: services } = useServiceFindAll()

  const categories = useMemo(() => {
    if (!services) return []
    const uniqueCategories = new Set(
      services.map((service) => service.category)
    )
    return Array.from(uniqueCategories)
  }, [services])

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors
  } = useForm<ServiceForm>({
    resolver: yupResolver(schema),
    defaultValues
  })

  useEffect(() => {
    clearErrors()
    return () => {
      reset(defaultValues)
      clearErrors()
    }
  }, [])

  function onSubmit(data: ServiceForm) {
    createService({
      ...data,
      image: `https://via.placeholder.com/300x200?text=${encodeURIComponent(data.name)}`
    })
      .then(() => {
        Alert.alert('Sucesso', 'Serviço cadastrado com sucesso', [
          {
            text: 'OK',
            onPress: () => {
              reset(defaultValues)
              clearErrors()
              router.back()
            }
          }
        ])
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível cadastrar o serviço')
      })
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.container, { flex: 1 }]}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom:
              bottom +
              theme.spacing.padding +
              (Platform.OS === 'android' ? 120 : 0)
          }}
        >
          <Box
            flex={1}
            padding='padding'
            style={{ paddingTop: Math.max(top, 20) }}
          >
            <Text variant='headingLarge' color='text' marginBottom='s32'>
              Cadastrar Novo Serviço
            </Text>

            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, onBlur, value } }) => (
                <Box marginBottom='s24'>
                  <Text variant='body' color='text' marginBottom='s8'>
                    Nome do Serviço *
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: errors.name
                          ? theme.colors.error
                          : theme.colors.border,
                        color: theme.colors.text,
                        backgroundColor: theme.colors.cardBackground
                      }
                    ]}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text)
                      if (errors.name) clearErrors('name')
                    }}
                    onBlur={onBlur}
                    placeholder='Ex: Desenvolvimento de Website'
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                  {errors.name && (
                    <Text variant='caption' color='error' marginTop='s4'>
                      {errors.name.message}
                    </Text>
                  )}
                </Box>
              )}
            />

            <Controller
              control={control}
              name='description'
              render={({ field: { onChange, onBlur, value } }) => (
                <Box marginBottom='s24'>
                  <Text variant='body' color='text' marginBottom='s8'>
                    Descrição *
                  </Text>
                  <TextInput
                    style={[
                      styles.textArea,
                      {
                        borderColor: errors.description
                          ? theme.colors.error
                          : theme.colors.border,
                        color: theme.colors.text,
                        backgroundColor: theme.colors.cardBackground
                      }
                    ]}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text)
                      if (errors.description) clearErrors('description')
                    }}
                    onBlur={onBlur}
                    placeholder='Descreva detalhadamente o serviço oferecido'
                    placeholderTextColor={theme.colors.textSecondary}
                    multiline
                    numberOfLines={4}
                    textAlignVertical='top'
                  />
                  {errors.description && (
                    <Text variant='caption' color='error' marginTop='s4'>
                      {errors.description.message}
                    </Text>
                  )}
                </Box>
              )}
            />

            <Controller
              control={control}
              name='price'
              render={({ field: { onChange, onBlur, value } }) => (
                <Box marginBottom='s24'>
                  <Text variant='body' color='text' marginBottom='s8'>
                    Preço (R$) *
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: errors.price
                          ? theme.colors.error
                          : theme.colors.border,
                        color: theme.colors.text,
                        backgroundColor: theme.colors.cardBackground
                      }
                    ]}
                    value={value?.toString()}
                    onChangeText={(text) => {
                      const number = Number(text.replace(/[^0-9]/g, ''))
                      onChange(number)
                      if (errors.price) clearErrors('price')
                    }}
                    onBlur={onBlur}
                    placeholder='2500'
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType='numeric'
                  />
                  {errors.price && (
                    <Text variant='caption' color='error' marginTop='s4'>
                      {errors.price.message}
                    </Text>
                  )}
                </Box>
              )}
            />

            <Controller
              control={control}
              name='category'
              render={({ field: { onChange, onBlur, value } }) => (
                <Box marginBottom='s24'>
                  <Text variant='body' color='text' marginBottom='s8'>
                    Categoria *
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: errors.category
                          ? theme.colors.error
                          : theme.colors.border,
                        color: theme.colors.text,
                        backgroundColor: theme.colors.cardBackground
                      }
                    ]}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text)
                      if (errors.category) clearErrors('category')
                    }}
                    onBlur={onBlur}
                    placeholder='Ex: Desenvolvimento, Design, Marketing'
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                  {errors.category && (
                    <Text variant='caption' color='error' marginTop='s4'>
                      {errors.category.message}
                    </Text>
                  )}
                </Box>
              )}
            />

            <Controller
              control={control}
              name='provider'
              render={({ field: { onChange, onBlur, value } }) => (
                <Box marginBottom='s24'>
                  <Text variant='body' color='text' marginBottom='s8'>
                    Prestador *
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: errors.provider
                          ? theme.colors.error
                          : theme.colors.border,
                        color: theme.colors.text,
                        backgroundColor: theme.colors.cardBackground
                      }
                    ]}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text)
                      if (errors.provider) clearErrors('provider')
                    }}
                    onBlur={onBlur}
                    placeholder='Nome do prestador do serviço'
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                  {errors.provider && (
                    <Text variant='caption' color='error' marginTop='s4'>
                      {errors.provider.message}
                    </Text>
                  )}
                </Box>
              )}
            />

            <Controller
              control={control}
              name='duration'
              render={({ field: { onChange, onBlur, value } }) => (
                <Box marginBottom='s32'>
                  <Text variant='body' color='text' marginBottom='s8'>
                    Duração *
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: errors.duration
                          ? theme.colors.error
                          : theme.colors.border,
                        color: theme.colors.text,
                        backgroundColor: theme.colors.cardBackground
                      }
                    ]}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text)
                      if (errors.duration) clearErrors('duration')
                    }}
                    onBlur={onBlur}
                    placeholder='Ex: 2 semanas, 1 mês'
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                  {errors.duration && (
                    <Text variant='caption' color='error' marginTop='s4'>
                      {errors.duration.message}
                    </Text>
                  )}
                </Box>
              )}
            />

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
              style={[
                styles.button,
                {
                  backgroundColor: theme.colors.primary,
                  opacity: isLoading ? 0.5 : 1
                }
              ]}
            >
              <Text variant='buttonText' color='buttonText'>
                {isLoading ? 'Cadastrando...' : 'Cadastrar Serviço'}
              </Text>
            </TouchableOpacity>
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
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'PoppinsRegular'
  },
  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
