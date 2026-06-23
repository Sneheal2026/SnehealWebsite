import React, { useState } from 'react';
import { FiSearch, FiFilter, FiPackage} from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import '../styles/pages/MedicineSearchPage.css';

const MedicineSearchPage = () => {
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Medicine Search', link: '/medicine-search' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Conversion rate and formatter for INR display (adjust rate as needed)
  const USD_TO_INR = 83;
  const formatINR = (usd) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(usd * USD_TO_INR);

  const categories = [
    { id: 'all', label: 'All Medicines' },
    { id: 'prescription', label: 'Prescription' },
    { id: 'otc', label: 'Over-the-Counter' },
    { id: 'wellness', label: 'Wellness' },
    { id: 'devices', label: 'Medical Devices' }
  ];

  const filters = [
    {
      title: 'Category',
      options: ['Prescription', 'Over-the-Counter', 'Wellness', 'Medical Devices', 'Supplements']
    },
    {
      title: 'Availability',
      options: ['In Stock', 'Pre-order', 'Available Tomorrow']
    },
    {
      title: 'Price Range',
      options: (() => {
        const rangesUSD = [[0,10],[10,25],[25,50],[50,Infinity]];
        return rangesUSD.map(([min, max]) => {
          if (max === Infinity) return `${formatINR(min)}+`;
          if (min === 0) return `Under ${formatINR(max)}`;
          return `${formatINR(min)} - ${formatINR(max)}`;
        });
      })()
    }
  ];

  const medicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      generic: 'Acetaminophen',
      price: 5.99,
      category: 'otc',
      inStock: true,
      description: 'Pain reliever and fever reducer'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      generic: 'Amoxicillin',
      price: 12.50,
      category: 'prescription',
      inStock: true,
      description: 'Antibiotic for bacterial infections'
    },
    {
      id: 3,
      name: 'Vitamin D3 1000 IU',
      generic: 'Cholecalciferol',
      price: 8.99,
      category: 'wellness',
      inStock: true,
      description: 'Essential vitamin supplement'
    },
    {
      id: 4,
      name: 'Blood Pressure Monitor',
      generic: 'Digital Monitor',
      price: 45.00,
      category: 'devices',
      inStock: true,
      description: 'Automatic digital BP monitor'
    },
    {
      id: 5,
      name: 'Ibuprofen 400mg',
      generic: 'Ibuprofen',
      price: 6.99,
      category: 'otc',
      inStock: true,
      description: 'Anti-inflammatory pain reliever'
    },
    {
      id: 6,
      name: 'Metformin 500mg',
      generic: 'Metformin Hydrochloride',
      price: 9.99,
      category: 'prescription',
      inStock: false,
      description: 'Diabetes management medication'
    },
    {
      id: 7,
      name: 'Multivitamin Complex',
      generic: 'Mixed Vitamins',
      price: 15.99,
      category: 'wellness',
      inStock: true,
      description: 'Complete daily vitamin supplement'
    },
    {
      id: 8,
      name: 'Digital Thermometer',
      generic: 'Electronic Thermometer',
      price: 12.99,
      category: 'devices',
      inStock: true,
      description: 'Fast-reading digital thermometer'
    }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.generic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="medicine-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Search Header */}
      <section className="search-header">
        <div className="container">
          <h1 className="search-title">Find Your Medicines</h1>
          <p className="search-subtitle">
            Search from thousands of genuine medicines delivered from verified pharmacies
          </p>
          <div className="search-bar-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search for medicines, health products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="category-section">
        <div className="container">
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Sidebar + Medicine Grid */}
      <section className="medicine-section">
        <div className="container">
          <div className="medicine-layout">
            {/* Filter Sidebar */}
            <aside className="filter-sidebar">
              <div className="filter-header">
                <FiFilter size={20} />
                <h3>Filters</h3>
              </div>
              
              {filters.map((filter, index) => (
                <div key={index} className="filter-group">
                  <h4 className="filter-title">{filter.title}</h4>
                  <ul className="filter-options">
                    {filter.options.map((option, optIndex) => (
                      <li key={optIndex} className="filter-option">
                        <label className="filter-label">
                          <input type="checkbox" className="filter-checkbox" />
                          <span>{option}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <Button variant="primary" size="medium" className="btn-full">
                Apply Filters
              </Button>
            </aside>

            {/* Medicine Grid */}
            <div className="medicine-content">
              <div className="medicine-results-header">
                <p className="results-count">
                  Showing {filteredMedicines.length} medicine{filteredMedicines.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="medicine-grid">
                {filteredMedicines.map((medicine) => (
                  <div key={medicine.id} className="medicine-card">
                    <div className="medicine-card-header">
                      <div className="medicine-icon">
                        <FiPackage size={24} />
                      </div>
                      {!medicine.inStock && (
                        <span className="out-of-stock-badge">Out of Stock</span>
                      )}
                      {medicine.inStock && (
                        <span className="in-stock-badge">In Stock</span>
                      )}
                    </div>
                    
                    <h3 className="medicine-name">{medicine.name}</h3>
                    <p className="medicine-generic">{medicine.generic}</p>
                    <p className="medicine-description">{medicine.description}</p>
                    
                    <div className="medicine-footer">
                      <div className="medicine-price">{formatINR(medicine.price)}</div>
                      <Button 
                        variant={medicine.inStock ? 'primary' : 'outline'} 
                        size="small"
                        disabled={!medicine.inStock}
                      >
                        {medicine.inStock ? 'Add to Cart' : 'Notify Me'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredMedicines.length === 0 && (
                <div className="no-results">
                  <FiSearch size={64} />
                  <h3>No medicines found</h3>
                  <p>Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MedicineSearchPage;
