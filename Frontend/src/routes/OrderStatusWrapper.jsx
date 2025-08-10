import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrderStatus from '../pages/Client/OrderStatus';
import { apiService } from '../utils/apiService';

const OrderStatusWrapper = () => {
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get orderId from query param (?orderId=...)
  const params = new URLSearchParams(location.search);
  const orderId = params.get('orderId');

  useEffect(() => {
    if (!orderId) {
      setError('No order ID provided.');
      setLoading(false);
      return;
    }
    apiService.get(`/order/details/${orderId}`)
      .then(res => {
        setOrder(res.data.order);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch order details.');
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <div style={{textAlign:'center',marginTop:80}}>Loading order details...</div>;
  if (error) return <div style={{color:'red',textAlign:'center',marginTop:80}}>{error}</div>;
  if (!order) return null;

  // Determine step based on paymentStatus or other fields
  let currentStep = 0;
  if (order.paymentStatus === 'paid') currentStep = 2;
  // You can enhance this logic as needed

  return <OrderStatus orderId={order._id} currentStep={currentStep} order={order} />;
};

export default OrderStatusWrapper;
