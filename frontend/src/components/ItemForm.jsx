function ItemForm({
  formData,
  setFormData,
  onSubmit,
  editingItem,
  onCancel
}) {
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form className="item-form" onSubmit={onSubmit}>

      <div className="form-group">
        <label>What did you find?</label>
        <div className="input-wrapper">
          <span></span>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. Black wallet"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Where did you find it?</label>
        <div className="input-wrapper">
          <span></span>
          <input
            type="text"
            name="placeFound"
            value={formData.placeFound}
            onChange={handleChange}
            placeholder="e.g. School Library"
          />
        </div>
      </div>

      <div className="form-row">

        <div className="form-group">
          <label>Date Found</label>
          <div className="input-wrapper">
            <span></span>
            <input
              type="date"
              name="dateFound"
              value={formData.dateFound}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="claimedStatus"
            value={formData.claimedStatus}
            onChange={handleChange}
          >
            <option value="Unclaimed">Unclaimed</option>
            <option value="Claimed">Claimed</option>
          </select>
        </div>

      </div>

      <div className="form-group">
        <label>Your Name</label>
        <div className="input-wrapper">
          <span>👤</span>
          <input
            type="text"
            name="finder"
            value={formData.finder}
            onChange={handleChange}
            placeholder="e.g. Juan Dela Cruz"
          />
        </div>
      </div>

      <div className="form-buttons">

        <button type="submit" className="save-button">
          {editingItem ? "✓ Save Changes" : "＋ Add to Registry"}
        </button>

        {editingItem && (
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
}

export default ItemForm;