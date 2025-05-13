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
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const DokumenAdministrasiForm = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    pas_foto: null,
    scan_ktp: null,
    scan_ijazah: null,
    sertifikat_bahasa: null,
    sertifikat_keahlian: null,
    surat_keterangan_sehat: null,
    curriculum_vitae: null,
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

      const response = await fetch('https://mirai-be.valla.cloud/api/users/administrasi/document', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
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
        navigate('/tahapan/tkd')
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
          <h4>Dokumen Administrasi</h4>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit} encType="multipart/form-data">
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="scan_ktp">Scan KTP</CFormLabel>
                <CFormInput type="file" name="scan_ktp" accept=".pdf" onChange={handleFileChange} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="scan_ijazah">Scan Ijazah</CFormLabel>
                <CFormInput
                  type="file"
                  name="scan_ijazah"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="sertifikat_bahasa">Sertifikat Bahasa</CFormLabel>
                <CFormInput
                  type="file"
                  name="sertifikat_bahasa"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="sertifikat_keahlian">Sertifikat Keahlian</CFormLabel>
                <CFormInput
                  type="file"
                  name="sertifikat_keahlian"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="surat_keterangan_sehat">Surat Keterangan Sehat</CFormLabel>
                <CFormInput
                  type="file"
                  name="surat_keterangan_sehat"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="pas_foto">Pas Foto (dalam jpg)</CFormLabel>
                <CFormInput type="file" name="pas_foto" accept=".jpg" onChange={handleFileChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="curriculum_vitae">Curriculum Vitae</CFormLabel>
                <CFormInput type="file" name="curriculum_vitae" accept=".pdf" onChange={handleFileChange} />
              </CCol>
            </CRow>

            <CButton type="submit" color="primary">
              Upload Dokumen
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default DokumenAdministrasiForm
