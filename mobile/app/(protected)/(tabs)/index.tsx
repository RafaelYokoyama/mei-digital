import { useServiceFindAll } from '@/src/domain/service/operations/useServiceFindAll'
import { ServicePreview } from '@/src/domain/service/Service'
import { Box } from '@/src/ui/components/Box'
import { CategoryChips } from '@/src/ui/components/CategoryChips'
import { Screen } from '@/src/ui/components/Screen'
import { ServiceCard } from '@/src/ui/components/ServiceCard'
import { Text } from '@/src/ui/components/Text'
import { useAppTheme } from '@/src/ui/theme/useAppTheme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ListRenderItemInfo, RefreshControl } from 'react-native'
import Animated, { FadingTransition } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SELECTED_CATEGORY_KEY = '@mei-digital:selected-category'

export default function HomeScreen() {
  const { spacing } = useAppTheme()
  const { top } = useSafeAreaInsets()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const navigation = useNavigation()
  const [shouldRefetch, setShouldRefetch] = useState(false)

  const { data: services, isLoading, error, refetch } = useServiceFindAll()

  const flatListRef = useRef(null)
  useScrollToTop(flatListRef)

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setShouldRefetch(true)
    })

    return unsubscribe
  }, [navigation])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (shouldRefetch) {
        refetch()
        setShouldRefetch(false)
      }
    })

    return unsubscribe
  }, [navigation, refetch, shouldRefetch])

  useEffect(() => {
    async function loadSavedCategory() {
      try {
        const savedCategory = await AsyncStorage.getItem(SELECTED_CATEGORY_KEY)
        if (savedCategory) {
          setSelectedCategory(savedCategory)
        }
      } catch (error) {
        console.error('Erro ao carregar categoria:', error)
      }
    }
    loadSavedCategory()
  }, [])

  const categories = useMemo(() => {
    if (!services) return []
    const uniqueCategories = new Set(
      services.map((service) => service.category)
    )
    return Array.from(uniqueCategories)
  }, [services])

  const filteredServices = useMemo(() => {
    if (!services) return []
    if (!selectedCategory) return services
    return services.filter((service) => service.category === selectedCategory)
  }, [services, selectedCategory])

  const handleCategorySelect = useCallback(async (category: string | null) => {
    setSelectedCategory(category)
    try {
      if (category) {
        await AsyncStorage.setItem(SELECTED_CATEGORY_KEY, category)
      } else {
        await AsyncStorage.removeItem(SELECTED_CATEGORY_KEY)
      }
    } catch (error) {
      console.error('Erro ao salvar categoria:', error)
    }
  }, [])

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await refetch()
    } finally {
      setIsRefreshing(false)
    }
  }, [refetch])

  function renderItem({ item }: ListRenderItemInfo<ServicePreview>) {
    return (
      <Box paddingHorizontal='padding'>
        <ServiceCard servicePreview={item} />
      </Box>
    )
  }

  if (isLoading && !isRefreshing) {
    return (
      <Screen>
        <Box flex={1} justifyContent='center' alignItems='center'>
          <Text variant='headingMedium' color='text'>
            Carregando serviços...
          </Text>
        </Box>
      </Screen>
    )
  }

  if (error) {
    return (
      <Screen>
        <Box flex={1} justifyContent='center' alignItems='center'>
          <Text variant='headingMedium' color='error'>
            Erro ao carregar serviços
          </Text>
          <Text variant='body' color='textSecondary' marginTop='paddingSmall'>
            Puxe para baixo para tentar novamente
          </Text>
        </Box>
      </Screen>
    )
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <Animated.FlatList
        itemLayoutAnimation={FadingTransition.duration(500)}
        ref={flatListRef}
        contentContainerStyle={{
          gap: spacing.padding,
          paddingTop: top,
          paddingBottom: spacing.padding
        }}
        data={filteredServices}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <Box>
            <Box paddingHorizontal='padding' marginBottom='padding'>
              <Text
                variant='headingLarge'
                color='text'
                marginBottom='paddingSmall'
              >
                Serviços Disponíveis
              </Text>
              <Text variant='body' color='textSecondary' marginBottom='padding'>
                Escolha o serviço ideal para o seu projeto
              </Text>
            </Box>

            <CategoryChips
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          </Box>
        }
      />
    </Screen>
  )
}
