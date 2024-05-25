import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import CustomerStatement from './pages/CustomerStatement';
import ContractList from './pages/ContractList'; 
import ContractStatement from './pages/ContractStatement';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tabs, setTabs] = useState([{ title: 'Dashboard', content: <Dashboard/>, active: true }]);

  const navItems = ['Customer Statement', 'Contract Statement', 'Aging Report', 'Total Due', 'Payment Details',
    'Contract status', 'PAR 15 Report', 'KIMS PAR Report', 'Performance Report', 'Pending transaction', 'Contract List'
  ];

  // Filter navigation items based on search query
  const filteredNavItems = navItems.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPageContent = (title) => {
    switch (title) {
      case 'Customer Statement':
        return <CustomerStatement/>;
      case 'Contract List':
        return <ContractList/>;
      case 'Contract Statement':
        return <ContractStatement/>;
      default:
        return `Content for ${title}`;
    }
  };

  const handleNavClick = (item) => {
    const existingTab = tabs.find(tab => tab.title === item);
    if (existingTab) {
      setTabs(tabs.map(tab => ({ ...tab, active: tab.title === item })));
    } else {
      setTabs(tabs.map(tab => ({ ...tab, active: false })).concat({ title: item, content: getPageContent(item), active: true }));
    }
  };

  const handleTabClick = (title) => {
    setTabs(tabs.map(tab => ({ ...tab, active: tab.title === title })));
  };

  const handleTabClose = (title) => {
    let newTabs = tabs.filter(tab => tab.title !== title);
    if (newTabs.length === 0) {
      newTabs = [{ title: 'Dashboard', content: <Dashboard/>, active: true }];
    } else if (tabs.find(tab => tab.title === title).active) {
      newTabs[newTabs.length - 1].active = true;
    }
    setTabs(newTabs);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">Logo</div>
        <div className="profile">
          <img
            src="http://example.com/path-to-your-profile-image.jpg"
            alt="Profile"
            className="profile-image"
          />
          <span className="profile-name">User Name</span>
        </div>
      </header>
      <div className="main">
        <aside className="sidebar left-sidebar">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <nav>
            <ul className="nav">
              {filteredNavItems.map(item => (
                <li key={item} className="nav-item">
                  <a href={`#${item.toLowerCase()}`} onClick={() => handleNavClick(item)}>{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="content">
          <div className="tabs">
            {tabs.map(tab => (
              <div
                key={tab.title}
                className={`tab ${tab.active ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.title)}
              >
                {tab.title}
                {tab.title !== 'Dashboard' && (
                  <span className="close-tab" onClick={(e) => { e.stopPropagation(); handleTabClose(tab.title); }}>×</span>
                )}
              </div>
            ))}
          </div>
          <div className="tab-content">
            {tabs.find(tab => tab.active).content}
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the App component
export default App;
