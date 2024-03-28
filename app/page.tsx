'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/Navbar';
import Chart from './components/Chart';

export default function Home() {
  const token = Cookies.get('cookieToken');
  const router = useRouter();

  // Protected route
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <CustomNavbar />

      <div className="padding">
        <h1>Dashboard Page</h1>
        {isClient ? <Chart /> : 'loading..'}
      </div>
    </>
  );
}
