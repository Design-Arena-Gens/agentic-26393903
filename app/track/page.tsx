'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, ArrowLeft } from 'lucide-react';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find((o: any) => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
        setNotFound(false);
      } else {
        setOrder(null);
        setNotFound(true);
      }
    }
  };

  const getStatusStep = (status: string) => {
    const steps = ['pending', 'preparing', 'out-for-delivery', 'delivered'];
    return steps.indexOf(status) + 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      {/* Navigation */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-2xl font-bold">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                Mom's Delight
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-pink-600 transition">Home</Link>
              <Link href="/menu" className="text-gray-700 hover:text-pink-600 transition">Menu</Link>
              <Link href="/track" className="text-pink-600 font-semibold">Track Order</Link>
              <Link href="/login" className="text-gray-700 hover:text-pink-600 transition">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              Track Your Order
            </h1>
            <p className="text-xl text-gray-600">
              Enter your order ID to see the current status
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearch}
            className="bg-white rounded-2xl p-8 shadow-lg mb-8"
          >
            <div className="flex gap-4">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID (e.g., ORD-1234567890)"
                className="flex-grow px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 transition text-lg"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Track
              </motion.button>
            </div>
          </motion.form>

          {notFound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center"
            >
              <p className="text-red-600 font-semibold">
                Order not found. Please check your order ID and try again.
              </p>
            </motion.div>
          )}

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Order Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Date</p>
                    <p className="font-semibold">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="font-semibold text-pink-600">${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                    <p className="font-semibold">{order.paymentMethod}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                    <p className="font-semibold">
                      {order.customer.address}, {order.customer.city}, {order.customer.zipCode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-8">Order Status</h2>
                <div className="space-y-8">
                  {[
                    { icon: Clock, title: 'Order Placed', desc: 'Your order has been received', status: 'pending' },
                    { icon: Package, title: 'Preparing', desc: 'We are baking your treats', status: 'preparing' },
                    { icon: Truck, title: 'Out for Delivery', desc: 'Your order is on the way', status: 'out-for-delivery' },
                    { icon: CheckCircle, title: 'Delivered', desc: 'Enjoy your delicious treats!', status: 'delivered' },
                  ].map((step, i) => {
                    const currentStep = getStatusStep(order.status);
                    const isActive = i + 1 <= currentStep;
                    const isCurrent = i + 1 === currentStep;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition ${
                          isActive
                            ? 'bg-gradient-to-br from-pink-500 to-red-500'
                            : 'bg-gray-200'
                        }`}>
                          <step.icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <div className="flex-grow">
                          <h3 className={`text-lg font-bold mb-1 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.title}
                          </h3>
                          <p className={`text-sm ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                            {step.desc}
                          </p>
                          {isCurrent && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              className="h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mt-2"
                            />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center py-4 border-b last:border-b-0">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-pink-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
