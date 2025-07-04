import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useAppTheme } from '../theme/useAppTheme'
import { Text } from './Text'

type CategoryScrollProps = {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export function CategoryScroll({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryScrollProps) {
  const theme = useAppTheme()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        onPress={() => onSelectCategory(null)}
        style={[
          styles.chip,
          {
            backgroundColor: !selectedCategory
              ? theme.colors.primary
              : theme.colors.cardBackground,
            borderColor: theme.colors.border
          }
        ]}
      >
        <Text variant='body' color={!selectedCategory ? 'buttonText' : 'text'}>
          Todas
        </Text>
      </TouchableOpacity>

      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => onSelectCategory(category)}
          style={[
            styles.chip,
            {
              backgroundColor:
                selectedCategory === category
                  ? theme.colors.primary
                  : theme.colors.cardBackground,
              borderColor: theme.colors.border
            }
          ]}
        >
          <Text
            variant='body'
            color={selectedCategory === category ? 'buttonText' : 'text'}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1
  }
})
