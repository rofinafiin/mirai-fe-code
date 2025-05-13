import React from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCallout,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardTitle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const token = Cookies.get('login')
  if (!token) {
    return navigate('/login')
  }
  return (
    <>
      <WidgetsBrand className="mb-4" withCharts />
      <CRow>
        <CCallout color="primary">
          Tahapan Administrasi Terdiri dari 5 Tahapan, yaitu, Pengisian biodata, upload dokumen
          administrasi, upload dokumen tes kemampuan dasar, wawancara dan tahapan pembayaran
        </CCallout>

        <CCallout color="success">
          Status Penerimaan Anda "Diterima"
        </CCallout>
      </CRow>
    </>
  )
}

export default Dashboard
