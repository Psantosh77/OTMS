import React from 'react';
import OrderStatus from './OrderStatus';

const OrderStatusWrapper = () => {
  // In a real app, get orderId and step from params or state
  // For now, just show demo
  return <OrderStatus orderId={"demoOrderId"} currentStep={0} />;
};

export default OrderStatusWrapper;
