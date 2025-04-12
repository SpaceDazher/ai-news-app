---
date: 2025-04-11
"@link": "[[web-app-ai-news-doks]]"
---
---
# ManageSourcesPage v0.2 Documentation

Version 0.2

AI News Doks

Last Updated: April 2025

This document provides comprehensive documentation for the ManageSourcesPage component, including its purpose, features, integration guidelines, and implementation details.

## Table of Contents

- [Overview](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#overview)
- [Page Purpose](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#purpose)
- [Feature Description](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#features)
- [UI Components](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#ui-components)
    - [Sidebar Navigation](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#sidebar)
    - [Header](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#header)
    - [Main Content Area](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#main-content)
    - [Source Containers](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#source-containers)
    - [Add Source Modal](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#add-source)
- [Integration Guidelines](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#integration)
    - [Required Dependencies](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#dependencies)
    - [Code Integration](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#code-integration)
    - [API Endpoints](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#api-endpoints)
    - [State Management](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#state-management)
- [Implementation Guidelines](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#implementation)
    - [Development Stack](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#development-stack)
    - [Performance Considerations](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#performance)
    - [Accessibility](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#accessibility)
    - [Responsive Design](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#responsive)
- [Future Enhancements](https://page.genspark.site/page/toolu_0124BsewB3uG9Nv8QQszwsZU/manage_sources_page_documentation.html#enhancements)

## Overview

The ManageSourcesPage is a critical component of the AI News Doks platform, enabling users to configure and manage their news data sources. This page acts as the central hub for defining where the application will collect content for analysis, allowing users to add, edit, view, and delete various data sources.

Version 0.2 introduces an improved user interface with a Notion-inspired sidebar navigation, enhanced visualization of source types, and a streamlined workflow for managing sources.

## Page Purpose

The ManageSourcesPage serves several key purposes:

- Provide a centralized interface for users to manage their news data sources
- Enable the addition of various source types (RSS feeds, websites, APIs, social media, etc.)
- Allow users to view the status and details of existing sources
- Facilitate the editing of source parameters and configurations
- Support the removal of unwanted or obsolete sources
- Display metadata about sources, including last fetch time and status

This page does not display news content or analysis results; it focuses exclusively on source configuration.

## Feature Description

The ManageSourcesPage v0.2 includes the following key features:

### Source Addition

Add new sources via a modal form with support for multiple source types including websites, RSS feeds, and APIs.

### Source Visualization

View all sources in individual containers with visual differentiation by type and status indicators.

### Source Editing

Modify source parameters, update authentication credentials, and change fetch schedules.

### Source Removal

Delete sources with confirmation dialog to prevent accidental removal of important data sources.

### Source Categorization

Organize sources into categories for better management of large source collections.

### Source Search

Quickly find sources using the search functionality with filtering options.

## UI Components

The ManageSourcesPage interface is composed of several distinct components working together to provide a cohesive user experience.

### Sidebar Navigation

The sidebar provides the primary navigation for the application, following a Notion-inspired design pattern.

#### Key Characteristics:

- Fixed-position, collapsible sidebar on the left side of the interface
- Icon-based navigation with hover tooltips for collapsed state
- Expandable sections for organizing related pages
- Visual indicators for the current active page
- Main navigation sections:
    - Dashboard (Home)
    - Sources (current page)
    - Data
    - Topics
    - Settings

Sidebar Navigation Component Example

```
// SidebarNavigation.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  IconHome, IconSourceCode, IconDatabase, 
  IconTags, IconSettings 
} from '@tabler/icons-react';

const SidebarNavigation: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>{collapsed ? 'AD' : 'AI News Doks'}</h2>
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" title="Dashboard">
          <IconHome />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>
        
        <NavLink to="/sources" title="Sources" className="active">
          <IconSourceCode />
          {!collapsed && <span>Sources</span>}
        </NavLink>
        
        <NavLink to="/data" title="Data">
          <IconDatabase />
          {!collapsed && <span>Data</span>}
        </NavLink>
        
        <NavLink to="/topics" title="Topics">
          <IconTags />
          {!collapsed && <span>Topics</span>}
        </NavLink>
        
        <NavLink to="/settings" title="Settings">
          <IconSettings />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </nav>
    </div>
  );
};
```

### Header

The page header provides context and user-specific controls.

#### Key Characteristics:

- Page title display ("Source Management")
- User account information with avatar
- Global search functionality
- Notification center
- Light/dark mode toggle

Header Component Example

```
// Header.tsx
import React from 'react';
import { 
  IconSearch, IconBell, IconUser, 
  IconSun, IconMoon 
} from '@tabler/icons-react';

interface HeaderProps {
  title: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  user, 
  darkMode, 
  toggleDarkMode 
}) => {
  return (
    <header className="app-header">
      <h1 className="page-title">{title}</h1>
      
      <div className="header-controls">
        <div className="search-container">
          <IconSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input" 
          />
        </div>
        
        <button className="icon-button">
          <IconBell />
        </button>
        
        <button 
          className="icon-button" 
          onClick={toggleDarkMode}
        >
          {darkMode ? <IconSun /> : <IconMoon />}
        </button>
        
        <div className="user-info">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="user-avatar" 
          />
          <span className="user-name">{user.name}</span>
        </div>
      </div>
    </header>
  );
};
```

### Main Content Area

The main content area displays the source management functionality.

#### Key Characteristics:

- Page heading with action button ("Add Source")
- Search and filter controls specific to sources
- Grid or list view toggle for source display
- Container for source items
- Pagination controls (when sources exceed display limit)
- Empty state messaging (when no sources exist)

Main Content Component Example

```
// SourcesContent.tsx
import React, { useState } from 'react';
import { IconPlus, IconSearch, IconLayoutGrid, IconList } from '@tabler/icons-react';
import SourceContainer from './SourceContainer';
import AddSourceModal from './AddSourceModal';

interface Source {
  id: string;
  name: string;
  type: 'rss' | 'website' | 'api' | 'social';
  url: string;
  status: 'active' | 'inactive' | 'error';
  lastFetched?: string;
}

const SourcesContent: React.FC = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const filteredSources = sources.filter(source => 
    source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    source.url.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="sources-content">
      <div className="content-header">
        <h2>Source Management</h2>
        <button 
          className="add-button" 
          onClick={() => setShowAddModal(true)}
        >
          <IconPlus /> Add Source
        </button>
      </div>
      
      <div className="filters-bar">
        <div className="search-container">
          <IconSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search sources..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="view-toggles">
          <button 
            className={`toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <IconLayoutGrid />
          </button>
          <button 
            className={`toggle-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <IconList />
          </button>
        </div>
      </div>
      
      {filteredSources.length > 0 ? (
        <div className={`sources-container ${viewMode}`}>
          {filteredSources.map(source => (
            <SourceContainer 
              key={source.id} 
              source={source} 
              onEdit={(id) => handleEditSource(id)}
              onDelete={(id) => handleDeleteSource(id)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          {searchTerm ? (
            <p>No sources matching "{searchTerm}".</p>
          ) : (
            <>
              <p>No sources added yet.</p>
              <button 
                className="add-button" 
                onClick={() => setShowAddModal(true)}
              >
                Add your first source
              </button>
            </>
          )}
        </div>
      )}
      
      {showAddModal && (
        <AddSourceModal 
          onClose={() => setShowAddModal(false)}
          onAdd={(newSource) => {
            setSources([...sources, newSource]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};
```

### Source Containers

Each source is displayed in its own container with relevant information and controls.

#### Key Characteristics:

- Visual indicator of source type (RSS, website, API, social)
- Source name and URL display
- Status indicator (active, inactive, error)
- Last fetched timestamp
- Action buttons (edit, delete, refresh)
- Metadata summary (articles count, update frequency)

Source Container Component Example

```
// SourceContainer.tsx
import React from 'react';
import { IconEdit, IconTrash, IconRefresh } from '@tabler/icons-react';

interface SourceProps {
  source: {
    id: string;
    name: string;
    type: 'rss' | 'website' | 'api' | 'social';
    url: string;
    status: 'active' | 'inactive' | 'error';
    lastFetched?: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SourceContainer: React.FC<SourceProps> = ({ 
  source, 
  onEdit, 
  onDelete 
}) => {
  // Get the appropriate icon based on source type
  const getTypeIcon = () => {
    switch(source.type) {
      case 'rss': return '📰';
      case 'website': return '🌐';
      case 'api': return '🔌';
      case 'social': return '👥';
      default: return '📄';
    }
  };
  
  // Get the appropriate color for status
  const getStatusColor = () => {
    switch(source.status) {
      case 'active': return 'green';
      case 'inactive': return 'gray';
      case 'error': return 'red';
      default: return 'gray';
    }
  };
  
  return (
    <div className="source-container">
      <div className="source-header">
        <div className="source-type-icon">
          {getTypeIcon()}
        </div>
        <h3 className="source-name">{source.name}</h3>
        <div 
          className="source-status" 
          style={{ backgroundColor: getStatusColor() }}
        >
          {source.status}
        </div>
      </div>
      
      <div className="source-body">
        <p className="source-url">
          <a href={source.url} target="_blank" rel="noopener noreferrer">
            {source.url}
          </a>
        </p>
        
        {source.lastFetched && (
          <p className="last-fetched">
            Last fetched: {new Date(source.lastFetched).toLocaleString()}
          </p>
        )}
      </div>
      
      <div className="source-footer">
        <button 
          className="icon-button" 
          onClick={() => onEdit(source.id)}
          title="Edit Source"
        >
          <IconEdit />
        </button>
        
        <button 
          className="icon-button refresh" 
          title="Refresh Source"
        >
          <IconRefresh />
        </button>
        
        <button 
          className="icon-button delete" 
          onClick={() => onDelete(source.id)}
          title="Delete Source"
        >
          <IconTrash />
        </button>
      </div>
    </div>
  );
};
```

### Add Source Modal

The Add Source Modal provides the interface for adding new sources to the system.

#### Key Characteristics:

- Modal dialog with backdrop overlay
- Form with fields for source configuration:
    - Source name
    - Source type selector
    - URL/endpoint input
    - Authentication options (if applicable)
    - Update frequency settings
    - Category assignment
- Dynamic form fields based on selected source type
- Validation for required fields and URL format
- Cancel and Submit buttons

Add Source Modal Component Example

```
// AddSourceModal.tsx
import React, { useState } from 'react';
import { IconX } from '@tabler/icons-react';

interface AddSourceModalProps {
  onClose: () => void;
  onAdd: (source: any) => void;
}

const AddSourceModal: React.FC<AddSourceModalProps> = ({ 
  onClose, 
  onAdd 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'rss',
    url: '',
    updateFrequency: '60',
    requiresAuth: false,
    username: '',
    password: '',
    category: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData({
      ...formData,
      [name]: isCheckbox 
        ? (e.target as HTMLInputElement).checked 
        : value
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Source name is required';
    }
    
    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else {
      try {
        new URL(formData.url);
      } catch (_) {
        newErrors.url = 'Please enter a valid URL';
      }
    }
    
    if (formData.requiresAuth) {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      }
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAdd({
        ...formData,
        id: Date.now().toString(),
        status: 'active'
      });
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Source</h2>
          <button 
            className="close-button" 
            onClick={onClose}
          >
            <IconX />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="source-form">
          <div className="form-group">
            <label htmlFor="name">Source Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && (
              <p className="error-message">{errors.name}</p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="type">Source Type*</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="rss">RSS Feed</option>
              <option value="website">Website</option>
              <option value="api">API</option>
              <option value="social">Social Media</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="url">URL*</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className={errors.url ? 'error' : ''}
              placeholder={
                formData.type === 'rss' 
                  ? 'https://example.com/feed.xml' 
                  : formData.type === 'api'
                    ? 'https://api.example.com/news'
                    : 'https://example.com'
              }
            />
            {errors.url && (
              <p className="error-message">{errors.url}</p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="updateFrequency">
              Update Frequency (minutes)
            </label>
            <select
              id="updateFrequency"
              name="updateFrequency"
              value={formData.updateFrequency}
              onChange={handleChange}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="360">6 hours</option>
              <option value="720">12 hours</option>
              <option value="1440">24 hours</option>
            </select>
          </div>
          
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="requiresAuth"
              name="requiresAuth"
              checked={formData.requiresAuth}
              onChange={handleChange}
            />
            <label htmlFor="requiresAuth">
              Requires Authentication
            </label>
          </div>
          
          {formData.requiresAuth && (
            <>
              <div className="form-group">
                <label htmlFor="username">Username*</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? 'error' : ''}
                />
                {errors.username && (
                  <p className="error-message">{errors.username}</p>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password*</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
              </div>
            </>
          )}
          
          <div className="form-group">
            <label htmlFor="category">Category (Optional)</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="E.g., Technology, Politics, Finance"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Source
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
```

## Integration Guidelines

The following guidelines outline how to integrate the ManageSourcesPage component into the AI News Doks application.

### Required Dependencies

|Dependency|Version|Purpose|
|---|---|---|
|React|^18.0.0|Core UI framework|
|Next.js|^14.0.0|Framework for server-rendered React applications|
|TypeScript|^5.0.0|Type safety and improved developer experience|
|Tabler Icons|^2.30.0|Icon set for UI elements|
|React Hook Form|^7.44.0|Form handling with validation (optional)|
|SWR|^2.2.0|Data fetching and caching|

package.json Dependencies

```
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-hook-form": "^7.44.0",
    "swr": "^2.2.0",
    "@tabler/icons-react": "^2.30.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0"
  }
}
```

### Code Integration

Integrate the ManageSourcesPage into the application's routing system:

Next.js App Router Integration

```
// app/sources/page.tsx
import React from 'react';
import ManageSourcesPage from '@/components/pages/ManageSourcesPage';

export const metadata = {
  title: 'Manage Sources | AI News Doks',
  description: 'Manage your news sources for the AI News Doks platform',
};

export default function SourcesPage() {
  return <ManageSourcesPage />;
}
```

Ensure the MainLayout component is properly set up to include the sidebar:

Layout Component

```
// app/layout.tsx
import { Inter } from 'next/font/google';
import SidebarNavigation from '@/components/navigation/SidebarNavigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app-layout">
          <SidebarNavigation />
          <div className="main-content">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
```

### API Endpoints

The ManageSourcesPage communicates with the following API endpoints:

GET`/api/sources`

Retrieves all sources for the current user.

Response Format:

```
{
  "sources": [
    {
      "id": "string",
      "name": "string",
      "type": "rss|website|api|social",
      "url": "string",
      "status": "active|inactive|error",
      "lastFetched": "string (ISO date)",
      "updateFrequency": "number",
      "requiresAuth": "boolean",
      "username": "string (optional)",
      "password": "string (optional)",
      "category": "string (optional)"
    }
  ]
}
```

POST`/api/sources`

Creates a new source.

Request Format:

```
{
  "name": "string",
  "type": "rss|website|api|social",
  "url": "string",
  "updateFrequency": "number",
  "requiresAuth": "boolean",
  "username": "string (if requiresAuth)",
  "password": "string (if requiresAuth)",
  "category": "string (optional)"
}
```

Response Format:

```
{
  "id": "string",
  "name": "string",
  "type": "rss|website|api|social",
  "url": "string",
  "status": "active|inactive|error",
  "lastFetched": "string (ISO date)",
  "updateFrequency": "number",
  "requiresAuth": "boolean",
  "username": "string (if requiresAuth)",
  "password": "string (if requiresAuth)",
  "category": "string (optional)"
}
```

PUT`/api/sources/{id}`

Updates an existing source.

Request Format:

```
{
  "name": "string",
  "type": "rss|website|api|social",
  "url": "string",
  "status": "active|inactive|error",
  "updateFrequency": "number",
  "requiresAuth": "boolean",
  "username": "string (if requiresAuth)",
  "password": "string (if requiresAuth)",
  "category": "string (optional)"
}
```

Response Format:

```
{
  "id": "string",
  "name": "string",
  "type": "rss|website|api|social",
  "url": "string",
  "status": "active|inactive|error",
  "lastFetched": "string (ISO date)",
  "updateFrequency": "number",
  "requiresAuth": "boolean",
  "username": "string (if requiresAuth)",
  "password": "string (if requiresAuth)",
  "category": "string (optional)"
}
```

DELETE`/api/sources/{id}`

Deletes a source.

Response Format:

```
{
  "success": true,
  "message": "Source deleted successfully"
}
```

POST`/api/sources/{id}/refresh`

Manually triggers a refresh of the specified source.

Response Format:

```
{
  "success": true,
  "message": "Source refresh initiated",
  "lastFetched": "string (ISO date)"
}
```

### State Management

The ManageSourcesPage uses a combination of React's built-in useState for local UI state and SWR for remote data fetching and caching.

Data Fetching with SWR

```
// hooks/useSources.ts
import useSWR from 'swr';
import { fetcher } from '@/lib/api';

export interface Source {
  id: string;
  name: string;
  type: 'rss' | 'website' | 'api' | 'social';
  url: string;
  status: 'active' | 'inactive' | 'error';
  lastFetched?: string;
  updateFrequency: number;
  requiresAuth: boolean;
  username?: string;
  password?: string;
  category?: string;
}

export function useSources() {
  const { data, error, mutate } = useSWR('/api/sources', fetcher);
  
  const addSource = async (sourceData: Omit) => {
    try {
      const response = await fetch('/api/sources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sourceData),
      });
      
      const newSource = await response.json();
      
      // Update the local cache with the new source
      mutate(
        data => ({
          sources: [...(data?.sources || []), newSource]
        }),
        false
      );
      
      // Revalidate to ensure we have the latest data
      mutate();
      
      return newSource;
    } catch (error) {
      console.error('Error adding source:', error);
      throw error;
    }
  };
  
  const updateSource = async (id: string, sourceData: Partial) => {
    try {
      const response = await fetch(`/api/sources/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sourceData),
      });
      
      const updatedSource = await response.json();
      
      // Update the local cache with the updated source
      mutate(
        data => ({
          sources: data.sources.map((source: Source) => 
            source.id === id ? updatedSource : source
          )
        }),
        false
      );
      
      // Revalidate to ensure we have the latest data
      mutate();
      
      return updatedSource;
    } catch (error) {
      console.error('Error updating source:', error);
      throw error;
    }
  };
  
  const deleteSource = async (id: string) => {
    try {
      await fetch(`/api/sources/${id}`, {
        method: 'DELETE',
      });
      
      // Update the local cache by removing the deleted source
      mutate(
        data => ({
          sources: data.sources.filter((source: Source) => 
            source.id !== id
          )
        }),
        false
      );
      
      // Revalidate to ensure we have the latest data
      mutate();
      
      return true;
    } catch (error) {
      console.error('Error deleting source:', error);
      throw error;
    }
  };
  
  const refreshSource = async (id: string) => {
    try {
      const response = await fetch(`/api/sources/${id}/refresh`, {
        method: 'POST',
      });
      
      const result = await response.json();
      
      // Update the local cache with the latest last fetched time
      mutate(
        data => ({
          sources: data.sources.map((source: Source) => 
            source.id === id 
              ? { ...source, lastFetched: result.lastFetched }
              : source
          )
        }),
        false
      );
      
      // Revalidate to ensure we have the latest data
      mutate();
      
      return result;
    } catch (error) {
      console.error('Error refreshing source:', error);
      throw error;
    }
  };
  
  return {
    sources: data?.sources || [],
    isLoading: !error && !data,
    isError: error,
    addSource,
    updateSource,
    deleteSource,
    refreshSource,
    mutate,
  };
}
```

## Implementation Guidelines

The following guidelines provide best practices for implementing the ManageSourcesPage.

### Development Stack

The ManageSourcesPage is built using the following technology stack:

- **Frontend Framework:** React with Next.js App Router
- **Language:** TypeScript for type safety
- **Styling:** CSS Modules or Tailwind CSS
- **State Management:** React Context API for global state, React useState for component state
- **Data Fetching:** SWR for client-side data fetching with caching
- **Icons:** Tabler Icons for UI elements
- **Form Handling:** React Hook Form for form validation and submission

### Performance Considerations

#### Optimization Techniques:

- **List Virtualization:** When displaying large numbers of sources, implement virtualization to render only visible items in the viewport. Consider using libraries like `react-virtualized` or `react-window`.
- **Pagination:** Limit the number of sources fetched and displayed at once, with pagination controls for navigating through the complete dataset.
- **Memoization:** Use React.memo for components and useMemo/useCallback hooks to prevent unnecessary re-renders.
- **Optimistic Updates:** Update the UI immediately upon user actions (add, edit, delete) and reconcile with server responses in the background.
- **Lazy Loading:** Load non-critical components and modals only when needed.
- **Debouncing Search:** Implement debounce for search functionality to prevent excessive filtering operations during typing.

**Performance Tip:** When implementing the grid view for sources, consider using CSS Grid with auto-fill to create a responsive layout that automatically adjusts based on available space.

CSS Grid Layout Example

```
/* styles/SourcesGrid.module.css */
.sourcesGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

@media (max-width: 768px) {
  .sourcesGrid {
    grid-template-columns: 1fr;
  }
}
```

### Accessibility

Ensure the ManageSourcesPage is accessible to all users by implementing the following accessibility features:

- Proper semantic HTML elements (h1-h6, nav, main, etc.)
- ARIA attributes for interactive components
- Keyboard navigation support
- Focus management for modals and dialogs
- Sufficient color contrast for text elements
- Alt text for icons and visual elements
- Error messages that are screen reader friendly

**Accessibility Warning:** When implementing the source containers, ensure that all interactive elements (buttons, links) have proper focus states and are keyboard navigable. Modal dialogs should trap focus and return it to the triggering element when closed.

Accessible Button Example

```
// AccessibleButton.tsx
import React from 'react';

interface AccessibleButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  onClick,
  label,
  className = '',
  icon,
  disabled = false
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      disabled={disabled}
      aria-label={label}
      title={label}
    >
      {icon && <span className="button-icon" aria-hidden="true">{icon}</span>}
      <span className="sr-only">{label}</span>
    </button>
  );
};
```

### Responsive Design

The ManageSourcesPage should adapt to different screen sizes and devices:

- **Desktop:** Full sidebar, grid view of sources, expanded controls
- **Tablet:** Collapsible sidebar, grid or list view based on available space
- **Mobile:** Hidden sidebar with toggle button, stacked list view of sources, simplified controls

Responsive Layout CSS Variables

```
/* styles/variables.css */
:root {
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  
  /* Layout Dimensions */
  --sidebar-width: 240px;
  --sidebar-collapsed-width: 64px;
  --header-height: 64px;
  --footer-height: 60px;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Container Widths */
  --source-container-width: 300px;
  --modal-width-mobile: 100%;
  --modal-width-desktop: 600px;
}

/* Media query mixins can be used with CSS-in-JS solutions */
@media (max-width: 768px) {
  :root {
    --sidebar-width: 0;
    --header-height: 56px;
  }
}
```

## Future Enhancements

The following enhancements are planned for future versions of the ManageSourcesPage:

### Drag and Drop Organization

Allow users to organize sources by dragging and dropping them into categories or to reorder them.

### Batch Operations

Enable selection of multiple sources for batch operations like deletion, category assignment, or status changes.

### Health Monitoring

Implement a detailed source health dashboard showing fetch success rates, errors, and content statistics.

### Bulk Import/Export

Add functionality to import sources from CSV or OPML files and export existing sources.

### Source Discovery

Implement automated discovery of RSS feeds and other content sources from provided website URLs.

### AI-Powered Recommendations

Suggest relevant sources based on user interests and existing source patterns.

AI News Doks © 2025 | ManageSourcesPage Documentation v0.2

Last Updated: April 2025