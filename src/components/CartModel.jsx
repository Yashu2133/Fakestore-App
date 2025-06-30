import React from "react";

const CartModel = ({ isVisible, closeCart, itemsInCart, removeItem }) => {
  if (!isVisible) return null;

  const handleRemove = (id) => {
    const updatedCart = itemsInCart.filter((product) => product.id !== id);
    removeItem(updatedCart);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-5 relative shadow-md">
        <button
          onClick={closeCart}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">🛒 Items in Your Cart</h2>

        {itemsInCart.length === 0 ? (
          <p className="text-center text-gray-500">You haven’t added anything yet.</p>
        ) : (
          <div className="max-h-60 overflow-y-auto divide-y">
            {itemsInCart.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-start py-2"
              >
                <div className="w-4/5">
                  <p className="font-medium text-sm">{product.title}</p>
                  <p className="text-green-700 text-sm font-semibold">₹ {(product.price * 89).toFixed(0)}</p>
                </div>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="text-red-500 font-semibold hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 text-right">
          <button
            onClick={closeCart}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModel;
