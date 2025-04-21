import React, { useState } from 'react'
import {
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const DokumenWawancaraForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    bukti_wawancara: null,
    tanggal_wawancara: '2025-05-10', // bisa ambil dari API nanti jika perlu
  })

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prev) => ({ ...prev, [name]: files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('bukti_wawancara', formData.bukti_wawancara)

    try {
      const token = Cookies.get('login')

      if (!token) {
        console.warn('Token tidak ditemukan di cookie.')
        return
      }

      const response = await fetch(
        'https://mirai-be.valla.cloud/api/users/administrasi/wawancara',
        {
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Bearer ${token}`, // atau pakai js-cookie
          },
        },
      )

      const result = await response.json()
      console.log(result)
      Swal.fire({
        icon: 'success',
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Lanjutkan',
        textColor: '#3085d6',
        titleText: 'Berhasil Upload Dokumen',
      }).then(() => {
        navigate('/tahapan/pembayaran')
      })
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Kembali',
        textColor: '#3085d6',
        titleText: 'Gagal Upload Dokumen',
      })
    }
  }

  return (
    <CContainer>
      <CCard className="mt-4">
        <CCardHeader>
          <h4>Dokumen Wawancara</h4>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit} encType="multipart/form-data">
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="tanggal_wawancara">Tanggal Wawancara</CFormLabel>
                <CFormInput
                  type="date"
                  name="tanggal_wawancara"
                  value={formData.tanggal_wawancara}
                  disabled
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="bukti_wawancara">Upload Bukti Wawancara</CFormLabel>
                <CFormInput
                  type="file"
                  name="bukti_wawancara"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </CCol>
            </CRow>

            <CButton type="submit" color="primary">
              Upload Bukti Wawancara
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default DokumenWawancaraForm
