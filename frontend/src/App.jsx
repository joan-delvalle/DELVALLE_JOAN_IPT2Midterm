import { useEffect, useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import "./App.css";

const API_URL = "http://localhost:5000/api/items";

const emptyForm = {
  description: "",
  placeFound: "",
  dateFound: "",
  claimedStatus: "Unclaimed",
  finder: ""
};

function App() {
  // Main React states for records, form, loading, messages, editing, and search.
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  // Gets all records from the Express API.
  const fetchItems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load items.");
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Adds a new item or updates an existing item.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (
      !formData.description.trim() ||
      !formData.placeFound.trim() ||
      !formData.dateFound ||
      !formData.finder.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      const url = editingItem
        ? `${API_URL}/${editingItem._id}`
        : API_URL;

      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed.");
      }

      if (editingItem) {
        setItems((currentItems) =>
          currentItems.map((item) =>
            item._id === data._id ? data : item
          )
        );

        setMessage("Item updated successfully.");
      } else {
        setItems((currentItems) => [data, ...currentItems]);
        setMessage("Found item added successfully.");
      }

      setFormData(emptyForm);
      setEditingItem(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Loads the selected item into the form for editing.
  const handleEdit = (item) => {
    setEditingItem(item);

    setFormData({
      description: item.description,
      placeFound: item.placeFound,
      dateFound: item.dateFound.split("T")[0],
      claimedStatus: item.claimedStatus,
      finder: item.finder
    });

    setError("");
    setMessage("");
  };

  // Deletes an item through the Express API.
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this found item?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete item.");
      }

      setItems((currentItems) =>
        currentItems.filter((item) => item._id !== id)
      );

      setMessage("Item removed successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setFormData(emptyForm);
    setError("");
    setMessage("");
  };

  // Filters the records using the search box.
  const filteredItems = items.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.description.toLowerCase().includes(searchText) ||
      item.placeFound.toLowerCase().includes(searchText) ||
      item.finder.toLowerCase().includes(searchText) ||
      item.claimedStatus.toLowerCase().includes(searchText)
    );
  });

  const totalItems = items.length;

  const unclaimedItems = items.filter(
    (item) => item.claimedStatus === "Unclaimed"
  ).length;

  const claimedItems = items.filter(
    (item) => item.claimedStatus === "Claimed"
  ).length;

  return (
    <div className="app">

      {/* Hero header */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-icon">🔎</div>

          <div>
            <p className="eyebrow">CAMPUS SERVICE</p>
            <h1>Lost & Found Registry</h1>
            <p className="hero-text">
              Helping students reconnect with the things they thought
              they had lost.
            </p>
          </div>
        </div>

        <div className="hero-decoration">
          <span>🎒</span>
          <span>🔑</span>
          <span>📱</span>
        </div>
      </header>

      <main className="container">

        {/* Dashboard statistics */}
        <section className="stats">

          <div className="stat-card">
            <div className="stat-icon blue">📦</div>
            <div>
              <p>Total Items</p>
              <h2>{totalItems}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon yellow">🔍</div>
            <div>
              <p>Still Unclaimed</p>
              <h2>{unclaimedItems}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <p>Already Claimed</p>
              <h2>{claimedItems}</h2>
            </div>
          </div>

        </section>

        {/* Notifications */}
        {error && (
          <div className="notification error">
            <span>⚠️</span>
            <div>
              <strong>Something went wrong</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {message && (
          <div className="notification success">
            <span>✓</span>
            <div>
              <strong>Success</strong>
              <p>{message}</p>
            </div>
          </div>
        )}

        {/* Add item area */}
        <section className="content-grid">

          <div className="form-card">
            <div className="card-heading">
              <div className="heading-icon">＋</div>
              <div>
                <h2>{editingItem ? "Edit Item" : "Report Found Item"}</h2>
                <p>
                  {editingItem
                    ? "Update the information below."
                    : "Found something? Add it to the registry."}
                </p>
              </div>
            </div>

            <ItemForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              editingItem={editingItem}
              onCancel={handleCancel}
            />
          </div>

          {/* Tips card */}
          <div className="tips-card">
            <div className="tips-icon">💡</div>
            <h2>Found Something?</h2>
            <p>
              Help return it to its owner by recording the item
              accurately.
            </p>

            <div className="tip">
              <span>01</span>
              <p>Describe the item clearly.</p>
            </div>

            <div className="tip">
              <span>02</span>
              <p>Enter where you found it.</p>
            </div>

            <div className="tip">
              <span>03</span>
              <p>Keep the claimed status updated.</p>
            </div>
          </div>

        </section>

        {/* Registry */}
        <section className="registry">

          <div className="registry-header">
            <div>
              <p className="eyebrow dark">REGISTRY</p>
              <h2>Found Items</h2>
              <p>Browse the items currently recorded.</p>
            </div>

            <div className="search-box">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search items..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          <div className="registry-count">
            Showing <strong>{filteredItems.length}</strong> item(s)
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading registry...</p>
            </div>
          ) : (
            <ItemList
              items={filteredItems}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

        </section>

      </main>

      <footer>
        <p>Lost & Found Registry</p>
        <span>Campus Item Management System</span>
      </footer>

    </div>
  );
}

export default App;