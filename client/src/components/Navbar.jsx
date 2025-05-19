import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { getItemsCount } = useCart();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h1>ShopEasy</h1>
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">Products</Link>
          <Link to="/checkout" className="nav-link cart-link">
            <span>Cart</span>
            {getItemsCount() > 0 && (
              <span className="cart-badge">{getItemsCount()}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
