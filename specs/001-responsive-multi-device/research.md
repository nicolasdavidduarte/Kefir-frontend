# Technical Research: Responsive Multi-Device Display

**Feature**: `001-responsive-multi-device`  
**Date**: 2026-09-17  
**Status**: Completed

## Overview

This research evaluates architectural decisions for delivering an equal, high-quality user experience across smartphones (< 768px), tablets (768px–1023px), and desktop (>= 1024px) devices for the Kefir Core Banking frontend. All decisions are strictly governed by the repository constitution: zero new dependencies, zero automated tests, preservation of colocated style objects, and no changes to backend interfaces.

---

## 1. Viewport Adaptation Mechanism

### Context & Need
The Kefir frontend uses component-colocated JavaScript objects typed with `React.CSSProperties` (`const styles: { [key: string]: React.CSSProperties } = { ... }`). Standard CSS `@media` rules cannot be directly evaluated inside inline React style objects. The project needs a lightweight, native, and robust method to adapt layouts dynamically.

### Decision
Implement a custom React hook `useViewport` in `src/hooks/useViewport.ts` that uses `window.matchMedia` (with fallback to `window.innerWidth`) and dispatches responsive boolean flags (`isMobile`, `isTablet`, `isDesktop`, and `width`). Pair this with CSS media queries in `src/index.css` / `src/App.css` for purely structural document-level adjustments.

```typescript
export interface ViewportState {
    width: number;
    isMobile: boolean;  // < 768px
    isTablet: boolean;  // 768px - 1023px
    isDesktop: boolean; // >= 1024px
}
```

### Rationale
- Complies with Principle I (no external dependencies such as `react-responsive` or CSS frameworks).
- Complies with Principle VII (uses native `useState` and `useEffect` with event listener cleanup on unmount).
- Allows clean, declarative style overrides in components:
  ```typescript
  style={{
      ...styles.container,
      ...(isMobile ? styles.containerMobile : {})
  }}
  ```
- `matchMedia` is efficient and does not induce continuous scroll/render lag compared to unthrottled resize listeners.

### Alternatives Considered
- **Pure CSS Class Migration**: Converting all inline style objects to CSS stylesheets. *Rejected*: Violates Principle V and the code preservation constraint ("stick to the code that is already in the repo; do not change anything from current code without asking").
- **External UI Frameworks (Tailwind / Bootstrap / Material-UI)**: *Rejected*: Explicitly prohibited by Principle I and the user prompt.
- **ResizeObserver / Polyfills**: *Rejected*: Unnecessary bundle weight for standard viewport breakpoint detection.

---

## 2. Navigation Architecture on Mobile & Compact Screens

### Context & Need
`Dashboard.tsx` currently renders a fixed grid layout: `gridTemplateColumns: '240px 1fr'`. On a 375px mobile screen, the sidebar occupies 240px, squeezing content into 135px and pushing headers, tables, and buttons into severe collision.

### Decision
Introduce an adaptive navigation model in `Dashboard.tsx`:
1. **Desktop / Laptop (>= 1024px)**: Keep the existing fixed 2-column sidebar layout (`240px 1fr`).
2. **Tablet (768px–1023px)**: Maintain a compact/adjusted layout with flexible content sizing.
3. **Mobile (< 768px)**:
   - Convert the dashboard container to a single-column layout (`gridTemplateColumns: '1fr'`).
   - Add a mobile top bar with Kefir branding, active module title, user indicator, and a hamburger toggle button (`FaBars` / `FaTimes` from existing `react-icons/fa`).
   - Render the navigation sidebar as an accessible off-canvas drawer / slide-over overlay with a semi-transparent backdrop.
   - Automatically close the drawer upon selecting any navigation module, ensuring immediate transition back to full-screen view.

### Rationale
- Preserves 100% of existing sidebar components and navigation handlers (`navigateTo`).
- Provides 0-collision space for the main content area when browsing records.
- Standard mobile pattern that adheres to the 2-tap requirement in the feature specification.

### Alternatives Considered
- **Bottom Navigation Bar**: *Rejected*: With 9 distinct modules (History, Users, Customers, Accounts, Loans, Banks, Currencies, Loan Types, Customer Types, About), a bottom bar would become overcrowded or require multi-level overflow.
- **Always Visible Stacking (Sidebar on top, content below)**: *Rejected*: Pushes actual content below the fold on mobile, requiring excessive scrolling before reaching business data.

---

## 3. Responsive Form Grids & Data Entry Layouts

### Context & Need
Forms in `NewAccountPage.tsx`, `NewCustomerPage.tsx`, `NewLoanPage.tsx`, and `NewUserPage.tsx` use fixed 2-column CSS grids: `gridTemplateColumns: 'repeat(2, 1fr)'`. On compact screens, this causes inputs to shrink below 140px, truncating labels, overlapping validation errors, and compressing dropdowns.

### Decision
Reflow form grids and detail summary grids dynamically based on `isMobile`:
- Default (Desktop/Tablet): `repeat(2, 1fr)` (or existing grid layout).
- Mobile (< 768px): `1fr` (single column layout).
- Full-width action buttons on mobile, or stacked buttons with clear touch heights (min 44px).
- Autocomplete suggestions overlay (`CustomerAutocomplete.tsx`) clamped to `maxWidth: '100%'` with viewport bounds protection.

### Rationale
- Single-column forms ensure inputs take the full available device width, eliminating truncation and overlap.
- Inputs remain thumb-friendly on touchscreens.

### Alternatives Considered
- **Horizontal Scrolling Forms**: *Rejected*: Poor user experience for form entry; high error rate in financial forms.

---

## 4. Tabular Data Presentation on Small Screens

### Context & Need
Core banking records (Accounts, Customers, Loans, Loan Installments, Users) are presented in multi-column tables. Some tables have up to 8 columns. On mobile screens, compressing all columns causes text collision and unreadable data.

### Decision
Retain standard table structures while reinforcing containerized horizontal scrolling:
1. Wrap tables inside `.table-scroll-container` with explicit minimum column widths (preventing cells from squashing).
2. Configure `-webkit-overflow-scrolling: touch` and visible scrollbars on mobile devices so users immediately understand horizontal swiping is available.
3. Ensure the parent card container (`whiteBody`) has `overflow: hidden; max-width: 100%; box-sizing: border-box` to prevent horizontal blowout of the whole page.
4. Increase row tap targets and vertical padding slightly on mobile for touch accuracy.

### Rationale
- Maintains data structure integrity for banking records without altering columns or omitting critical fields.
- Prevents the entire viewport/page from panning or zooming horizontally.
- Fully compatible with existing table components (`AccountTable`, `LoanTable`, `CustomerTable`, etc.).

### Alternatives Considered
- **Transforming Tables into Cards on Mobile**: *Rejected*: Would require substantial rewriting of all 8+ table components, which conflicts with the user constraint: "stick to the code that is already in the repo. Do not change anything from the current code. If something needs improve, ask before doing anything." Contained table scrolling achieves full usability with minimal invasive changes.

---

## 5. Login Viewport Adaptability

### Context & Need
`LoginPage.tsx` uses `position: fixed`, `width: 100vw`, `height: 100vh`, and a `loginCard` with fixed padding (`40px 36px`). On small mobile devices (< 360px) and when the on-screen virtual keyboard appears, the card overflows vertically without a scroll container.

### Decision
- Update `pageContainer` to support vertical scrolling (`overflowY: 'auto'`, `minHeight: '100vh'`).
- Adjust `loginCard` padding to `24px 20px` on mobile screens (`isMobile`).
- Ensure logo and form elements scale proportionally without clipping.

---

## Conclusion
All proposed solutions use native React capabilities, existing `react-icons`, and colocated styles. No third-party packages, new CSS frameworks, or test dependencies are required. All constitutional gates pass.
