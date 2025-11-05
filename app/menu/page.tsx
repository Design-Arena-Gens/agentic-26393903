'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, ArrowLeft } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Chocolate Dream Cake',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    description: 'Rich chocolate layers with creamy frosting',
    category: 'Chocolate',
    rating: 5,
  },
  {
    id: 2,
    name: 'Strawberry Delight',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    description: 'Fresh strawberries with vanilla cream',
    category: 'Fruit',
    rating: 5,
  },
  {
    id: 3,
    name: 'Red Velvet Special',
    price: 42.99,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80',
    description: 'Classic red velvet with cream cheese frosting',
    category: 'Classic',
    rating: 5,
  },
  {
    id: 4,
    name: 'Vanilla Bean Bliss',
    price: 38.99,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e5b80d8f?w=800&q=80',
    description: 'Pure vanilla bean cake with buttercream',
    category: 'Classic',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lemon Zest Cake',
    price: 40.99,
    image: 'https://images.unsplash.com/photo-1519915212116-715cfcb15a48?w=800&q=80',
    description: 'Tangy lemon with sweet frosting',
    category: 'Fruit',
    rating: 5,
  },
  {
    id: 6,
    name: 'Caramel Heaven',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80',
    description: 'Decadent caramel layers',
    category: 'Caramel',
    rating: 5,
  },
  {
    id: 7,
    name: 'Triple Chocolate Fudge',
    price: 48.99,
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80',
    description: 'Dark, milk, and white chocolate perfection',
    category: 'Chocolate',
    rating: 5,
  },
  {
    id: 8,
    name: 'Blueberry Bliss',
    price: 41.99,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    description: 'Fresh blueberries with cream cheese frosting',
    category: 'Fruit',
    rating: 5,
  },
  {
    id: 9,
    name: 'Carrot Cake Delight',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80',
    description: 'Spiced carrot cake with walnuts',
    category: 'Classic',
    rating: 5,
  },
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<any[]>([]);

  const categories = ['All', 'Chocolate', 'Fruit', 'Classic', 'Caramel'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

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
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingInSaved = savedCart.find((item: any) => item.id === product.id);
      if (existingInSaved) {
        const updatedCart = savedCart.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        localStorage.setItem('cart', JSON.stringify([...savedCart, { ...product, quantity: 1 }]));
      }
    }
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
              <Link href="/menu" className="text-pink-600 font-semibold">Menu</Link>
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

      {/* Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-32 pb-12 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
            Our Menu
          </h1>
          <p className="text-xl text-gray-600">
            Explore our delicious collection of homemade cakes
          </p>
        </div>
      </motion.section>

      {/* Category Filter */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-pink-50 border border-pink-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid md:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
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
                  <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </div>
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
