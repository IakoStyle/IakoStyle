import { ref } from 'vue'

type Theme = 'light' | 'dark'

const isDark = ref<boolean>(document.documentElement.classList.contains('dark'))

export function useTheme() {
  function apply(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      isDark.value = true
    } else {
      document.documentElement.classList.remove('dark')
      isDark.value = false
    }
    localStorage.setItem('iako-theme', theme)
  }

  function toggle() {
    apply(isDark.value ? 'light' : 'dark')
  }

  return { isDark, toggle }
}
