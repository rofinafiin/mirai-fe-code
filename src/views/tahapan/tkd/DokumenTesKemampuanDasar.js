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

const DokumenTesKemampuanDasarForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    tes_kognitif: null,
    tes_keahlian: null,
    tes_bahasa_jepang: null,
  })

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prev) => ({ ...prev, [name]: files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()

    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key])
      }
    }

    try {
      const token = Cookies.get('login')

      if (!token) {
        console.warn('Token tidak ditemukan di cookie.')
        return
      }

      const response = await fetch('https://mirai-be.valla.cloud/api/users/administrasi/tkd', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`, // atau pakai js-cookie
        },
      })

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
        navigate('/tahapan/wawancara')
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
          <h4>Dokumen Tes Kemampuan Dasar</h4>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit} encType="multipart/form-data">
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="tes_kognitif">Tes Kognitif</CFormLabel>
                <CFormInput type="file" name="tes_kognitif" accept=".pdf" onChange={handleFileChange} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="tes_keahlian">Tes Keahlian</CFormLabel>
                <CFormInput type="file" name="tes_keahlian" accept=".pdf" onChange={handleFileChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="tes_bahasa_jepang">Tes Bahasa Jepang</CFormLabel>
                <CFormInput type="file" name="tes_bahasa_jepang" accept=".pdf" onChange={handleFileChange} />
              </CCol>
            </CRow>

            <CButton type="submit" color="primary">
              Upload Dokumen TKD
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default DokumenTesKemampuanDasarForm
