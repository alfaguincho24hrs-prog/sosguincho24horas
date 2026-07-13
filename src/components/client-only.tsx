import { useSyncExternalStore, type ReactNode } from "react";

// Retorna true apenas depois da hidratação no cliente.
// Usa useSyncExternalStore para evitar warnings de mismatch.
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * Renderiza `fallback` no SSR e na primeira renderização do cliente,
 * e `children` somente após a hidratação — isola "ilhas dinâmicas"
 * do HTML servido, mantendo o documento estável e cacheável.
 */
export function ClientOnly({ children, fallback = null }: Props) {
  const hydrated = useHydrated();
  return <>{hydrated ? children : fallback}</>;
}
