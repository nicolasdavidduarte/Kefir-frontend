# UI Contract: Dashboard Responsive Layout & Navigation

**Feature**: `001-responsive-multi-device`  
**Location**: `src/pages/Dashboard.tsx`

## Component Interface

```typescript
type DashboardProps = {
    onLogout: () => void;
};
```

## Layout Contract Across Viewports

### 1. Desktop Viewport (`width >= 1024px`)
- **Root Layout**: 2-column CSS grid (`240px 1fr`).
- **Sidebar**: Persistent, left-aligned, width `240px`, background `#0f172a`.
- **Header**: Height `60px`, displays logo, brand badge, user indicator, and Logout button.
- **Main Content**: Scrollable container (`overflowY: 'auto'`), centered card (`maxWidth: '1000px'`, padding `24px`).

### 2. Tablet Viewport (`768px <= width < 1024px`)
- **Root Layout**: Adjusted grid or compact sidebar (`200px 1fr` or collapsible).
- **Header**: Standard header with compact spacing.
- **Main Content**: Padding adjusted to `20px` to optimize intermediate screen space.

### 3. Mobile Viewport (`width < 768px`)
- **Root Layout**: Single column (`gridTemplateColumns: '1fr'`).
- **Mobile Header**:
  - Hamburger toggle button (`FaBars` icon, min 44x44px touch area) to open drawer.
  - Kefir logo and title.
  - Compact user indicator and Logout button.
- **Off-Canvas Navigation Drawer**:
  - Position: `fixed`, top `0`, left `0`, bottom `0`, width `280px` (or `80vw`), `zIndex: 1000`.
  - Close button (`FaTimes` icon) at top-right of drawer.
  - Backdrop overlay: `position: fixed`, covers full viewport with semi-transparent dark background (`rgba(0, 0, 0, 0.5)`), `zIndex: 999`.
  - Selecting any module closes the drawer automatically and switches the view.
  - Clicking the backdrop dismisses the drawer without action.
- **Main Content Area**:
  - Reduced outer padding (`12px 8px`) and whiteBody padding (`16px 12px`).
  - No horizontal document overflow (tables scroll within their own container).
