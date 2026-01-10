"use client";

import { createContext, useContext, useRef, RefObject, ReactNode, useState } from "react";

interface NavbarContextType {
    categorySectionRef: RefObject<HTMLElement | null>;
    isScrolled: boolean;
    setIsScrolled: (value: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
    const categorySectionRef = useRef<HTMLElement | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <NavbarContext.Provider value={{ categorySectionRef, isScrolled, setIsScrolled }}>
            {children}
        </NavbarContext.Provider>
    );
}

export function useNavbarContext() {
    const context = useContext(NavbarContext);
    if (context === undefined) {
        throw new Error("useNavbarContext must be used within a NavbarProvider");
    }
    return context;
}
