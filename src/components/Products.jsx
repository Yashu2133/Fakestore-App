import React, { useEffect, useState } from "react";
import CartModel from "./CartModel";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProductList(data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addItemToCart = (item) => {
    const alreadyAdded = selectedItems.find((p) => p.id === item.id);
    if (alreadyAdded) {
      alert("This item is already in your cart!");
      return;
    }
    setSelectedItems([...selectedItems, item]);
  };

  const removeFromCart = (updatedCart) => {
    setSelectedItems(updatedCart);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center bg-indigo-600 text-white px-6 py-4">
        <h1 className="text-xl font-bold"> Products </h1>
        <button
          onClick={() => setShowCart(true)}
          className="bg-white text-indigo-600 px-4 py-2 rounded flex items-center gap-2 hover:bg-indigo-100"
        >
          <span className="material-icons">shopping_cart</span>
          Cart ({selectedItems.length})
        </button>
      </header>

      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productList.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain mb-4"
            />
            <h2 className="text-center text-sm font-medium mb-2">
              {item.title}
            </h2>
            <p className="text-green-700 font-semibold mb-2">
              ₹ {(item.price * 89).toFixed(0)}
            </p>
            <button
              onClick={() => addItemToCart(item)}
              className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 text-sm"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </main>

      {showCart && (
        <CartModel
          isVisible={showCart}
          closeCart={() => setShowCart(false)}
          itemsInCart={selectedItems}
          removeItem={removeFromCart}
        />
      )}
    </div>
  );
};

export default Products;
