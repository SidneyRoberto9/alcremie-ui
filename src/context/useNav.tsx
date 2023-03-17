import { createContext, useCallback, useContext } from 'react';
import { ReactNode, useState } from 'react';

interface NavProps {
  isOpen: boolean;
  toggleNav: (state: boolean) => void;
}

interface ContextProps {
  children: ReactNode;
}

const navContext = createContext({} as NavProps);

export function NavProvider({ children }: ContextProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleNav = useCallback(
    (state: boolean) => {
      setIsOpen(state);
    },
    [isOpen],
  );

  return (
    <navContext.Provider
      value={{
        isOpen,
        toggleNav,
      }}
    >
      {children}
    </navContext.Provider>
  );
}

export function useNav() {
  const context = useContext(navContext);

  return context;
}
