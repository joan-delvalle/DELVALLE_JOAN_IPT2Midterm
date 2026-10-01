function ItemList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔎</div>
        <h3>No items found</h3>
        <p>
          There are currently no records matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <article className="item-card" key={item._id}>

          <div className="item-top">
            <div className="item-symbol"></div>

            <span
              className={
                item.claimedStatus === "Claimed"
                  ? "status claimed"
                  : "status unclaimed"
              }
            >
              {item.claimedStatus === "Claimed" ? "✓ Claimed" : "● Unclaimed"}
            </span>
          </div>

          <h3>{item.description}</h3>

          <div className="item-details">

            <div className="detail">
              <span></span>
              <div>
                <small>PLACE FOUND</small>
                <p>{item.placeFound}</p>
              </div>
            </div>

            <div className="detail">
              <span></span>
              <div>
                <small>DATE FOUND</small>
                <p>
                  {new Date(item.dateFound).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    }
                  )}
                </p>
              </div>
            </div>

            <div className="detail">
              <span></span>
              <div>
                <small>FOUND BY</small>
                <p>{item.finder}</p>
              </div>
            </div>

          </div>

          <div className="item-actions">
            <button
              className="edit-button"
              onClick={() => onEdit(item)}
            >
               Edit
            </button>

            <button
              className="delete-button"
              onClick={() => onDelete(item._id)}
            >
               Delete
            </button>
          </div>

        </article>
      ))}
    </div>
  );
}

export default ItemList;