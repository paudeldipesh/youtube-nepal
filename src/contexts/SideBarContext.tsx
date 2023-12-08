import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SideBarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SideBarContext = createContext<SideBarContextType | null>(null);

type SideBarProviderProps = {
  children: ReactNode;
};

export function SideBarProvider({ children }: SideBarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsSmallOpen(false);
    };

    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  }, []);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen((isSmallOpen) => !isSmallOpen);
    } else {
      setIsLargeOpen((isLargeOpen) => !isLargeOpen);
    }
  }

  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }

  return (
    <SideBarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
}

export const useSideBarContext = () => {
  const value = useContext(SideBarContext);
  if (value === null) throw new Error("Cannot use outside of SideBarProvider.");
  return value;
};
