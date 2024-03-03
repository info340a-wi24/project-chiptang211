import React, { useState, useEffect } from 'react';
import foodData from '../data/foods.json'

function AddFood() {
  const [allFoodItems, setAllFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [addedFoodItems, setAddedFoodItems] = useState([]);
  const [filter, setFilter] = useState({ brand: '', name: '' });
  const [addDate, setAddDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const items = foodData.flatMap(restaurant => 
      restaurant.foodItems.map(item => ({ ...item, restaurant: restaurant.restaurant }))
    );
    setAllFoodItems(items);
    setFilteredFoodItems(items);
  }, []);

  const handleAddItem = (itemToAdd) => {
    setAddedFoodItems(prev => [...prev, { ...itemToAdd, date: addDate }]);
  };

  const handleDeleteItem = (index) => {
    setAddedFoodItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateFilter = () => {
    const { brand, name } = filter;
    const filtered = allFoodItems.filter(item =>
      (brand === '' || item.restaurant === brand) &&
      (name === '' || item.foodName.toLowerCase().includes(name.toLowerCase()))
    );
    setFilteredFoodItems(filtered);
  };

  return (
    <main className="add_page">
      <aside className="left_col">
        <section id="food_filter_box">
          <h1>Add Your Food</h1>
          <div class="filter">
            <label htmlFor="add_date">Date:</label>
            <input type="date" id="add_date" value={addDate} onChange={(e) => setAddDate(e.target.value)} /><br />
            <label htmlFor="food_brand">Brand:</label>
            <select id="food_brand" name="brand" value={filter.brand} onChange={handleFilterChange}>
            <option value="">All</option>
              {[...new Set(foodData.map(item => item.restaurant))].map((brand, index) => (
                <option key={index} value={brand}>{brand}</option>
              ))}
            </select><br />
            <label htmlFor="food_name">Food Name:</label>
            <input type="text" id="food_name" name="name" value={filter.name} onChange={handleFilterChange} /><br />
          </div>
          <button onClick={handleUpdateFilter}>Update</button>
        </section>

        <section>
          <h2>Food List</h2>
          <div className="item_box">
            {filteredFoodItems.map((item, index) => (
              <div className="item" key={index}>
                <h3>{`${item.restaurant}, ${item.foodName}`}</h3>
                <p>{item.calories} calories</p>
                <button onClick={() => handleAddItem(item)}>Add</button>
              </div>
            ))}
          </div>
        </section>
      </aside>

      <aside className="right_col">
        <section>
          <h2>Added Food</h2>
          <div className="item_box">
            {addedFoodItems.map((item, index) => (
              <div className="item" key={index}>
                <h3>{`${item.foodName}, ${item.restaurant}`}</h3>
                <p>{item.calories} calories</p>
                <p>Date: {item.date}</p>
                <button onClick={() => handleDeleteItem(index)}>Delete</button>
              </div>
            ))}
          </div>
          <button onClick={() => console.log(addedFoodItems)}>Save</button>
        </section>
      </aside>
    </main>
  );
}

export default AddFood;
