import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useAppTheme } from '../theme/useAppTheme'
import { Text } from './Text'

type CategoryChipsProps = {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export function CategoryChips({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryChipsProps) {
  const theme = useAppTheme()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.chip,
          {
            backgroundColor: !selectedCategory
              ? theme.colors.primary
              : theme.colors.cardBackground,
            borderColor: theme.colors.border
          }
        ]}
        onPress={() => onSelectCategory(null)}
      >
        <Text variant='body' color={!selectedCategory ? 'buttonText' : 'text'}>
          Todas
        </Text>
      </TouchableOpacity>

      {categories.map((category) => (
        <TouchableOpacity
          key={category}
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
          onPress={() => onSelectCategory(category)}
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
