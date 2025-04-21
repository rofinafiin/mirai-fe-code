import React, { useEffect, useState } from 'react'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilFolder, cilUser, cilClipboard, cilCreditCard, cilCamera} from '@coreui/icons'
import Cookies from 'js-cookie'

const WidgetsBrand = () => {
  const [tahapan, setTahapan] = useState(null)

  useEffect(() => {
    const token = Cookies.get('login')

    if (!token) {
      console.warn('Token tidak ditemukan di cookie.')
      return
    }

    fetch('https://mirai-be.valla.cloud/api/users/administrasi/checks', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTahapan(data?.[0]) // ambil data user pertama
      })
      .catch((err) => {
        console.error('Gagal fetch tahapan:', err)
      })
  }, [])

  const getStatus = (value) => (value ? 'SELESAI' : 'BELUM DIISI')

  return (
    <CRow>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          icon={<CIcon icon={cilFolder} height={52} className="my-4 text-white" />}
          values={[{ title: 'Dokumen Administrasi', value: getStatus(tahapan?.document_id) }]}
          style={{ '--cui-card-cap-bg': '#3b5998' }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          icon={<CIcon icon={cilUser} height={52} className="my-4 text-white" />}
          values={[{ title: 'Biodata', value: getStatus(tahapan?.biodata_id) }]}
          style={{ '--cui-card-cap-bg': '#00aced' }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          icon={<CIcon icon={cilClipboard} height={52} className="my-4 text-white" />}
          values={[{ title: 'Tes Kemampuan Dasar', value: getStatus(tahapan?.tkd_id) }]}
          style={{ '--cui-card-cap-bg': '#4875b4' }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          icon={<CIcon icon={cilCreditCard} height={52} className="my-4 text-white" />}
          values={[{ title: 'Pembayaran', value: getStatus(tahapan?.pembayaran_id) }]} // optional
          style={{ '--cui-card-cap-bg': '#f9b115' }}
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsBrand
