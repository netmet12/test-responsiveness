import { useContext, useState, useEffect } from 'react';
import UAParser from 'ua-parser-js';
import UserAgentContext from '@/context/userAgentContext';
// import useIsMounted from '@/hooks/useIsMounted';

const IS_SERVER = typeof window === 'undefined';

export function useMediaQuery() {
    // const isMounted = useIsMounted;
    const userAgent = useContext(UserAgentContext);

    // Determine initial state based on userAgent when on the server
   const [isMobile, setIsMobile] = useState(() => {
        if (IS_SERVER) {
            // Determine initial state based on userAgent when on the server
            const parser = new UAParser(userAgent);
            const deviceType = parser.getDevice().type;
            console.log({ deviceType: parser.getDevice() });
            return deviceType === 'mobile';
        } else {
            // Determine initial state based on window width when on the client
            const watcher = window.matchMedia('(max-width: 768px)');
            return watcher.matches;
        }
    });

    // Client-side logic to update state based on viewport changes
    useEffect(() => {
            const watcher = window.matchMedia('(max-width: 768px)');
            const handler = (event) => {
                setIsMobile(event.matches);
            };
            handler(watcher); // Set the initial state based on the current viewport width
            watcher.addEventListener('change', handler);
            return () => {
                watcher.removeEventListener('change', handler);
            }; 
    }, []);

    return isMobile;
}