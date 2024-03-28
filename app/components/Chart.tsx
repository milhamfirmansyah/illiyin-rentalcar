'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Chart() {
  const [dataOrder, setDataOrder] = useState([]);
  const [month, setMonth] = useState('from=2023-12-01&until=2023-12-31');

  const token = Cookies.get('cookieToken');

  const getDataOrder = async () => {
    const res: any = await axios.get(`https://api-car-rental.binaracademy.org/admin/order/reports?${month}`, {
      headers: {
        access_token: token,
      },
    });
    setDataOrder(res.data);
  };

  useEffect(() => {
    getDataOrder();
  }, []);

  const data = dataOrder.map((item: any) => {
    return {
      name: item.day,
      order: item.orderCount,
    };
  });

  return (
    <>
      <Form.Select aria-label="Default select example" onChange={(e: any) => setMonth(e.target.value)}>
        <option>Pilih Bulan</option>
        <option value="from=2023-12-01&until=2023-12-31">Desember 2023</option>
        <option value="from=2024-01-01&until=2024-01-31">Januari 2024</option>
        <option value="from=2024-02-01&until=2024-02-29">Februari 2024</option>
      </Form.Select>
      <Button variant='success' onClick={getDataOrder} style={{ marginBottom: '24px', marginTop: '8px' }}>
        Pilih
      </Button>

      <BarChart
        width={1000}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="order" fill="#82ca9d" />
      </BarChart>
    </>
  );
}

export default Chart;
