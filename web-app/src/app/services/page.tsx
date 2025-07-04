'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/layout/ui/tabs'
import { Button } from '@/components/layout/ui/button'
import Link from 'next/link'
import { ServiceList } from '@/components/services/service-list'
import { ContractedServiceList } from '@/components/services/contracted-service-list'

export default function ServicesPage() {
  return (
    <div className='max-w-7xl mx-auto px-4 py-8 space-y-8'>
      <div className='flex justify-between items-center'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold tracking-tight'>Serviços</h1>
          <p className='text-gray-500 dark:text-gray-400'>
            Gerencie seus serviços e visualize os contratos
          </p>
        </div>
        <Button
          asChild
          className='bg-primary hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all duration-200 ease-in-out hover:shadow-md bg-red-600'
        >
          <Link href='/services/new'>Novo serviço</Link>
        </Button>
      </div>

      <Tabs defaultValue='registered' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='registered'>Serviços Cadastrados</TabsTrigger>
          <TabsTrigger value='contracted'>Serviços Contratados</TabsTrigger>
        </TabsList>
        <TabsContent value='registered' className='mt-6'>
          <ServiceList />
        </TabsContent>
        <TabsContent value='contracted' className='mt-6'>
          <ContractedServiceList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
