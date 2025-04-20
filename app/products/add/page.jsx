"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    type: "", // Dropdown for product types
    name: "",
    price: "",
    description: "",
    img1: "",
    img2: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowSuccess(false);

    // Validate inputs
    for (let key in formData) {
      if (!formData[key]) {
        setError("Please fill out all fields.");
        return;
      }
    }
    if (isNaN(formData.price)) {
      setError("Price must be a valid number.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to add product");

      setShowSuccess(true);
      setTimeout(() => router.push("/products"), 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => setShowConfirmation(true);
  const handleConfirmCancel = () => router.push("/products");
  const handleDismissCancel = () => setShowConfirmation(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-g3">
      <div className="w-full max-w-2xl bg-g1 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Product Type Dropdown */}
          <div>
            <label className="block font-medium mb-2">Product Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              required
            >
              <option value="">Select Product Type</option>
              <option value="Tumble stone">Tumble stone</option>
              <option value="Raw stone">Raw stone</option>
              <option value="Reiki stone">Reiki stone</option>
              <option value="Worry bracelets">Worry bracelets</option>
              <option value="Spell candles">Spell candles</option>
            </select>
          </div>

          {/* Product Name Input */}
          <div>
            <label className="block font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"  // Fixed name to align with the formData structure
              value={formData.name} // Fixed name to align with the formData structure
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Image Inputs */}
          {["img1", "img2"].map((imgKey) => (
            <div key={imgKey}>
              <label className="block font-medium mb-2">{imgKey.toUpperCase()}</label>
              <input
                type="text"
                name={imgKey}
                value={formData[imgKey]}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                placeholder={`Enter image URL for ${imgKey}`}
              />
              {/* Show image preview if it's an image URL */}
              {formData[imgKey] && (
                <div className="mt-2">
                  <img
                    src={formData[imgKey]}
                    alt={`Preview ${imgKey}`}
                    className="w-auto h-60 object-cover rounded-lg border border-gray-300 shadow-md"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Error or Success Messages */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {showSuccess && <p className="text-green-500 text-center mb-4">Product added successfully!</p>}

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-white shadow-md transition-transform transform hover:scale-105 ${isSubmitting ? "bg-gray-400" : "bg-g2 hover:bg-g2"}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-red-600 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Popup for Cancel */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to cancel?</h3>
            <div className="flex justify-center gap-4">
              <button onClick={handleConfirmCancel} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600">Yes, Cancel</button>
              <button onClick={handleDismissCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">No, Stay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
