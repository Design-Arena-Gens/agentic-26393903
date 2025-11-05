'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Clock, Award, Users } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Chocolate Dream Cake',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    description: 'Rich chocolate layers with creamy frosting',
    rating: 5,
  },
  {
    id: 2,
    name: 'Strawberry Delight',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    description: 'Fresh strawberries with vanilla cream',
    rating: 5,
  },
  {
    id: 3,
    name: 'Red Velvet Special',
    price: 42.99,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80',
    description: 'Classic red velvet with cream cheese frosting',
    rating: 5,
  },
  {
    id: 4,
    name: 'Vanilla Bean Bliss',
    price: 38.99,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e5b80d8f?w=800&q=80',
    description: 'Pure vanilla bean cake with buttercream',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lemon Zest Cake',
    price: 40.99,
    image: 'https://images.unsplash.com/photo-1519915212116-715cfcb15a48?w=800&q=80',
    description: 'Tangy lemon with sweet frosting',
    rating: 5,
  },
  {
    id: 6,
    name: 'Caramel Heaven',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80',
    description: 'Decadent caramel layers',
    rating: 5,
  },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify([...cart, { ...product, quantity: 1 }]));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      {/* Navigation */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-2xl font-bold">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                Mom's Delight
              </span>
            </motion.div>

            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-pink-600 transition">Home</Link>
              <Link href="/menu" className="text-gray-700 hover:text-pink-600 transition">Menu</Link>
              <Link href="/track" className="text-gray-700 hover:text-pink-600 transition">Track Order</Link>
              <Link href="/login" className="text-gray-700 hover:text-pink-600 transition">Login</Link>
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-pink-600 transition" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  Homemade Cakes
                </span>
                <br />
                <span className="text-gray-800">Baked with Love</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Experience the magic of traditional baking with our handcrafted cakes.
                Every bite tells a story of passion and perfection.
              </p>
              <div className="flex space-x-4">
                <Link href="/menu">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
                  >
                    Order Now
                  </motion.button>
                </Link>
                <Link href="/menu">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-pink-500 text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transition"
                  >
                    View Menu
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative w-full h-[500px] animate-float">
                <Image
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
                  alt="Delicious cake"
                  fill
                  className="object-cover rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">100% Fresh</p>
                    <p className="text-sm text-gray-600">Daily Baking</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Fast Delivery', desc: 'Same day delivery available' },
              { icon: Award, title: 'Premium Quality', desc: 'Only finest ingredients' },
              { icon: Users, title: 'Custom Orders', desc: 'Personalized just for you' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="text-center p-8 rounded-2xl hover:shadow-xl transition"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              Our Signature Cakes
            </h2>
            <p className="text-xl text-gray-600">Handcrafted perfection in every slice</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-pink-50 transition">
                    <Heart className="w-5 h-5 text-pink-500" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-600">${product.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-100 to-red-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">What Our Customers Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', text: 'Best chocolate cake I ever had! Absolutely divine.' },
              { name: 'Michael Chen', text: 'Perfect for my daughters birthday. Everyone loved it!' },
              { name: 'Emily Rodriguez', text: 'Amazing quality and the delivery was super fast!' },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">{testimonial.text}</p>
                <p className="font-bold text-pink-600">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl font-bold">M</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Mom's Delight</h3>
          <p className="text-gray-400 mb-8">Baking happiness since 2020</p>
          <div className="flex justify-center space-x-8 mb-8">
            <Link href="/" className="hover:text-pink-400 transition">Home</Link>
            <Link href="/menu" className="hover:text-pink-400 transition">Menu</Link>
            <Link href="/track" className="hover:text-pink-400 transition">Track Order</Link>
            <Link href="/login" className="hover:text-pink-400 transition">Login</Link>
          </div>
          <p className="text-gray-500 text-sm">© 2024 Mom's Delight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
