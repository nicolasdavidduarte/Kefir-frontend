import { useState, useEffect } from 'react';

export const BREAKPOINTS = {
    MOBILE_MAX: 767,
    TABLET_MIN: 768,
    TABLET_MAX: 1023,
    DESKTOP_MIN: 1024
} as const;

export interface ViewportState {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

function getViewportState(): ViewportState {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;

    return {
        width,
        height,
        isMobile: width <= BREAKPOINTS.MOBILE_MAX,
        isTablet: width >= BREAKPOINTS.TABLET_MIN && width <= BREAKPOINTS.TABLET_MAX,
        isDesktop: width >= BREAKPOINTS.DESKTOP_MIN
    };
}

export function useViewport(): ViewportState {
    const [viewport, setViewport] = useState<ViewportState>(getViewportState);

    useEffect(() => {
        function handleResize() {
            setViewport(getViewportState());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return viewport;
}
