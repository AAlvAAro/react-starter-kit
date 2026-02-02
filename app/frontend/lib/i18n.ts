/**
 * Frontend Internationalization (i18n) System
 *
 * This file provides client-side translations for React components.
 *
 * Why this exists:
 * - Rails i18n (config/locales/*.yml) only works server-side
 * - React components run in the browser and need JavaScript-based translations
 * - Inertia.js pages are client-side rendered and can't access Rails I18n.t()
 *
 * The locale is initialized from the backend via Inertia shared props and stored
 * in localStorage for persistence across page loads.
 */

type Translations = Record<string, string | Record<string, unknown>>

const translations: Record<string, Translations> = {
  "es-MX": {
    // Navigation
    "nav.dashboard": "Panel",
    "nav.settings": "Configuración",
    "nav.sign_out": "Cerrar sesión",

    // Actions
    "actions.save": "Guardar",
    "actions.cancel": "Cancelar",
    "actions.delete": "Eliminar",
    "actions.edit": "Editar",
    "actions.create": "Crear",
    "actions.search": "Buscar",
    "actions.filter": "Filtrar",
    "actions.add": "Agregar",
    "actions.back": "Volver",

    // Labels
    "labels.name": "Nombre",
    "labels.email": "Correo electrónico",
    "labels.phone": "Teléfono",
    "labels.description": "Descripción",
    "labels.price": "Precio",
    "labels.stock": "Inventario",
    "labels.category": "Categoría",
    "labels.notes": "Notas",
    "labels.actions": "Acciones",

    // Dashboard
    "dashboard.title": "Panel de control",

    // Sidebar
    "sidebar.repository": "Repositorio",
    "sidebar.documentation": "Documentación",

    // Email
    "mailer.footer": "¿Tienes preguntas? Simplemente responde a este correo y nuestro equipo de soporte te ayudará.",
    "mailer.password_reset.subject": "Restablece tu contraseña",
    "mailer.email_verification.subject": "Verifica tu correo electrónico",

    // Settings
    "settings.title": "Configuración",
    "settings.subtitle": "Administra tu perfil y configuración de cuenta",
    "settings.profile": "Perfil",
    "settings.email": "Correo electrónico",
    "settings.password": "Contraseña",
    "settings.sessions": "Sesiones",
    "settings.appearance": "Apariencia",
    "settings.profile.title": "Información del perfil",
    "settings.profile.subtitle": "Actualiza tu nombre",
    "settings.profile.name": "Nombre",
    "settings.profile.name_placeholder": "Nombre completo",
    "settings.profile.save": "Guardar",
    "settings.profile.saved": "Guardado",
    "settings.email.title": "Actualizar correo",
    "settings.email.subtitle": "Actualiza tu correo electrónico y verifícalo",
    "settings.email.label": "Correo electrónico",
    "settings.email.placeholder": "Correo electrónico",
    "settings.email.current_password": "Contraseña actual",
    "settings.email.current_password_placeholder": "Contraseña actual",
    "settings.email.unverified": "Tu correo electrónico no está verificado.",
    "settings.email.resend": "Haz clic aquí para reenviar el correo de verificación.",
    "settings.email.save": "Guardar",
    "settings.email.saved": "Guardado",
    "settings.password.title": "Actualizar contraseña",
    "settings.password.subtitle": "Asegúrate de que tu cuenta use una contraseña larga y aleatoria para mantenerse segura",
    "settings.password.current": "Contraseña actual",
    "settings.password.current_placeholder": "Contraseña actual",
    "settings.password.new": "Nueva contraseña",
    "settings.password.new_placeholder": "Nueva contraseña",
    "settings.password.confirm": "Confirmar contraseña",
    "settings.password.confirm_placeholder": "Confirmar contraseña",
    "settings.password.save": "Guardar contraseña",
    "settings.password.saved": "Guardado",
    "settings.sessions.title": "Sesiones",
    "settings.sessions.subtitle": "Administra tus sesiones activas en todos tus dispositivos",
    "settings.sessions.current": "Sesión activa",
    "settings.sessions.ip": "IP",
    "settings.sessions.active_since": "Activo desde",
    "settings.sessions.log_out": "Cerrar sesión",
    "settings.appearance.title": "Configuración de apariencia",
    "settings.appearance.subtitle": "Actualiza la configuración de apariencia de tu cuenta",
    "settings.appearance.theme": "Tema",
    "settings.appearance.light": "Claro",
    "settings.appearance.dark": "Oscuro",
    "settings.appearance.system": "Sistema",
    "settings.delete.title": "Eliminar cuenta",
    "settings.delete.subtitle": "Elimina tu cuenta y todos sus recursos",
    "settings.delete.button": "Eliminar cuenta",
    "settings.delete.warning": "Advertencia",
    "settings.delete.warning_text": "Por favor procede con precaución, esto no se puede deshacer.",

    // Auth
    "auth.sign_in": "Iniciar sesión",
    "auth.sign_up": "Registrarse",
    "auth.sign_out": "Cerrar sesión",
    "auth.forgot_password": "¿Olvidaste tu contraseña?",
    "auth.no_account": "¿No tienes cuenta?",
    "auth.have_account": "¿Ya tienes cuenta?",
    "auth.login.title": "Inicia sesión en tu cuenta",
    "auth.login.description": "Ingresa tu correo y contraseña para iniciar sesión",
    "auth.login.email": "Correo electrónico",
    "auth.login.email_placeholder": "correo@ejemplo.com",
    "auth.login.password": "Contraseña",
    "auth.login.password_placeholder": "Contraseña",
    "auth.login.button": "Iniciar sesión",
    "auth.signup.title": "Crea una cuenta",
    "auth.signup.description": "Ingresa tus datos para crear tu cuenta",
    "auth.signup.name": "Nombre",
    "auth.signup.name_placeholder": "Nombre completo",
    "auth.signup.email": "Correo electrónico",
    "auth.signup.email_placeholder": "correo@ejemplo.com",
    "auth.signup.password": "Contraseña",
    "auth.signup.password_placeholder": "Contraseña",
    "auth.signup.password_confirmation": "Confirmar contraseña",
    "auth.signup.password_confirmation_placeholder": "Confirmar contraseña",
    "auth.signup.button": "Crear cuenta",
    "auth.password_reset.title": "Olvidé mi contraseña",
    "auth.password_reset.description": "Ingresa tu correo para recibir un enlace de recuperación",
    "auth.password_reset.email": "Correo electrónico",
    "auth.password_reset.email_placeholder": "correo@ejemplo.com",
    "auth.password_reset.button": "Enviar enlace de recuperación",
    "auth.password_reset.return": "O, regresar a",
    "auth.password_reset.login": "iniciar sesión",

  },
  "en-US": {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.settings": "Settings",
    "nav.sign_out": "Sign out",

    // Actions
    "actions.save": "Save",
    "actions.cancel": "Cancel",
    "actions.delete": "Delete",
    "actions.edit": "Edit",
    "actions.create": "Create",
    "actions.search": "Search",
    "actions.filter": "Filter",
    "actions.add": "Add",
    "actions.back": "Back",

    // Labels
    "labels.name": "Name",
    "labels.email": "Email",
    "labels.phone": "Phone",
    "labels.description": "Description",
    "labels.price": "Price",
    "labels.stock": "Stock",
    "labels.category": "Category",
    "labels.notes": "Notes",
    "labels.actions": "Actions",

    // Dashboard
    "dashboard.title": "Dashboard",

    // Sidebar
    "sidebar.repository": "Repository",
    "sidebar.documentation": "Documentation",

    // Email
    "mailer.footer": "Have questions? Just reply to this email and our support team will help you out.",
    "mailer.password_reset.subject": "Reset your password",
    "mailer.email_verification.subject": "Verify your email",

    // Settings
    "settings.title": "Settings",
    "settings.subtitle": "Manage your profile and account settings",
    "settings.profile": "Profile",
    "settings.email": "Email",
    "settings.password": "Password",
    "settings.sessions": "Sessions",
    "settings.appearance": "Appearance",
    "settings.profile.title": "Profile information",
    "settings.profile.subtitle": "Update your name",
    "settings.profile.name": "Name",
    "settings.profile.save": "Save",
    "settings.email.title": "Email address",
    "settings.email.subtitle": "Update your email address",
    "settings.email.current": "Current email",
    "settings.email.new": "New email",
    "settings.email.save": "Save",
    "settings.password.title": "Update password",
    "settings.password.subtitle": "Ensure you use a secure password",
    "settings.password.current": "Current password",
    "settings.password.new": "New password",
    "settings.password.confirm": "Confirm password",
    "settings.password.save": "Save",
    "settings.sessions.title": "Active sessions",
    "settings.sessions.subtitle": "Manage your active sessions",
    "settings.sessions.current": "Active session",
    "settings.sessions.revoke": "Revoke session",
    "settings.appearance.title": "Appearance",
    "settings.appearance.subtitle": "Customize the app appearance",
    "settings.appearance.theme": "Theme",
    "settings.appearance.light": "Light",
    "settings.appearance.dark": "Dark",
    "settings.appearance.system": "System",
    "settings.delete.title": "Delete account",
    "settings.delete.subtitle": "Delete your account and all of its resources",
    "settings.delete.button": "Delete account",

    // Auth
    "auth.sign_in": "Sign in",
    "auth.sign_up": "Sign up",
    "auth.sign_out": "Sign out",
    "auth.forgot_password": "Forgot your password?",
    "auth.no_account": "Don't have an account?",
    "auth.have_account": "Already have an account?",
    "auth.login.title": "Log in to your account",
    "auth.login.description": "Enter your email and password below to log in",
    "auth.login.email": "Email address",
    "auth.login.email_placeholder": "email@example.com",
    "auth.login.password": "Password",
    "auth.login.password_placeholder": "Password",
    "auth.login.button": "Log in",
    "auth.signup.title": "Create an account",
    "auth.signup.description": "Enter your details below to create your account",
    "auth.signup.name": "Name",
    "auth.signup.name_placeholder": "Full name",
    "auth.signup.email": "Email address",
    "auth.signup.email_placeholder": "email@example.com",
    "auth.signup.password": "Password",
    "auth.signup.password_placeholder": "Password",
    "auth.signup.password_confirmation": "Confirm password",
    "auth.signup.password_confirmation_placeholder": "Confirm password",
    "auth.signup.button": "Create account",
    "auth.password_reset.title": "Forgot password",
    "auth.password_reset.description": "Enter your email to receive a password reset link",
    "auth.password_reset.email": "Email address",
    "auth.password_reset.email_placeholder": "email@example.com",
    "auth.password_reset.button": "Email password reset link",
    "auth.password_reset.return": "Or, return to",
    "auth.password_reset.login": "log in",

  },
}

let currentLocale = "es-MX"

export function setLocale(locale: string) {
  if (translations[locale]) {
    currentLocale = locale
  }
}

export function getLocale(): string {
  return currentLocale
}

export function t(key: string, params?: Record<string, string | number>): string {
  const localeTranslations = translations[currentLocale] || translations["en-US"]
  let translation = (localeTranslations[key] as string) || key

  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      translation = translation.replace(`%{${paramKey}}`, String(value))
    })
  }

  return translation
}

export function getAvailableLocales(): string[] {
  return Object.keys(translations)
}
