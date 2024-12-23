// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Home',
    href: '/home',
    icon: 'tabler-smart-home'
  },

  {
    label: 'Attendance',
    href: '/attendance',
    icon: 'tabler-IconMan'
  },

  {
    label: 'Leave Request',
    href: '/leave-request',
    icon: 'tabler-IconDoorExit'
  },

  {
    label: 'Meetings',
    href: '/meetings',
    icon: 'tabler-IconCalendarTime'
  },

  {
    label: 'News and Updates',
    href: '/news-and-updates',
    icon: 'tabler-IconNews'
  },

  {
    label: 'Testing Part',
    href: '/testing-part',
    icon: 'tabler-IconNews'
  },

  {
    label: 'User Management',
    href: '/user-management',
    icon: 'tabler-users'
  },
  {
    label: 'Department',
    icon: 'tabler-building',
    children: [
      {
        label: 'Division',
        icon: 'tabler-circle',
        href: '/division'
      },
      {
        label: 'Department',
        icon: 'tabler-circle',
        href: '/department'
      }
    ]
  }
]

export default verticalMenuData
