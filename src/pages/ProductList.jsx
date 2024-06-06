import React, { useState } from 'react';

// const ProductList = ({ day, products, addToCart }) => {
//   const filteredProducts = products.filter(product => product.dayOfWeek.day === "MONDAY");
//   console.log(filteredProducts)


//   return (
//     <div>
//       <h3>{day}</h3>
//       {filteredProducts.length > 0 && (
//         <section id={day}>
//           {filteredProducts.map(product => (
//             <ProductItem key={product.id} product={product} addToCart={addToCart} />
//           ))}
//         </section>
//       )}
//     </div>
//   );
// };
const ProductList = ({ products, addToCart }) => {
  // Create a set of unique days from the products
  const days = new Set();
  products.forEach(product => {
    days.add(product.dayOfWeek.day);
  });

  return (
    <div>
      {Array.from(days).map(day => {
        const filteredProducts = products.filter(product => product.dayOfWeek.day === day);
        return (
          filteredProducts.length > 0 && (
            <section id={day} key={day}>
              <h2>{day}</h2>
              {filteredProducts.map(product => (
                <ProductItem key={product.id} product={product} addToCart={addToCart} />
              ))}
            </section>
          )
        );
      })}
    </div>
  );
};


const ProductItem = ({ product, addToCart }) => {
  const [size, setSize] = useState('Regular');
  const [price, setPrice] = useState(product.price);

  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    setSize(selectedSize);
    if (selectedSize === 'Large') {
      setPrice(product.price * 1.1);
    } else if (selectedSize === 'Extra Large') {
      setPrice(product.price * 1.2);
    } else {
      setPrice(product.price);
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{product.category}</h5>
          <p className="card-text">{product.name}</p>
          <p className="card-text">Price: &#8373; {price.toFixed(2)}</p>
          <div className="form-group row">
            <div className="col-md-8 mb-2 mb-md-0">
              <label htmlFor={`size-select-${product.id}`} className="col-form-label">Size:</label>
              <select
                id={`size-select-${product.id}`}
                className="form-control"
                value={size}
                onChange={handleSizeChange}
              >
                <option value="Regular">Regular</option>
                <option value="Large">Large</option>
                <option value="Extra Large">Extra Large</option>
              </select>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-primary btn-block"
                onClick={() => addToCart({ ...product, size, price })}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductList;
