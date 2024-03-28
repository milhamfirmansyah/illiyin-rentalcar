'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [succ, setSucc] = useState('');
  const [err, setErr] = useState('');

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleButton = async () => {
    try {
      const res = await axios.post('https://api-car-rental.binaracademy.org/admin/auth/login', {
        email: form.email,
        password: form.password,
      });
      // console.log(res);
      if (res.status === 201) {
        setSucc('berhasil login');
        setTimeout(() => {
          setSucc('');
          router.push('..');
        }, 2000);
        Cookies.set('cookieToken', res.data.access_token);
      }
    } catch (error: any) {
      console.log(error);
      setErr(error.message);
      setTimeout(() => {
        setErr('');
      }, 2000);
    }
  };

  return (
    <div className="padding">
      <h1 style={{ marginBottom: '48px' }}>Login Page</h1>
      {/* email */}
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
        <Form.Control placeholder="ketik email" aria-label="email" aria-describedby="basic-addon1" name="email" value={form.email} onChange={handleChange} />
      </InputGroup>
      {/* password */}
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
        <Form.Control placeholder="ketik password" aria-label="password" aria-describedby="basic-addon1" type="password" name="password" value={form.password} onChange={handleChange} />
      </InputGroup>
      <Button variant="success" onClick={handleButton} style={{ marginBottom: '16px' }}>
        Login
      </Button>
      <br />
      <p style={{ marginBottom: '0' }}>email: admin@bcr.io</p>
      <p>password: 123456</p>
      {succ && <span style={{ color: 'green' }}>{succ}</span>}
      {err && <span style={{ color: 'red' }}>{err}</span>}
    </div>
  );
}

export default Login;
