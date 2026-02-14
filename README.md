```
██████╗  █████╗ ██╗██╗     ███████╗     █████╗ ██╗    ██╗  ██╗██╗████████╗
██╔══██╗██╔══██╗██║██║     ██╔════╝    ██╔══██╗██║    ██║ ██╔╝██║╚══██╔══╝
██████╔╝███████║██║██║     ███████╗    ███████║██║    █████╔╝ ██║   ██║
██╔══██╗██╔══██║██║██║     ╚════██║    ██╔══██║██║    ██╔═██╗ ██║   ██║
██║  ██║██║  ██║██║███████╗███████║    ██║  ██║██║    ██║  ██╗██║   ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝    ╚═╝  ╚═╝╚═╝    ╚═╝  ╚═╝╚═╝   ╚═╝
```

> *"Unfortunately, no one can be told what the Matrix is. You have to see it for yourself."*
> — Morpheus

---

<p align="center">
  <img src="https://img.shields.io/badge/STACK-RAILS%20%2B%20REACT-00FF00?style=for-the-badge&labelColor=000000" alt="Stack"/>
  <img src="https://img.shields.io/badge/AI-ENABLED-00FF00?style=for-the-badge&labelColor=000000" alt="AI"/>
  <img src="https://img.shields.io/badge/STATUS-AWAKE-00FF00?style=for-the-badge&labelColor=000000" alt="Status"/>
</p>

---

**An AI-ready Rails SaaS starter kit** with Stripe, MCP integration, and modern tooling. Built on Rails + Inertia.js + React.

*Originally forked from [inertia-rails/react-starter-kit](https://github.com/inertia-rails/react-starter-kit)*

---

## 💊 Choose Your Pill

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   🔴 RED PILL                          🔵 BLUE PILL                         │
│   ──────────                           ───────────                          │
│   Clone this repo.                     Close this tab.                      │
│   Build something real.                Stay in ignorance.                   │
│   Wake up.                             The story ends.                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Features

### `> CORE_SYSTEM.exe`

```
[LOADING...]
├── Inertia Rails .............. https://inertia-rails.dev
├── Vite Rails ................. https://vite-ruby.netlify.app
├── React + TypeScript ......... https://react.dev
├── shadcn/ui .................. https://ui.shadcn.com
├── Authentication Zero ........ https://github.com/lazaronixon/authentication-zero
├── Kamal Deploy ............... https://kamal-deploy.org
└── SSR Support ................ [OPTIONAL]
[COMPLETE]
```

### `> AI_INTEGRATIONS.exe`

```
[INITIALIZING NEURAL NETWORK...]
├── FastMCP .................... Model Context Protocol for AI assistants
├── ruby_llm ................... Multi-provider LLM (OpenAI, Anthropic, Gemini)
├── Stripe ..................... Payment processing & subscriptions
├── WhatsApp Business API ...... Message delivery
└── Postmark ................... Transactional email
[NEURAL LINK ESTABLISHED]
```

---

## 🖥️ Installation

> *"I'm trying to free your mind, Neo. But I can only show you the door. You're the one that has to walk through it."*

```bash
# Step 1: Enter the Matrix
git clone <repository-url>
cd rails-ai-kit

# Step 2: Initialize the construct
bin/setup

# Step 3: Jack in
open http://localhost:3000
```

```
[CONNECTION ESTABLISHED]
[WELCOME TO THE REAL WORLD]
```

---

## 🔧 Enabling SSR

> *"There is no spoon."*

Follow the white rabbit through these steps:

### Step 1: Modify `app/frontend/entrypoints/inertia.ts`

Uncomment the hydration code:

```ts
// Uncomment the following to enable SSR hydration:
// if (el.hasChildNodes()) {
//   hydrateRoot(el, createElement(App, props))
//   return
// }
```

### Step 2: Modify `config/deploy.yml`

```yml
servers:
  # Uncomment to enable SSR:
  # vite_ssr:
  #   hosts:
  #     - 192.168.0.1
  #   cmd: bundle exec vite ssr
  #   options:
  #     network-alias: vite_ssr

# ...

env:
  clear:
    # Uncomment to enable SSR:
    # INERTIA_SSR_ENABLED: true
    # INERTIA_SSR_URL: "http://vite_ssr:13714"

# ...

builder:
  # Uncomment to enable SSR:
  # dockerfile: Dockerfile-ssr
```

```
[SSR MODULE ACTIVATED]
[RENDERING ON THE SERVER SIDE]
```

---

## 📜 License

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║   This project is available as open source under the MIT License.         ║
║                                                                           ║
║   "The Matrix is everywhere. It is all around us."                        ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

[View License](LICENSE)

---

<p align="center">
  <code>SYSTEM.EXIT(0)</code>
</p>

<p align="center">
  <sub>Wake up, Neo... The Matrix has you...</sub>
</p>
