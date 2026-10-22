import { createContext, useContext, useState } from "react";

// Lets the home-page intro hide the fixed navbar while the device is still zooming in.
const NavVisibilityContext = createContext({ hidden: false, setHidden: () => {} });

export function NavVisibilityProvider({ children }) {
  // The home page opens on the device intro, where the bar starts hidden.
  const [hidden, setHidden] = useState(() => window.location.pathname === "/" && window.scrollY < 10);
  return <NavVisibilityContext.Provider value={{ hidden, setHidden }}>{children}</NavVisibilityContext.Provider>;
}

export const useNavVisibility = () => useContext(NavVisibilityContext);
