'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
  Eye,
  LogOut,
  User,
  Phone,
  MapPin
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdmin = localStorage.getItem('isAdmin');
      if (isAdmin !== 'true') {
        router.push('/login');
        return;
      }
      setIsAuthenticated(true);

      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(savedOrders.reverse());
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAdmin');
    }
    router.push('/');
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    if (typeof window !== 'undefined') {
      localStorage.setItem('orders', JSON.stringify(updatedOrders.reverse()));
    }
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-2xl font-bold">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-500">Mom's Delight Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-700 hover:text-pink-600 transition">
                View Site
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: DollarSign, label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, color: 'from-green-500 to-emerald-500' },
            { icon: ShoppingCart, label: 'Total Orders', value: orders.length, color: 'from-blue-500 to-cyan-500' },
            { icon: Clock, label: 'Pending Orders', value: pendingOrders, color: 'from-yellow-500 to-orange-500' },
            { icon: CheckCircle, label: 'Completed', value: completedOrders, color: 'from-pink-500 to-red-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Recent Orders</h2>
                <p className="text-sm text-gray-600">Manage and track all orders</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order, i) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-sm font-mono">{order.id}</td>
                        <td className="px-6 py-4 text-sm">{order.customer.name}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-pink-600">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'out-for-delivery' ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedOrder(order)}
                            className="text-pink-600 hover:text-pink-700"
                          >
                            <Eye className="w-5 h-5" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Order Details Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {selectedOrder ? (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6">Order Details</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Order ID</p>
                    <p className="font-mono text-sm font-semibold">{selectedOrder.id}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 mb-1">Date</p>
                    <p className="text-sm">{new Date(selectedOrder.date).toLocaleString()}</p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-600 mb-2 flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      Customer Details
                    </p>
                    <p className="text-sm font-semibold">{selectedOrder.customer.name}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.customer.email}</p>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <Phone className="w-3 h-3 mr-1" />
                      {selectedOrder.customer.phone}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-600 mb-2 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      Delivery Address
                    </p>
                    <p className="text-sm">{selectedOrder.customer.address}</p>
                    <p className="text-sm">{selectedOrder.customer.city}, {selectedOrder.customer.zipCode}</p>
                    {selectedOrder.customer.notes && (
                      <p className="text-xs text-gray-600 mt-2 italic">
                        Note: {selectedOrder.customer.notes}
                      </p>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-600 mb-2">Order Items</p>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-pink-600">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-600 mb-3">Update Status</p>
                    <div className="space-y-2">
                      {['pending', 'preparing', 'out-for-delivery', 'delivered'].map(status => (
                        <motion.button
                          key={status}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateOrderStatus(selectedOrder.id, status)}
                          className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition ${
                            selectedOrder.status === status
                              ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Select an order to view details</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
