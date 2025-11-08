
---

## 🧩 Component Breakdown

### 1. **Layout Components**
| Component | Description |
|------------|-------------|
| `Navbar` | Top navigation bar with links and user info |
| `Footer` | Page footer with copyright/info |
| `DashboardLayout` | Wrapper layout for dashboard pages |

---

### 2. **UI Components**
| Component | Description |
|------------|-------------|
| `Button` | Primary/secondary buttons (reusable) |
| `Input` | Text/email/password input fields |
| `Card` | Base card structure for course/user details |
| `Modal` | Popup UI for confirmations and forms |

---

### 3. **Course Components**
| Component | Description |
|------------|-------------|
| `CourseCard` | Displays course details (title, description) |
| `CourseList` | Grid or list view of multiple `CourseCard`s |

---

### 4. **User Components**
| Component | Description |
|------------|-------------|
| `ProfileCard` | Displays user name, role, and avatar |
| `Avatar` | User profile image, fallback initials |

---

### 5. **Responsive Design**
- Layout adapts to **mobile (≤640px)**, **tablet (641–1024px)**, and **desktop (≥1025px)**.
- Uses **Tailwind utility classes** (`grid`, `flex`, `gap`, `p-`, `w-full`, etc. )
- Navbar collapses into a hamburger menu on small screens.

---

### 6. **Styling Rules**
- Use **Tailwind CSS** for all styles.
- Maintain consistent color palette:
  - Primary: `blue-600`
  - Secondary: `cyan-500`
  - Neutral backgrounds: `gray-100 / white`
- Use `rounded-lg`, `shadow-md`, and hover effects consistently.
- Font: `Inter` or `sans-serif`.

---

## ✅ Deliverables
- [x] UI folder structure ready
- [x] Reusable component skeletons implemented
- [x] Tailwind base styles applied
- [x] Components responsive on major breakpoints
