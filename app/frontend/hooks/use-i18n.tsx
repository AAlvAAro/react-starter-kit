import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { t as translate, setLocale as setI18nLocale, getLocale, getAvailableLocales } from "@/lib/i18n"

interface I18nContextType {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string, params?: Record<string, string | number>) => string
  availableLocales: string[]
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState(getLocale())

  const setLocale = useCallback((newLocale: string) => {
    setI18nLocale(newLocale)
    setLocaleState(newLocale)
    // Store preference in localStorage
    localStorage.setItem("locale", newLocale)
  }, [])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      return translate(key, params)
    },
    [locale] // Re-render when locale changes
  )

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t,
        availableLocales: getAvailableLocales(),
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    // Return a fallback that uses the translate function directly
    return {
      locale: getLocale(),
      setLocale: setI18nLocale,
      t: translate,
      availableLocales: getAvailableLocales(),
    }
  }
  return context
}

// Simple hook for just the translation function
export function useTranslation() {
  const { t } = useI18n()
  return t
}
