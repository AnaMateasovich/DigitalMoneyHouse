'use client'
import useWindowWidth from './useWindowWidth';

const useBreakpoint = () => {

    const width = useWindowWidth()

   
        return {
            isMobile: width < 640,
            isTablet: width >= 640 && width < 1024,
            isDesktop: width >= 1024,
            width
        }
    
}

export default useBreakpoint