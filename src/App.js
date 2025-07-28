import React, { Component } from 'react';

// This is the HelloWorld component
class HelloWorld extends Component {
  render() {
    return (
      <h1>Hello, {this.props.name}!</h1>
    );
  }
}

// This is for the counter component
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      count: 5
    };
  }

  incrementCount = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <div className="counter" style={{ margin: '20px 0', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '2.5em', margin: '10px 0' }}>{this.state.count}</h1>
        <button 
          onClick={this.incrementCount}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          Increment Count
        </button>
      </div>
    );
  }
}

// Components list
class List extends Component {
  renderList() {
    const items = this.props.items.map(item => {
      return (
        <li 
          key={item.name} 
          style={{
            padding: '8px 12px',
            margin: '4px 0',
            backgroundColor: '#ecf0f1',
            borderRadius: '4px',
            listStyle: 'none',
            borderLeft: '4px solid #3498db'
          }}
        >
          <span style={{ fontWeight: 'bold' }}>{item.name}</span> 
          <span style={{ color: '#7f8c8d', marginLeft: '10px' }}>({item.type})</span>
        </li>
      );
    });
    return items;
  }

  render() {
    return (
      <ul style={{ padding: '0', margin: '20px 0' }}>
        {this.renderList()}
      </ul>
    );
  }
}

// FilteredList Component with for Dropdown
class FilteredList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      search: "",
      type: "All"
    };
  }

  // Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({search: event.target.value.toLowerCase()});
  }

  // Sets the state whenever the user selects from dropdown
  onSelect = (selectedType) => {
    this.setState({type: selectedType});
  }

  filterItem = (item) => {
    // Check if the current search term is contained in this item
    const matchesSearch = item.name.toLowerCase().search(this.state.search) !== -1;
    // Check if the current type filter matches 
    const matchesType = this.state.type === "All" || item.type === this.state.type;
    
    return matchesSearch && matchesType;
  }

  render() {
    return (
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#2c3e50', 
          marginBottom: '30px',
          fontSize: '2.5em',
          fontWeight: '300'
        }}>
          Produce Search
        </h1>
        
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Search produce..." 
            onChange={this.onSearch}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '16px',
              border: '2px solid #bdc3c7',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.3s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <select 
            value={this.state.type}
            onChange={(e) => this.onSelect(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '16px',
              border: '2px solid #bdc3c7',
              borderRadius: '8px',
              backgroundColor: 'white',
              cursor: 'pointer',
              boxSizing: 'border-box'
            }}
          >
            <option value="All">All Types</option>
            <option value="Fruit">Fruits</option>
            <option value="Vegetable">Vegetables</option>
          </select>
        </div>

        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          minHeight: '200px'
        }}>
          <h3 style={{ 
            color: '#34495e', 
            marginBottom: '15px',
            fontSize: '1.2em'
          }}>
            Results ({this.props.items.filter(this.filterItem).length} items):
          </h3>
          <List items={this.props.items.filter(this.filterItem)} />
        </div>
      </div>
    );
  }
}

// Main App Component of the produce
const produce = [
  {name: "Apple", type: "Fruit"},
  {name: "Pineapple", type: "Fruit"},
  {name: "Banana", type: "Fruit"},
  {name: "Pear", type: "Fruit"},
  {name: "Strawberry", type: "Fruit"},
  {name: "Orange", type: "Fruit"},
  {name: "Lettuce", type: "Vegetable"},
  {name: "Cucumber", type: "Vegetable"},
  {name: "Eggplant", type: "Vegetable"},
  {name: "Squash", type: "Vegetable"},
  {name: "Bell pepper", type: "Vegetable"},
  {name: "Onion", type: "Vegetable"},
];

class App extends Component {
  render() {
    return (
      <div style={{ 
        backgroundColor: '#ecf0f1', 
        minHeight: '100vh', 
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <HelloWorld name="React Developer: Victor Ho" />
          <Counter />
          <FilteredList items={produce} />
        </div>
      </div>
    );
  }
}

export default App;