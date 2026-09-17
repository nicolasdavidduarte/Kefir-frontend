# Data Model: Responsive Multi-Device Display

**Feature**: `001-responsive-multi-device`  
**Date**: 2026-09-17  
**Status**: Completed

## Overview

This document defines the client-side state models, viewport classifications, and presentation contracts required to support responsive multi-device layouts across the Kefir Core Banking frontend.

---

## 1. Viewport State Model

### `ViewportState`
Represents the current browser viewport dimensions and category classifications.

| Field | Type | Description |
|---|---|---|
| `width` | `number` | Current inner window width in pixels (`window.innerWidth`). |
| `height` | `number` | Current inner window height in pixels (`window.innerHeight`). |
| `isMobile` | `boolean` | `true` if `width < 768px`; indicates compact mobile phone layout. |
| `isTablet` | `boolean` | `true` if `width >= 768px && width < 1024px`; indicates intermediate tablet layout. |
| `isDesktop` | `boolean` | `true` if `width >= 1024px`; indicates full desktop or laptop layout. |

### Breakpoint Thresholds
```typescript
export const BREAKPOINTS = {
    MOBILE_MAX: 767,
    TABLET_MIN: 768,
    TABLET_MAX: 1023,
    DESKTOP_MIN: 1024
} as const;
```

---

## 2. Navigation State Model

### `MobileNavigationState`
Manages the off-canvas navigation drawer lifecycle in `Dashboard.tsx`.

| Field | Type | Description |
|---|---|---|
| `isMenuOpen` | `boolean` | Indicates whether the mobile navigation overlay is visible. |
| `activeView` | `View` | The currently selected domain module (`history`, `users`, `accounts`, etc.). |

### State Transitions
```text
[Initial: Desktop] ──(width < 768px)──> [Mobile: Drawer Closed (isMenuOpen = false)]
[Mobile: Closed]   ──(Tap Hamburger)──> [Mobile: Drawer Open (isMenuOpen = true)]
[Mobile: Open]     ──(Tap Module)─────> [View Changes & isMenuOpen = false]
[Mobile: Open]     ──(Tap Backdrop)───> [isMenuOpen = false]
[Mobile: Open]     ──(Tap Close 'X')──> [isMenuOpen = false]
[Mobile: Any]      ──(width >= 768px)─> [Drawer Dismissed, Persistent Sidebar Restored]
```

---

## 3. Responsive Component Style Overrides

### Form Grid State
- **Desktop/Tablet Mode**: `gridTemplateColumns: 'repeat(2, 1fr)'`, column gap: `24px`.
- **Mobile Mode**: `gridTemplateColumns: '1fr'`, gap: `16px`.

### Content Padding State
- **Desktop Mode**: Container padding: `32px`, Card padding: `24px`.
- **Tablet Mode**: Container padding: `20px`, Card padding: `20px`.
- **Mobile Mode**: Container padding: `12px 8px`, Card padding: `16px 12px`.

### Table Scroll State
- Parent container: `width: '100%'`, `overflowX: 'auto'`, `-webkit-overflow-scrolling: 'touch'`.
- Inner table minimum width: `600px` - `800px` depending on column count, ensuring columns do not collapse into unreadable widths.
