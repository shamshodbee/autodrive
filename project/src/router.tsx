import { createContext, useContext, useEffect, useState, type ReactNode, type CSSProperties } from 'react';

type Route = { path: string; params: Record<string, string> };

interface RouterState {
  route: Route;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterState | undefined>(undefined);

function parsePath(): Route {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const [rawPath, query] = hash.split('?');
  const params: Record<string, string> = {};
  if (query) new URLSearchParams(query).forEach((v, k) => (params[k] = v));
  return { path: rawPath || '/', params };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parsePath());

  useEffect(() => {
    const onHash = () => {
      setRoute(parsePath());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    if (!window.location.hash) window.location.hash = '/';
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (path: string) => { window.location.hash = path; };

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

export function Link({
  to, children, className, onClick, style,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  const { navigate } = useRouter();
  return (
    <a
      href={`#${to}`}
      className={className}
      style={style}
      onClick={(e) => { e.preventDefault(); onClick?.(); navigate(to); }}
    >
      {children}
    </a>
  );
}
