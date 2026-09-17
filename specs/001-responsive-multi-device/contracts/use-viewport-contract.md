# UI Contract: `useViewport` Hook

**Feature**: `001-responsive-multi-device`  
**Location**: `src/hooks/useViewport.ts`

## Interface Contract

```typescript
export interface ViewportState {
    width: number;
    height: number;
    isMobile: boolean;  // width < 768
    isTablet: boolean;  // width >= 768 && width < 1024
    isDesktop: boolean; // width >= 1024
}

export function useViewport(): ViewportState;
```

## Behavior & Lifecycle

1. **Initial Mount**:
   - Reads `window.innerWidth` and `window.innerHeight`.
   - Evaluates initial boolean flags (`isMobile`, `isTablet`, `isDesktop`).

2. **Resize Handling**:
   - Registers a `resize` listener on `window`.
   - Updates state whenever the window crosses standard breakpoint thresholds (768px, 1024px) or viewport size changes.
   - Cleans up event listener during unmount to prevent memory leaks.

3. **Performance Guarantees**:
   - Minimal re-renders: only triggers re-renders when relevant dimensions change.
   - SSR-safe fallback if executed in non-browser environments.
