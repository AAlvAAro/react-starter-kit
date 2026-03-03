```
 ██▀███   ▄▄▄       ██▓ ██▓      ██████     ▄▄▄       ██▓    ██ ▄█▀ ██▓▄▄▄█████▓
▓██ ▒ ██▒▒████▄    ▓██▒▓██▒    ▒██    ▒    ▒████▄    ▓██▒    ██▄█▒ ▓██▒▓  ██▒ ▓▒
▓██ ░▄█ ▒▒██  ▀█▄  ▒██▒▒██░    ░ ▓██▄      ▒██  ▀█▄  ▒██▒   ▓███▄░ ▒██▒▒ ▓██░ ▒░
▒██▀▀█▄  ░██▄▄▄▄██ ░██░▒██░      ▒   ██▒   ░██▄▄▄▄██ ░██░   ▓██ █▄ ░██░░ ▓██▓ ░
░██▓ ▒██▒ ▓█   ▓██▒░██░░██████▒▒██████▒▒    ▓█   ▓██▒░██░   ▒██▒ █▄░██░  ▒██▒ ░
░ ▒▓ ░▒▓░ ▒▒   ▓▒█░░▓  ░ ▒░▓  ░▒ ▒▓▒ ▒ ░    ▒▒   ▓▒█░░▓     ▒ ▒▒ ▓▒░▓    ▒ ░░
  ░▒ ░ ▒░  ▒   ▒▒ ░ ▒ ░░ ░ ▒  ░░ ░▒  ░ ░     ▒   ▒▒ ░ ▒ ░   ░ ░▒ ▒░ ▒ ░    ░
  ░░   ░   ░   ▒    ▒ ░  ░ ░   ░  ░  ░       ░   ▒    ▒ ░   ░ ░░ ░  ▒ ░  ░
   ░           ░  ░ ░      ░  ░      ░           ░  ░ ░     ░  ░    ░
```

> *"I'm trying to free your mind, Neo. But I can only show you the door. You're the one that has to walk through it."*
> — Morpheus

---

**Wake up, developer...** The Matrix has you. Follow the white rabbit.

A modern full-stack starter kit for building **AI-powered applications** with Rails and React. Forked from [inertia-rails/react-starter-kit](https://github.com/inertia-rails/react-starter-kit).

---

## 💊 Choose Your Pill

| 🔴 Red Pill | 🔵 Blue Pill |
|-------------|--------------|
| Clone this repo | Stay in wonderland |
| Build something real | Keep using boilerplate |
| See how deep the rabbit hole goes | Believe whatever you want |

---

## ⚡ What's Inside the Construct

```
SYSTEM LOADING...
├── [Inertia Rails]      → Seamless SPA experience
├── [Vite Rails]         → Lightning-fast builds
├── [React + TypeScript] → The One framework
├── [shadcn/ui]          → Beautiful components
├── [Authentication]     → Based on Authentication Zero
├── [Stripe]             → Payment integration
├── [Kamal]              → Deploy anywhere
└── [SSR Support]        → Optional server-side rendering
```

---

## 🖥️ Jack In

```bash
# There is no spoon... but there is a setup script
$ bin/setup

# The Matrix is loading...
$ open http://localhost:3000
```

---

## 🔮 Enabling SSR (Server-Side Rendering)

> *"You have to let it all go, Neo. Fear, doubt, and disbelief. Free your mind."*

### Step 1: Uncomment the hydration code

Open `app/frontend/entrypoints/inertia.ts`:

```ts
// Uncomment the following to enable SSR hydration:
if (el.hasChildNodes()) {
  hydrateRoot(el, createElement(App, props))
  return
}
```

### Step 2: Configure deployment

Open `config/deploy.yml` and uncomment:

```yml
servers:
  vite_ssr:
    hosts:
      - 192.168.0.1
    cmd: bundle exec vite ssr
    options:
      network-alias: vite_ssr

env:
  clear:
    INERTIA_SSR_ENABLED: true
    INERTIA_SSR_URL: "http://vite_ssr:13714"

builder:
  dockerfile: Dockerfile-ssr
```

**You are The One.** Deploy with SSR support.

---

## 🙏 Acknowledgments

> *"I didn't say it would be easy, Neo. I just said it would be the truth."*

This project is a fork of [inertia-rails/react-starter-kit](https://github.com/inertia-rails/react-starter-kit), originally created by [Evil Martians](https://evilmartians.com/).

<a href="https://evilmartians.com/?utm_source=rails-ai-kit&utm_campaign=project_page">
<img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg" alt="Built by Evil Martians" width="236" height="54">
</a>

---

## 📜 License

```
THE MATRIX HAS YOU...

This project is available as open source under the MIT License.
The original inertia-rails/react-starter-kit is also MIT licensed.

There is no spoon. There is only code.
```

[MIT License](https://opensource.org/licenses/MIT)

---

```
 END OF LINE
```
