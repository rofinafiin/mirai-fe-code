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

const DokumenPembayaranForm = () => {
  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!file) {
      return Swal.fire({
        icon: 'warning',
        title: 'File kosong',
        text: 'Silakan pilih file bukti pembayaran terlebih dahulu.',
      })
    }

    const data = new FormData()
    data.append('bukti_pembayaran', file)

    const token = Cookies.get('login')
    if (!token) {
      return Swal.fire({
        icon: 'warning',
        title: 'Tidak ada token',
        text: 'Silakan login ulang untuk melanjutkan.',
      })
    }

    Swal.fire({
      title: 'Mengunggah dokumen...',
      text: 'Mohon tunggu sebentar.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    fetch('https://mirai-be.valla.cloud/api/users/administrasi/pembayaran', {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        Swal.close()

        if (!ok) {
          return Swal.fire({
            icon: 'error',
            title: 'Gagal Upload',
            text: data.message || 'Terjadi kesalahan saat mengunggah dokumen.',
          })
        }

        Swal.fire({
          icon: 'success',
          title: 'Berhasil Upload Dokumen',
          text: 'Dokumen bukti pembayaran berhasil diunggah.',
          confirmButtonText: 'Lanjutkan',
        }).then(() => {
          navigate('/dashboard')
        })
      })
      .catch((error) => {
        Swal.close()
        console.error('Upload error:', error)
        Swal.fire({
          icon: 'error',
          title: 'Kesalahan Server',
          text: 'Gagal menghubungi server. Coba lagi nanti.',
        })
      })
  }

  return (
    <CContainer>
      <CCard className="mt-4">
        <CCardHeader>
          <h4>Upload Bukti Pembayaran</h4>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit} encType="multipart/form-data">
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="bukti_pembayaran">Bukti Pembayaran</CFormLabel>
                <CFormInput
                  type="file"
                  name="bukti_pembayaran"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </CCol>
            </CRow>

            <CButton type="submit" color="primary">
              Upload Bukti Pembayaran
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default DokumenPembayaranForm
