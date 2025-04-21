import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAccountLogout,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink, cilFile, cilMoney,
  cilNotes,
  cilPencil,
  cilPuzzle, cilSettings,
  cilSpeedometer,
  cilStar, cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import Cookies from 'js-cookie'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'Tahapan Administrasi',
  },
  {
    component: CNavItem,
    name: 'Biodata',
    to: '/tahapan/biodata',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dokumen Administrasi',
    to: '/tahapan/dokumen',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dokumen TKD',
    to: '/tahapan/tkd',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Wawancara',
    to: '/tahapan/wawancara',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pembayaran',
    to: '/tahapan/pembayaran',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavItem,
    name: 'Settings',
    href: '#',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Log Out',
    href: '/#/login',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

export default _nav
