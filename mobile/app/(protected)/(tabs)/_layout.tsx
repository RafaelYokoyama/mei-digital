import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/src/ui/components/TabBarIcon'
import { useAppTheme } from '@/src/ui/theme/useAppTheme'

export default function TabLayout() {
  const { colors } = useAppTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray2,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Serviços',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'briefcase' : 'briefcase-outline'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='add-service'
        options={{
          title: 'Cadastrar',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'add-circle' : 'add-circle-outline'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  )
}
