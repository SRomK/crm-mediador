import { ref, onMounted, onUnmounted } from 'vue'

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

type Breakpoint = keyof typeof BREAKPOINTS

/**
 * useBreakpoint — reactive mobile-first breakpoint detection.
 *
 * const { isMobile, isTablet, isDesktop, current } = useBreakpoint()
 */
export function useBreakpoint() {
  const width = ref(window.innerWidth)

  function update() {
    width.value = window.innerWidth
  }

  onMounted(() => window.addEventListener('resize', update))
  onUnmounted(() => window.removeEventListener('resize', update))

  const is = (bp: Breakpoint) => width.value >= BREAKPOINTS[bp]

  return {
    width,
    isMobile: { get value() { return width.value < BREAKPOINTS.md } },
    isTablet: { get value() { return is('md') && !is('lg') } },
    isDesktop: { get value() { return is('lg') } },
    current: {
      get value(): Breakpoint | 'xs' {
        if (is('xl')) return 'xl'
        if (is('lg')) return 'lg'
        if (is('md')) return 'md'
        if (is('sm')) return 'sm'
        return 'xs'
      },
    },
    is,
  }
}
