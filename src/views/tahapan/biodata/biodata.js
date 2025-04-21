import React, { useState } from 'react'
import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'
import Cookies from "js-cookie"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Biodata = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nama: '',
    jenis_kelamin: '',
    nomor_paspor: '',
    phone_number: '',
    tanggal_lahir: '',
    tempat_lahir: '',
    nik_ktp: '',
    alamat: '',
    email: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const token = Cookies.get('login')
    if (!token) {
      return Swal.fire({
        icon: 'warning',
        title: 'Tidak ada token',
        text: 'Silakan login terlebih dahulu.',
      })
    }

    Swal.fire({
      title: 'Menyimpan biodata...',
      text: 'Mohon tunggu sebentar.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    fetch('https://mirai-be.valla.cloud/api/users/administrasi/biodata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        Swal.close()

        if (!ok) {
          return Swal.fire({
            icon: 'error',
            title: 'Gagal Menyimpan',
            text: data.message || 'Terjadi kesalahan saat menyimpan biodata.',
          })
        }

        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Biodata berhasil disimpan.',
        }).then(() => {
          navigate('/tahapan/dokumen')
        })
      })
      .catch((err) => {
        Swal.close()
        console.error('Error:', err)
        Swal.fire({
          icon: 'error',
          title: 'Kesalahan Jaringan',
          text: 'Tidak dapat terhubung ke server. Coba lagi nanti.',
        })
      })
  }

  return (
    <CContainer>
      <CCard className="mt-4">
        <CCardHeader>
          <h4>Biodata</h4>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="nama">Nama Lengkap</CFormLabel>
                <CFormInput name="nama" value={formData.nama} onChange={handleChange} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="jenis_kelamin">Jenis Kelamin</CFormLabel>
                <CFormSelect name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange}>
                  <option value="">Pilih</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="nomor_paspor">Nomor Paspor</CFormLabel>
                <CFormInput name="nomor_paspor" value={formData.nomor_paspor} onChange={handleChange} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="phone_number">Nomor HP</CFormLabel>
                <CFormInput name="phone_number" value={formData.phone_number} onChange={handleChange} />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="tanggal_lahir">Tanggal Lahir</CFormLabel>
                <CFormInput
                  type="date"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="tempat_lahir">Tempat Lahir</CFormLabel>
                <CFormInput name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="nik_ktp">NIK KTP</CFormLabel>
                <CFormInput name="nik_ktp" value={formData.nik_ktp} onChange={handleChange} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput type="email" name="email" value={formData.email} onChange={handleChange} />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="alamat">Alamat</CFormLabel>
                <CFormInput name="alamat" value={formData.alamat} onChange={handleChange} />
              </CCol>
            </CRow>

            <CButton type="submit" color="primary">
              Simpan Biodata
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default Biodata
