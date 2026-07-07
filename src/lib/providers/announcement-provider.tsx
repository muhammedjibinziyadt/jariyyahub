
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AnnouncementContextType {
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
    height: number;
}

const AnnouncementContext = createContext<AnnouncementContextType>({
    isVisible: false,
    setIsVisible: () => { },
    height: 0,
});

export const useAnnouncement = () => useContext(AnnouncementContext);

export const AnnouncementProvider = ({ children }: { children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false); // Default to false until data loads
    const [height, setHeight] = useState(40); // Standard height h-10 = 40px

    return (
        <AnnouncementContext.Provider value={{ isVisible, setIsVisible, height }}>
            {children}
        </AnnouncementContext.Provider>
    );
};
