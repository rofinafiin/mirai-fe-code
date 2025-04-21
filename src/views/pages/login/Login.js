import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('https://mirai-be.valla.cloud/api/users/logs/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Login',
          text: result.message || 'Terjadi kesalahan.',
        })
        return
      }

      // Simpan cookie jika ada token/login berhasil
      const expiryInDays = 18 / 24
      Cookies.set('login', result.token, {
        expires: expiryInDays,
        path: '/',
        secure: true,
        sameSite: 'Strict',
      })

      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: 'Anda Berhasil Login ke Dashboard',
      }).then(() => {
        navigate('/dashboard');
      });

    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat login');
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Masuk Menggunakan Akun Anda</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleSubmit}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Aplikasi ini dibuat khusus untuk calon pekerja yang akan melakukan tahapan administrasi. Jika belum memiliki akun, silahkan lakukan
                      registrasi dengan menekan tombol daftar dibawah ini.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Daftar
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
