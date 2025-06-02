import React, { useState } from "react";
const categories = [
  "Vegetables",
  "Fruits & Nuts",
  "Dairy & creams",
  "Packages Food",
  "Staples",
];
const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    oldPrice: "",
    category: categories[0],
    isActive: false,
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id === null) {
      setProducts([
        ...products,
        { ...formData, id: Date.now() },
      ]);
    } else {
      setProducts(
        products.map((p) => (p.id === formData.id ? formData : p))
      );
    }
    setFormVisible(false);
    setFormData({
      id: null,
      name: "",
      price: "",
      oldPrice: "",
      category: categories[0],
      isActive: false,
      description: "",
    });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4">
      <nav className="bg-white p-4 shadow rounded mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Product List</h1>
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </nav>

      <div className="mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setFormVisible(true)}
        >
          New Employee
        </button>
      </div>

      {formVisible && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="border p-2 rounded"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="border p-2 rounded"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="oldPrice"
              placeholder="Old Price"
              className="border p-2 rounded"
              value={formData.oldPrice}
              onChange={handleInputChange}
            />
            <select
              name="category"
              className="border p-2 rounded"
              value={formData.category}
              onChange={handleInputChange}
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <div className="col-span-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  className="mr-2"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                />
                Is Active
              </label>
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="border p-2 rounded col-span-2"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mt-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              {formData.id === null ? "Add Product" : "Update Product"}
            </button>
          </div>
        </form>
      )}

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Old Price</th>
            <th className="p-2">Category</th>
            <th className="p-2">Active</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-2">{product.name}</td>
              <td className="p-2">₹{product.price}</td>
              <td className="p-2">₹{product.oldPrice}</td>
              <td className="p-2">{product.category}</td>
              <td className="p-2">{product.isActive ? "Yes" : "No"}</td>
              <td className="p-2">{product.description}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default App;