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
    "nav.catalog": "Catálogo",
    "nav.orders": "Pedidos",
    "nav.customers": "Clientes",
    "nav.insights": "Estadísticas",
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
    "dashboard.welcome": "Bienvenido de nuevo",
    "dashboard.total_products": "Total de productos",
    "dashboard.orders_this_week": "Pedidos esta semana",
    "dashboard.catalog_views": "Vistas del catálogo",

    // Catalog
    "catalog.title": "Catálogo",
    "catalog.subtitle": "Administra tu catálogo de productos y colecciones",
    "catalog.new_product": "Nuevo producto",
    "catalog.add_product": "Agregar producto",
    "catalog.search_products": "Buscar productos...",
    "catalog.no_products": "No se encontraron productos",
    "catalog.no_products_hint": "Comienza agregando tu primer producto al catálogo.",
    "catalog.product_name": "Nombre del producto",
    "catalog.sku": "SKU",

    // Customers
    "customers.title": "Clientes",
    "customers.subtitle": "Administra las relaciones con tus clientes",
    "customers.new_customer": "Nuevo cliente",
    "customers.add_customer": "Agregar cliente",
    "customers.search_customers": "Buscar clientes...",
    "customers.no_customers": "No se encontraron clientes",
    "customers.no_customers_hint": "Comienza agregando tu primer cliente.",
    "customers.orders": "Pedidos",
    "customers.total_spent": "Total gastado",

    // Insights
    "insights.title": "Estadísticas",
    "insights.subtitle": "Analiza el rendimiento de tu negocio",
    "insights.total_revenue": "Ingresos totales",
    "insights.total_orders": "Total de pedidos",
    "insights.total_customers": "Total de clientes",
    "insights.conversion_rate": "Tasa de conversión",
    "insights.top_products": "Productos más vendidos",

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

    // Landing - Navbar
    "landing.nav.features": "Características",
    "landing.nav.pricing": "Precios",
    "landing.nav.how_it_works": "Cómo funciona",
    "landing.nav.log_in": "Iniciar sesión",
    "landing.nav.get_started": "Comenzar gratis",

    // Landing - Hero
    "landing.hero.badge": "Ahora disponible en México, Colombia y Argentina",
    "landing.hero.title": "Tu catálogo, en piloto automático",
    "landing.hero.subtitle": "Crea un catálogo de productos compartible en minutos. Recibe pedidos por WhatsApp. Sincroniza con Instagram y TikTok. Sin código, sin complicaciones.",
    "landing.hero.cta_primary": "Crea tu catálogo gratis",
    "landing.hero.cta_secondary": "Ver cómo funciona",
    "landing.hero.free_note": "Gratis para siempre hasta 15 productos. Sin tarjeta de crédito.",

    // Landing - Features
    "landing.features.title": "Todo lo que necesitas para vender en línea",
    "landing.features.subtitle": "Desde la creación del catálogo hasta la gestión de pedidos, te tenemos cubierto con herramientas diseñadas para la simplicidad.",
    "landing.features.catalog_link.title": "Link de catálogo compartible",
    "landing.features.catalog_link.desc": "Crea un catálogo de productos hermoso y compártelo en cualquier lugar — bio de WhatsApp, Instagram, o códigos QR impresos.",
    "landing.features.whatsapp.title": "Pedidos por WhatsApp",
    "landing.features.whatsapp.desc": "Los clientes agregan al carrito y pagan por WhatsApp. Recibes pedidos al instante, sin integración de pagos necesaria.",
    "landing.features.meta_sync.title": "Sincronización con Meta y TikTok",
    "landing.features.meta_sync.desc": "Publica tu catálogo directamente en Instagram Shop, Facebook Shop y TikTok con un clic.",
    "landing.features.profile.title": "Perfil de negocio",
    "landing.features.profile.desc": "Muestra tu marca con logo, descripción, información de contacto y redes sociales — como una tarjeta de presentación digital.",
    "landing.features.insights.title": "Estadísticas con IA",
    "landing.features.insights.badge": "Próximamente",
    "landing.features.insights.desc": "Obtén sugerencias inteligentes para mejorar tu catálogo, optimizar precios y aumentar ventas.",
    "landing.features.dashboard.title": "Panel simple",
    "landing.features.dashboard.desc": "Rastrea pedidos, vistas y productos más vendidos desde un panel limpio. Sin hojas de cálculo.",

    // Landing - How it works
    "landing.how.title": "Listo en 3 pasos",
    "landing.how.subtitle": "No se requieren habilidades técnicas. Si puedes usar WhatsApp, puedes usar CatalogoPro.",
    "landing.how.step1.title": "Crea tu catálogo",
    "landing.how.step1.desc": "Agrega tus productos, precios y fotos. Organiza por categoría. Solo toma minutos para comenzar.",
    "landing.how.step2.title": "Comparte tu link",
    "landing.how.step2.desc": "Envía tu link de catálogo por WhatsApp, agrégalo a tu bio de Instagram, o imprime un código QR para tu tienda.",
    "landing.how.step3.title": "Recibe pedidos",
    "landing.how.step3.desc": "Los clientes navegan, agregan al carrito y ordenan por WhatsApp. Recibes notificaciones al instante en tu teléfono.",

    // Landing - Pricing
    "landing.pricing.title": "Precios simples y transparentes",
    "landing.pricing.subtitle": "Comienza gratis, actualiza cuando estés listo. Sin cargos ocultos, sin sorpresas.",
    "landing.pricing.most_popular": "Más popular",
    "landing.pricing.free.name": "Gratis",
    "landing.pricing.free.price": "$0",
    "landing.pricing.free.period": "/siempre",
    "landing.pricing.free.desc": "Perfecto para comenzar",
    "landing.pricing.free.cta": "Comenzar gratis",
    "landing.pricing.free.f1": "Hasta 15 productos",
    "landing.pricing.free.f2": "Link de catálogo compartible",
    "landing.pricing.free.f3": "Link básico de WhatsApp",
    "landing.pricing.free.f4": "Perfil de negocio",
    "landing.pricing.free.f5": "Analíticas básicas",
    "landing.pricing.pro.name": "Pro",
    "landing.pricing.pro.price": "$9",
    "landing.pricing.pro.period": "/por mes",
    "landing.pricing.pro.desc": "Para negocios en crecimiento",
    "landing.pricing.pro.cta": "Iniciar prueba Pro",
    "landing.pricing.pro.f1": "Hasta 50 productos",
    "landing.pricing.pro.f2": "Notificaciones de pedidos por WhatsApp",
    "landing.pricing.pro.f3": "Sincronización con Meta",
    "landing.pricing.pro.f4": "Dominio personalizado",
    "landing.pricing.pro.f5": "Soporte prioritario",
    "landing.pricing.pro.f6": "Analíticas avanzadas",
    "landing.pricing.business.name": "Empresarial",
    "landing.pricing.business.price": "$29",
    "landing.pricing.business.period": "/por mes",
    "landing.pricing.business.desc": "Para tiendas establecidas",
    "landing.pricing.business.cta": "Contactar ventas",
    "landing.pricing.business.f1": "Productos ilimitados",
    "landing.pricing.business.f2": "Todo en Pro",
    "landing.pricing.business.f3": "Sincronización con TikTok",
    "landing.pricing.business.f4": "Estadísticas y sugerencias con IA",
    "landing.pricing.business.f5": "Múltiples catálogos",
    "landing.pricing.business.f6": "Gerente de cuenta dedicado",

    // Landing - Testimonials
    "landing.testimonials.title": "Amado por pequeños negocios",
    "landing.testimonials.subtitle": "Únete a cientos de emprendedores que han simplificado sus ventas en línea con CatalogoPro.",
    "landing.testimonials.quote1": "CatalogoPro cambió cómo manejo mi negocio. Solía pasar horas gestionando pedidos en WhatsApp — ahora todo está automatizado.",
    "landing.testimonials.quote2": "A mis clientes les encanta lo fácil que es navegar y ordenar. Las ventas aumentaron 40% en el primer mes después de cambiar a CatalogoPro.",
    "landing.testimonials.quote3": "Por fin, una herramienta que entiende cómo vendemos en Latinoamérica. La integración con WhatsApp es exactamente lo que necesitábamos.",

    // Landing - CTA
    "landing.cta.title": "¿Listo para simplificar tus ventas?",
    "landing.cta.subtitle": "Únete a miles de emprendedores que ya usan CatalogoPro para vender más.",
    "landing.cta.button": "Crea tu catálogo gratis",

    // Landing - Social Proof
    "landing.social_proof.trusted_by": "Con la confianza de",
    "landing.social_proof.businesses": "pequeños negocios en Latinoamérica",

    // Landing - Footer
    "landing.footer.product": "Producto",
    "landing.footer.company": "Empresa",
    "landing.footer.legal": "Legal",
    "landing.footer.about": "Acerca de",
    "landing.footer.blog": "Blog",
    "landing.footer.careers": "Empleos",
    "landing.footer.contact": "Contacto",
    "landing.footer.privacy": "Privacidad",
    "landing.footer.terms": "Términos",
    "landing.footer.cookies": "Cookies",
    "landing.footer.rights": "Todos los derechos reservados.",
  },
  "en-US": {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.catalog": "Catalog",
    "nav.orders": "Orders",
    "nav.customers": "Customers",
    "nav.insights": "Insights",
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
    "dashboard.welcome": "Welcome back",
    "dashboard.total_products": "Total Products",
    "dashboard.orders_this_week": "Orders This Week",
    "dashboard.catalog_views": "Catalog Views",

    // Catalog
    "catalog.title": "Catalog",
    "catalog.subtitle": "Manage your product catalog and collections",
    "catalog.new_product": "New Product",
    "catalog.add_product": "Add Product",
    "catalog.search_products": "Search products...",
    "catalog.no_products": "No products found",
    "catalog.no_products_hint": "Get started by adding your first product to the catalog.",
    "catalog.product_name": "Product Name",
    "catalog.sku": "SKU",

    // Customers
    "customers.title": "Customers",
    "customers.subtitle": "Manage your customer relationships",
    "customers.new_customer": "New Customer",
    "customers.add_customer": "Add Customer",
    "customers.search_customers": "Search customers...",
    "customers.no_customers": "No customers found",
    "customers.no_customers_hint": "Get started by adding your first customer.",
    "customers.orders": "Orders",
    "customers.total_spent": "Total Spent",

    // Insights
    "insights.title": "Insights",
    "insights.subtitle": "Analyze your business performance",
    "insights.total_revenue": "Total Revenue",
    "insights.total_orders": "Total Orders",
    "insights.total_customers": "Total Customers",
    "insights.conversion_rate": "Conversion Rate",
    "insights.top_products": "Top Selling Products",

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

    // Landing - Navbar
    "landing.nav.features": "Features",
    "landing.nav.pricing": "Pricing",
    "landing.nav.how_it_works": "How it works",
    "landing.nav.log_in": "Log in",
    "landing.nav.get_started": "Get started free",

    // Landing - Hero
    "landing.hero.badge": "Now available in Mexico, Colombia & Argentina",
    "landing.hero.title": "Your catalog, on autopilot",
    "landing.hero.subtitle": "Create a shareable product catalog in minutes. Receive orders via WhatsApp. Sync to Instagram and TikTok. No coding, no complexity.",
    "landing.hero.cta_primary": "Create your free catalog",
    "landing.hero.cta_secondary": "See how it works",
    "landing.hero.free_note": "Free forever for up to 15 products. No credit card required.",

    // Landing - Features
    "landing.features.title": "Everything you need to sell online",
    "landing.features.subtitle": "From catalog creation to order management, we've got you covered with tools designed for simplicity.",
    "landing.features.catalog_link.title": "Shareable Catalog Link",
    "landing.features.catalog_link.desc": "Create a beautiful product catalog and share it anywhere — WhatsApp bio, Instagram bio, or printed QR codes.",
    "landing.features.whatsapp.title": "WhatsApp Ordering",
    "landing.features.whatsapp.desc": "Customers add to cart and checkout via WhatsApp. You receive orders instantly, no payment integration needed.",
    "landing.features.meta_sync.title": "Meta & TikTok Sync",
    "landing.features.meta_sync.desc": "Publish your catalog directly to Instagram Shop, Facebook Shop, and TikTok with one click.",
    "landing.features.profile.title": "Business Profile",
    "landing.features.profile.desc": "Showcase your brand with logo, description, contact info, and social links — like a digital business card.",
    "landing.features.insights.title": "AI Insights",
    "landing.features.insights.badge": "Coming soon",
    "landing.features.insights.desc": "Get smart suggestions to improve your catalog, optimize pricing, and boost sales.",
    "landing.features.dashboard.title": "Simple Dashboard",
    "landing.features.dashboard.desc": "Track orders, views, and top products from one clean dashboard. No spreadsheets required.",

    // Landing - How it works
    "landing.how.title": "Up and running in 3 steps",
    "landing.how.subtitle": "No technical skills required. If you can use WhatsApp, you can use CatalogoPro.",
    "landing.how.step1.title": "Create your catalog",
    "landing.how.step1.desc": "Add your products, prices, and photos. Organize by category. It takes just minutes to get started.",
    "landing.how.step2.title": "Share your link",
    "landing.how.step2.desc": "Send your catalog link via WhatsApp, add it to your Instagram bio, or print a QR code for your store.",
    "landing.how.step3.title": "Receive orders",
    "landing.how.step3.desc": "Customers browse, add to cart, and order via WhatsApp. You get notified instantly on your phone.",

    // Landing - Pricing
    "landing.pricing.title": "Simple, transparent pricing",
    "landing.pricing.subtitle": "Start free, upgrade when you're ready. No hidden fees, no surprises.",
    "landing.pricing.most_popular": "Most popular",
    "landing.pricing.free.name": "Free",
    "landing.pricing.free.price": "$0",
    "landing.pricing.free.period": "/forever",
    "landing.pricing.free.desc": "Perfect for getting started",
    "landing.pricing.free.cta": "Get started free",
    "landing.pricing.free.f1": "Up to 15 products",
    "landing.pricing.free.f2": "Shareable catalog link",
    "landing.pricing.free.f3": "Basic WhatsApp link",
    "landing.pricing.free.f4": "Business profile",
    "landing.pricing.free.f5": "Basic analytics",
    "landing.pricing.pro.name": "Pro",
    "landing.pricing.pro.price": "$9",
    "landing.pricing.pro.period": "/per month",
    "landing.pricing.pro.desc": "For growing businesses",
    "landing.pricing.pro.cta": "Start Pro trial",
    "landing.pricing.pro.f1": "Up to 50 products",
    "landing.pricing.pro.f2": "WhatsApp order notifications",
    "landing.pricing.pro.f3": "Meta catalog sync",
    "landing.pricing.pro.f4": "Custom domain",
    "landing.pricing.pro.f5": "Priority support",
    "landing.pricing.pro.f6": "Advanced analytics",
    "landing.pricing.business.name": "Business",
    "landing.pricing.business.price": "$29",
    "landing.pricing.business.period": "/per month",
    "landing.pricing.business.desc": "For established stores",
    "landing.pricing.business.cta": "Contact sales",
    "landing.pricing.business.f1": "Unlimited products",
    "landing.pricing.business.f2": "Everything in Pro",
    "landing.pricing.business.f3": "TikTok catalog sync",
    "landing.pricing.business.f4": "AI insights & suggestions",
    "landing.pricing.business.f5": "Multiple catalogs",
    "landing.pricing.business.f6": "Dedicated account manager",

    // Landing - Testimonials
    "landing.testimonials.title": "Loved by small businesses",
    "landing.testimonials.subtitle": "Join hundreds of entrepreneurs who've simplified their online sales with CatalogoPro.",
    "landing.testimonials.quote1": "CatalogoPro changed how I run my business. I used to spend hours managing orders on WhatsApp — now everything is automated.",
    "landing.testimonials.quote2": "My customers love how easy it is to browse and order. Sales increased 40% in the first month after switching to CatalogoPro.",
    "landing.testimonials.quote3": "Finally, a tool that understands how we actually sell in Latin America. WhatsApp integration is exactly what we needed.",

    // Landing - CTA
    "landing.cta.title": "Ready to simplify your sales?",
    "landing.cta.subtitle": "Join thousands of entrepreneurs already using CatalogoPro to sell more.",
    "landing.cta.button": "Create your free catalog",

    // Landing - Social Proof
    "landing.social_proof.trusted_by": "Trusted by",
    "landing.social_proof.businesses": "small businesses across Latin America",

    // Landing - Footer
    "landing.footer.product": "Product",
    "landing.footer.company": "Company",
    "landing.footer.legal": "Legal",
    "landing.footer.about": "About",
    "landing.footer.blog": "Blog",
    "landing.footer.careers": "Careers",
    "landing.footer.contact": "Contact",
    "landing.footer.privacy": "Privacy",
    "landing.footer.terms": "Terms",
    "landing.footer.cookies": "Cookies",
    "landing.footer.rights": "All rights reserved.",
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
