'use client'

import { useServiceList } from '@/domain/services/operations/useServiceList'
import { ServiceCard } from '@/components/services/service-card'
import { ServiceListSkeleton } from '@/components/services/service-list-skeleton'
import { ServiceListEmpty } from '@/components/services/service-list-empty'
import { ServiceListError } from '@/components/services/service-list-error'

export function ServiceList() {
  const { services, isLoading, error } = useServiceList()

  if (isLoading) {
    return <ServiceListSkeleton />
  }

  if (error) {
    return <ServiceListError />
  }

  if (!services?.length) {
    return <ServiceListEmpty />
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
