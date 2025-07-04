import React, { useState } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useAppTheme } from '../theme/useAppTheme'
import { Icon } from './Icon'
import { Text } from './Text'

type CategoryDropdownProps = {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export function CategoryDropdown({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useAppTheme()

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={[
          styles.button,
          {
            backgroundColor: theme.colors.cardBackground,
            borderColor: theme.colors.border
          }
        ]}
      >
        <Text variant='body' color='text'>
          {selectedCategory || 'Todas as categorias'}
        </Text>
        <Icon name='Chevron-down' size={20} color='textSecondary' />
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType='fade'>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setIsOpen(false)}
          activeOpacity={1}
        >
          <View
            style={[
              styles.dropdown,
              {
                backgroundColor: theme.colors.cardBackground,
                borderColor: theme.colors.border
              }
            ]}
          >
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor: !selectedCategory
                    ? theme.colors.primary
                    : theme.colors.cardBackground
                }
              ]}
              onPress={() => {
                onSelectCategory(null)
                setIsOpen(false)
              }}
            >
              <Text
                variant='body'
                color={!selectedCategory ? 'buttonText' : 'text'}
              >
                Todas as categorias
              </Text>
            </TouchableOpacity>

            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      selectedCategory === category
                        ? theme.colors.primary
                        : theme.colors.cardBackground
                  }
                ]}
                onPress={() => {
                  onSelectCategory(category)
                  setIsOpen(false)
                }}
              >
                <Text
                  variant='body'
                  color={selectedCategory === category ? 'buttonText' : 'text'}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16
  },
  dropdown: {
    borderRadius: 8,
    borderWidth: 1,
    maxHeight: '80%'
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12
  }
})
