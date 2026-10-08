import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web.
 * On web we rely on the platform hook directly after hydration via useSyncExternalStore internals
 * of React Native's useColorScheme.
 */
export function useColorScheme() {
  return useRNColorScheme() ?? 'light';
}
