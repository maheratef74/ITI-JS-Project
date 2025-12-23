# 🎓 Edunity - Online Learning Platform

![Edunity Banner](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)

Edunity is a modern, fully responsive online learning platform built with vanilla JavaScript, HTML5, and CSS3. It provides a comprehensive e-learning experience with course browsing, shopping cart functionality, user authentication, and dynamic content loading.

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
- [Pages Overview](#-pages-overview)
- [Component Architecture](#-component-architecture)
- [API Integration](#-api-integration)
- [Storage System](#-storage-system)
- [Styling Architecture](#-styling-architecture)
- [JavaScript Services](#-javascript-services)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Features

- 🏠 **Dynamic Home Page** with hero section, course showcase, testimonials carousel
- 📚 **Course Catalog** with filtering, search, and pagination
- 🔍 **Course Details** with comprehensive information and add-to-cart functionality
- 🛒 **Shopping Cart** with local storage persistence
- 👤 **User Authentication** (Login & Registration)
- 📄 **About Us** page with team information and company stats
- 📱 **Fully Responsive Design** (mobile, tablet, desktop)

### Advanced Features

- ⚡ **Dynamic Component Loading** (header/footer injection)
- 🎨 **Modern UI/UX** with smooth animations and transitions
- 🔄 **Auto-playing Carousel** for testimonials
- 💾 **Local/Session Storage** for cart and user data
- 🌐 **RESTful API Integration** for course data
- 🎯 **Active Page Highlighting** in navigation
- 🔔 **Toast Notifications** for user feedback
- 📊 **Data-driven Testimonials** loaded from JSON

---

## 📁 Project Structure

```
ITI-JS-Project/
│
├── 📄 db.json                          # Mock database (if using json-server)
├── 📄 TESTIMONIALS.json                # Testimonials data
├── 📄 README.md                        # This file
│
├── 📂 src/
│   ├── 📂 css/                         # Stylesheets
│   │   ├── aboutUs.css                 # About page styles
│   │   ├── courseDetails.css           # Course details styles
│   │   ├── courses.css                 # Courses page styles
│   │   └── registeration.css           # Registration/Login styles
│   │
│   ├── 📂 html/                        # HTML pages
│   │   ├── aboutUs.html                # About Us page
│   │   ├── cart.html                   # Shopping cart page
│   │   ├── courseDetails.html          # Course details page
│   │   ├── courses.html                # Courses listing page
│   │   ├── home.html                   # Home page (main entry)
│   │   ├── login.html                  # Login page
│   │   └── registeration.html          # Registration page
│   │
│   ├── 📂 images/                      # Image assets
│   │   └── (various image files)
│   │
│   ├── 📂 js/                          # JavaScript files
│   │   ├── courses.js                  # Courses page logic
│   │   ├── coursesDetails.js           # Course details logic
│   │   ├── home.js                     # Home page logic
│   │   ├── login.js                    # Login/auth logic
│   │   └── registeration.js            # Registration logic
│   │
│   └── 📂 shared/                      # Shared components
│       ├── components.js               # Component loader
│       ├── footer.css                  # Footer styles
│       ├── footer.html                 # Footer template
│       ├── header.css                  # Header styles
│       └── header.html                 # Header template
│
└── 📂 node_modules/                    # Dependencies (if any)
```

---

## 🛠 Technologies Used

### Frontend Core

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JS

### Design & UI

- **Responsive Design** - Mobile-first approach
- **CSS Animations** - Smooth transitions and effects
- **Custom Components** - Reusable header/footer

### Data & Storage

- **Fetch API** - RESTful API calls
- **LocalStorage** - Cart persistence
- **SessionStorage** - User authentication
- **JSON** - Data format for testimonials

### API Integration

- **External API** - https://my-json-server.typicode.com/Mahmoudshar0/courses-mock-data/courses
- **JSON Files** - Local testimonials data

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/edunity.git
   cd edunity/ITI-JS-Project
   ```

2. **Option A: Using Live Server (VS Code)**

   - Install "Live Server" extension in VS Code
   - Right-click on `src/html/home.html`
   - Select "Open with Live Server"

3. **Option B: Using Python**

   ```bash
   cd "ITI-JS-Project"
   python -m http.server 8000
   # Navigate to http://localhost:8000/src/html/home.html
   ```

4. **Option C: Using Node.js (http-server)**
   ```bash
   npm install -g http-server
   cd "ITI-JS-Project"
   http-server
   # Navigate to http://localhost:8080/src/html/home.html
   ```

### First Run

- The application will automatically load:
  - Courses from the external API
  - Testimonials from TESTIMONIALS.json
  - Shared header and footer components

---

## 📄 Pages Overview

### 1. Home Page (`home.html`)

**Purpose:** Main landing page showcasing platform features

**Sections:**

- Hero section with call-to-action
- Popular categories grid
- Featured courses (6 courses loaded via API)
- Join section with benefits
- Student testimonials carousel
- Newsletter subscription

**Features:**

- Dynamic course loading
- Auto-playing testimonials carousel
- Smooth scroll navigation
- Active navigation highlighting

### 2. Courses Page (`courses.html`)

**Purpose:** Browse and filter all available courses

**Sections:**

- Hero banner with page title
- Search bar with live filtering
- Category filter buttons (All, Design, Development, Business, Marketing)
- Courses grid with cards
- Load more functionality

**Features:**

- Real-time search filtering
- Category-based filtering
- Course details navigation
- Add to cart functionality

### 3. Course Details Page (`courseDetails.html`)

**Purpose:** Detailed view of individual course

**Sections:**

- Course hero with title and rating
- Main content area with description, curriculum, instructor
- Sidebar with course info, price, enrollment button
- Related courses section

**Features:**

- Dynamic course ID from URL query parameter
- Complete course information
- Curriculum breakdown
- Instructor details
- Add to cart with quantity selection

### 4. Shopping Cart Page (`cart.html`)

**Purpose:** Review and manage cart items

**Sections:**

- Cart items list
- Order summary
- Cart actions (clear, checkout)

**Features:**

- LocalStorage persistence
- Item removal
- Price calculations
- Empty cart state

### 5. About Us Page (`aboutUs.html`)

**Purpose:** Company information and team

**Sections:**

- Hero section with gradient background
- Who We Are (with features list)
- Mission, Vision, Values cards
- Achievement statistics
- Team member profiles
- Call-to-action section

**Features:**

- Modern card designs
- Hover effects on team members
- Responsive grid layouts
- Social media links

### 6. Login Page (`login.html`)

**Purpose:** User authentication

**Features:**

- Form validation
- SessionStorage for auth state
- Remember me functionality
- Redirect after login

### 7. Registration Page (`registeration.html`)

**Purpose:** New user signup

**Features:**

- Multi-step form validation
- Password strength indicator
- Terms acceptance
- Redirect to login after signup

---

## 🧩 Component Architecture

### Shared Components System

The application uses a custom component loader system for reusable header and footer.

#### ComponentLoader Class (`components.js`)

```javascript
class ComponentLoader {
  async loadComponent(url, targetSelector) {}
  async loadHeader() {}
  async loadFooter() {}
  highlightActivePage() {}
}
```

**How It Works:**

1. Each page loads `components.js` in the `<head>`
2. On `DOMContentLoaded`, components are fetched via Fetch API
3. HTML is injected into the page
4. Component-specific CSS is loaded automatically
5. Active page is highlighted in navigation

**Benefits:**

- Single source of truth for header/footer
- Consistent navigation across all pages
- Easy maintenance and updates
- Automatic active page detection

#### Header Component

**File:** `shared/header.html` + `shared/header.css`

**Includes:**

- Logo and navigation menu
- Search overlay
- Shopping cart modal
- Login/Signup buttons
- Toast notification system
- Mobile hamburger menu

#### Footer Component

**File:** `shared/footer.html` + `shared/footer.css`

**Includes:**

- Contact information
- Quick links (Services, Company)
- Instagram gallery
- Newsletter subscription form
- Social media links
- Copyright notice

---

## 🌐 API Integration

### Course API

**Endpoint:** `https://my-json-server.typicode.com/Mahmoudshar0/courses-mock-data/courses`

**Response Structure:**

```json
[
  {
    "id": 1,
    "title": "Course Title",
    "category": "Design",
    "price": 49.99,
    "rating": 4.8,
    "ratingCount": 1234,
    "students": 5000,
    "lessons": 42,
    "duration": "12h 30m",
    "instructor": "John Doe",
    "image": "image-url",
    "description": "...",
    "curriculum": [...],
    "requirements": [...],
    "level": "Beginner"
  }
]
```

### Testimonials Data

**File:** `TESTIMONIALS.json`

**Structure:**

```json
{
  "testimonials": [
    {
      "id": 1,
      "name": "Student Name",
      "role": "Job Title",
      "avatar": "avatar-url",
      "rating": 5,
      "text": "Testimonial text..."
    }
  ]
}
```

---

## 💾 Storage System

### LocalStorage (Cart Data)

**Key:** `edunityCart`

**Data Structure:**

```javascript
[
  {
    id: 1,
    title: "Course Title",
    price: 49.99,
    image: "image-url",
    quantity: 1,
  },
];
```

**Operations:**

- `CartService.getCart()` - Retrieve cart
- `CartService.addItem(course)` - Add course to cart
- `CartService.removeItem(courseId)` - Remove course
- `CartService.clearCart()` - Clear all items
- `CartService.updateCartCount()` - Update badge count

### SessionStorage (User Auth)

**Keys:**

- `email` - User email
- `password` - User password (should be hashed in production)

**Operations:**

- `AuthService.isAuthenticated()` - Check login status
- `AuthService.updateAuthUI()` - Update UI based on auth state

---

## 🎨 Styling Architecture

### CSS Organization

**Component-Based:**

- `shared/header.css` - All header-related styles (~550 lines)
- `shared/footer.css` - All footer-related styles (~240 lines)
- Page-specific CSS files contain only page-unique styles

**Color Palette:**

```css
--primary: #6c5ce7; /* Purple */
--primary-dark: #5a4dd6; /* Dark Purple */
--dark: #1a1a1a; /* Text */
--accent: #ff6b6b; /* Red */
--light-bg: #f8f9fa; /* Light Gray */
```

**Responsive Breakpoints:**

```css
@media (max-width: 480px) {
  /* Mobile */
}
@media (max-width: 768px) {
  /* Tablet */
}
@media (max-width: 1024px) {
  /* Small Desktop */
}
```

### Design Principles

- **Mobile-First** - Styles built for mobile, enhanced for desktop
- **Flexbox & Grid** - Modern layout techniques
- **BEM-like Naming** - `.block__element--modifier`
- **Smooth Transitions** - All interactive elements animated
- **Accessibility** - Semantic HTML, proper contrast ratios

---

## ⚙️ JavaScript Services

### Service Architecture

The application is organized into service classes following separation of concerns:

#### 1. **DOMHelper**

Utility class for DOM manipulation

- `select(selector)` - querySelector wrapper
- `selectAll(selector)` - querySelectorAll wrapper
- `createElement(tag, className, content)` - Element factory
- `addClass/removeClass/toggleClass` - Class manipulation

#### 2. **StorageHelper**

LocalStorage/SessionStorage abstraction

- `get(key)` - Retrieve and parse data
- `set(key, value)` - Store and stringify data
- `remove(key)` - Delete data

#### 3. **NotificationService**

Toast notification system

- `show(message, type)` - Display toast (success/error)

#### 4. **AuthService**

User authentication management

- `isAuthenticated()` - Check login status
- `updateAuthUI()` - Show/hide auth buttons

#### 5. **CartService**

Shopping cart operations

- `getCart()` - Get cart items
- `saveCart(cart)` - Persist cart
- `addItem(course)` - Add course to cart
- `removeItem(courseId)` - Remove course
- `clearCart()` - Empty cart
- `updateCartCount()` - Update badge

#### 6. **NavigationService**

Navigation and search functionality

- `init()` - Setup navigation listeners
- `handleSearch()` - Search overlay toggle
- `handleCart()` - Cart modal toggle
- `handleMobileMenu()` - Mobile menu toggle

#### 7. **CoursesService**

Course data management

- `fetchCourses()` - API call to get courses
- `generateStars(rating)` - Star rating HTML
- `createCourseCard(course)` - Course card HTML
- `renderCourses()` - Render course grid

#### 8. **TestimonialsService**

Testimonials management

- `fetchTestimonials()` - Load from JSON
- `createTestimonialCard(testimonial)` - Card HTML
- `renderTestimonials()` - Render testimonial grid

#### 9. **CarouselService**

Testimonials carousel functionality

- Auto-play with configurable interval
- Responsive card display (1/2/3 cards)
- Touch/swipe support
- Dot navigation
- Previous/Next buttons

---

## 🎯 Key JavaScript Patterns

### 1. Class-Based Services

```javascript
class ServiceName {
  static async fetchData() {}
  static createMarkup() {}
  static render() {}
}
```

### 2. Async/Await for API Calls

```javascript
async fetchCourses() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
```

### 3. Event Delegation

```javascript
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-cart")) {
    // Handle cart button
  }
});
```

### 4. Template Literals for HTML

```javascript
static createCard(item) {
  return `
    <div class="card">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `;
}
```

---

## 🌐 Browser Support

| Browser | Version |
| ------- | ------- |
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

**Required Features:**

- ES6+ (Classes, Arrow Functions, Template Literals)
- Fetch API
- LocalStorage/SessionStorage
- Flexbox & Grid
- CSS Transforms & Transitions

---

## 🔧 Configuration

### Update API Endpoint

Edit `src/js/home.js`:

```javascript
const CONFIG = {
  API_URL: "your-api-endpoint",
  TESTIMONIALS_URL: "../../TESTIMONIALS.json",
  // ...
};
```

### Update Carousel Settings

```javascript
const CONFIG = {
  CAROUSEL_AUTO_PLAY_INTERVAL: 5000, // 5 seconds
};
```

---

## 📱 Responsive Design Details

### Mobile (≤ 768px)

- Single column layouts
- Hamburger menu
- Full-width cards
- Stacked navigation
- Touch-friendly buttons (min 44x44px)

### Tablet (768px - 1024px)

- Two-column grids
- Condensed navigation
- Medium cards
- Sidebar layouts

### Desktop (> 1024px)

- Multi-column grids (3-4 columns)
- Full navigation menu
- Hover effects
- Large cards with details

---

## 🎨 Customization Guide

### Colors

Update color variables in CSS files:

```css
:root {
  --primary: #6c5ce7;
  --accent: #ff6b6b;
  --dark: #1a1a1a;
}
```

### Fonts

Change font family in body selector:

```css
body {
  font-family: "Your Font", sans-serif;
}
```

### Add New Page

1. Create HTML file in `src/html/`
2. Create CSS file in `src/css/`
3. Include component loader: `<script src="../shared/components.js"></script>`
4. Create JS file in `src/js/` (if needed)
5. Add link to navigation in `shared/header.html`

---

## 🐛 Troubleshooting

### Courses Not Loading

- Check API endpoint is accessible
- Verify network connection
- Check browser console for errors

### Carousel Not Working

- Ensure testimonials are loaded before carousel initialization
- Check that carousel container has testimonial cards
- Verify CSS transitions are not disabled

### Components Not Loading

- Check `components.js` is loaded in HTML
- Verify file paths are correct (relative paths)
- Check browser console for fetch errors

### Cart Not Persisting

- Verify LocalStorage is enabled in browser
- Check browser privacy settings
- Ensure localStorage key matches: `edunityCart`

---

## 📈 Performance Optimization

### Implemented Optimizations

- Lazy image loading (can be added)
- Minimal external dependencies
- CSS minification (production)
- Component-based CSS loading
- Efficient DOM updates

### Recommendations

- Enable GZIP compression on server
- Implement service workers for offline support
- Add image optimization (WebP format)
- Use CDN for external resources
- Implement code splitting

---

## 🔐 Security Considerations

### Current Implementation

⚠️ **Note:** This is a frontend-only demo project

**Security Limitations:**

- Passwords stored in SessionStorage (unencrypted)
- No backend validation
- No HTTPS enforcement
- No CSRF protection

### Production Recommendations

- Implement proper backend authentication
- Use secure token-based auth (JWT)
- Hash passwords with bcrypt
- Enable HTTPS only
- Add input sanitization
- Implement rate limiting
- Add CORS policies

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] All pages load correctly
- [ ] Navigation works on all pages
- [ ] Active page is highlighted
- [ ] Search functionality works
- [ ] Course filtering works
- [ ] Add to cart works
- [ ] Cart persists on reload
- [ ] Carousel auto-plays
- [ ] Mobile menu works
- [ ] Forms validate properly
- [ ] Responsive on all screen sizes

### Browser Testing

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

---

## 🚧 Future Enhancements

### Planned Features

- [ ] User profile pages
- [ ] Course enrollment system
- [ ] Video player integration
- [ ] Progress tracking
- [ ] Certificates generation
- [ ] Payment integration
- [ ] Course reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Social sharing
- [ ] Backend API development
- [ ] Database integration

---

## 👥 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add YourFeature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request**

### Coding Standards

- Use ES6+ syntax
- Follow existing code style
- Comment complex logic
- Use meaningful variable names
- Keep functions small and focused

---

## 📝 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Edunity

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact & Support

### Project Links

- **GitHub Repository:** [github.com/yourusername/edunity](https://github.com/yourusername/edunity)
- **Live Demo:** [edunity-demo.com](https://edunity-demo.com) (if deployed)
- **Documentation:** [docs.edunity.com](https://docs.edunity.com) (if available)

### Team

- **Project Lead:** Your Name
- **Developers:** Team Members
- **Designers:** Design Team

### Support

- 📧 **Email:** support@edunity.com
- 💬 **Discord:** [Join our server](https://discord.gg/edunity)
- 🐛 **Issue Tracker:** [GitHub Issues](https://github.com/yourusername/edunity/issues)

---

## 🙏 Acknowledgments

- **ITI (Information Technology Institute)** - For the learning opportunity
- **Course API Provider** - For the mock course data
- **Avatar Providers** - pravatar.cc for profile images
- **Unsplash** - For high-quality stock images
- **Icons** - Emoji icons used throughout the project

---

## 📚 Additional Resources

### Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/) - Web development documentation
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- [CSS-Tricks](https://css-tricks.com/) - CSS tips and techniques

### Tools Used

- **VS Code** - Code editor
- **Git** - Version control
- **Chrome DevTools** - Debugging
- **Figma** - Design mockups (if applicable)

---

## 📊 Project Statistics

- **Total Files:** 20+
- **Total Lines of Code:** 5000+
- **Pages:** 7
- **Reusable Components:** 2 (Header, Footer)
- **JavaScript Services:** 9+
- **Development Time:** [Your timeframe]

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- ✅ Vanilla JavaScript ES6+
- ✅ DOM Manipulation
- ✅ Fetch API & Async Programming
- ✅ LocalStorage/SessionStorage
- ✅ Responsive Web Design
- ✅ CSS Grid & Flexbox
- ✅ Component-Based Architecture
- ✅ RESTful API Integration
- ✅ Event Handling
- ✅ Form Validation
- ✅ State Management
- ✅ User Experience Design

---

<div align="center">

### Made with ❤️ by ITI Students

**⭐ Star this repo if you find it helpful!**

[Report Bug](https://github.com/yourusername/edunity/issues) · [Request Feature](https://github.com/yourusername/edunity/issues) · [Documentation](https://github.com/yourusername/edunity/wiki)

</div>

---

**Last Updated:** December 23, 2025  
**Version:** 1.0.0  
**Status:** Active Development
