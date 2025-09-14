[README.md](https://github.com/user-attachments/files/22322771/README.md)
# UI Components — AvailabilityBadge · MagicButton · PageTransition

Collection de **composants React + TypeScript + Tailwind** prêts à l’emploi.
Chaque composant est **accessible**, **typé**, et conçu pour être **copiable** en quelques lignes.

> Dossier attendu : `src/components/` contenant `AvailabilityBadge.tsx`, `MagicButton.tsx`, `PageTransition.tsx`.

---

## 🧱 Stack & prérequis
- **React 18+**, **TypeScript 5+**
- **Tailwind CSS 3+** (avec `clsx` + `tailwind-merge` recommandé)
- **Framer Motion** (uniquement pour `PageTransition`)
- **react-i18next** *(optionnel)* pour la traduction dans `MagicButton`

```bash
pnpm add clsx tailwind-merge
pnpm add framer-motion        # requis pour PageTransition
pnpm add react-i18next i18next # optionnel pour i18n de MagicButton
```

---

## 🎨 Thème (facultatif mais conseillé)
Exposez quelques variables dans `src/styles/theme.css` et mappez-les dans `tailwind.config.ts`.
```css
/* src/styles/theme.css */
:root {
  --color-bg: 255 255 255;
  --color-fg: 17 24 39;
  --color-primary: 59 130 246;
  --color-primary-foreground: 255 255 255;
}
.dark {
  --color-bg: 17 24 39;
  --color-fg: 243 244 246;
}
```
```ts
// tailwind.config.ts
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-bg))",
        foreground: "rgb(var(--color-fg))",
        primary: "rgb(var(--color-primary))",
        "primary-foreground": "rgb(var(--color-primary-foreground))",
      },
      borderRadius: { xl: "14px" },
    },
  },
};
```

---

## 📦 Fichiers & imports
```
src/
  components/
    AvailabilityBadge.tsx
    MagicButton.tsx
    PageTransition.tsx
  styles/
    theme.css       # optionnel (variables CSS)
    globals.css     # @tailwind base; components; utilities
```
**Import type :**
```tsx
import AvailabilityBadge from "@/components/AvailabilityBadge";
import MagicButton from "@/components/MagicButton";
import PageTransition from "@/components/PageTransition";
```

---

## 🧩 Composants

### 1) AvailabilityBadge
Petit badge d’état (idéal portfolio : “Disponible”). Affiche un **dot dégradé** + texte.

**Props**
| Nom  | Type        | Defaut                    | Description                               |
|------|-------------|---------------------------|-------------------------------------------|
| `text` | `string`   | `"Available for work"`    | Contenu textuel du badge.                 |
| `className` | `string?` | —                     | Classes Tailwind additionnelles.          |

**Exemple**
```tsx
<AvailabilityBadge />
<AvailabilityBadge text="Disponible pour missions" className="ml-2" />
```

**Accessibilité**
- Élément inline (`<span>`) avec dot décoratif, texte lisible et contrasté.
- Respecte la taille de police héritée du conteneur.

---

### 2) MagicButton
Bouton **polymorphe** (peut servir d’action, de lien, ou d’icône seulement) avec **anneau conique animé**. Support **i18n** (facultatif).

**Props principales**
| Nom | Type | Défaut | Description |
|-----|------|--------|-------------|
| `title` | `React.ReactNode` | — | Contenu textuel si pas d’i18n. |
| `i18nKey` | `string?` | — | Clé de traduction `react-i18next`. |
| `ariaLabelKey` | `string?` | — | Clé i18n pour aria-label (mode `iconOnly`). |
| `i18nNs` | `string` | `"common"` | Namespace i18n. |
| `values` | `Record<string, unknown>?` | — | Variables d’interpolation i18n. |
| `icon` | `React.ReactNode?` | — | Icône optionnelle. |
| `position` | `"left"\|"right"` | `"right"` | Position de l’icône. |
| `gradient` | `"brand"\|"purple"` | `"brand"` | Style de l’anneau animé. |
| `size` | `"sm"\|"md"\|"lg"` | `"md"` | Tailles prédéfinies. |
| `fullWidth` | `boolean?` | `false` | Largeur 100%. |
| `loading` | `boolean?` | `false` | Spinner interne + `aria-busy`. |
| `disabled` | `boolean?` | `false` | État désactivé. |
| `iconOnly` | `boolean?` | `false` | Rend un bouton carré sans texte. |
| `ariaLabel` | `string?` | — | Libellé accessible si `iconOnly`. |
| `className` | `string?` | — | Classes supplémentaires. |
| `as` | `"button"\|"a"\|"link"` | `"button"` | Mode (action, lien externe, lien routeur). |
| `href` | `string?` | — | Cible si `as="a"`. |
| `to` | `string?` | — | Cible si `as="link"` (react-router). |
| `onClick` | `() => void` | — | Handler clic en mode bouton. |

> **Règle d’accessibilité** : en mode `iconOnly`, fournissez `ariaLabel` **ou** `ariaLabelKey`.

**Exemples**
```tsx
// Bouton primaire
<MagicButton title="Contact" onClick={openModal} />

// Bouton avec icône à gauche
<MagicButton title="Github" icon={<GitHub />} position="left" />

// Lien externe
<MagicButton as="a" href="https://example.com" title="Voir plus" />

// Lien routeur (react-router-dom)
<MagicButton as="link" to="/projects" title="Mes projets" fullWidth />

// Icon only (accessibilité obligatoire)
<MagicButton icon={<Plus />} iconOnly ariaLabel="Ajouter un item" />
```

**i18n (optionnel)**
```tsx
// i18n/common.json
// { "contact": "Me contacter", "add": "Ajouter" }
<MagicButton i18nKey="contact" />
<MagicButton icon={<Plus />} iconOnly ariaLabelKey="add" />
```

---

### 3) PageTransition
Transition **entre pages** basée sur **Framer Motion** : fondu + léger slide. Compatible **route change**.

**Props**
| Nom | Type | Défaut | Description |
|-----|------|--------|-------------|
| `duration` | `number?` | `0.35` | Durée de l’animation en secondes. |
| `easing` | `number[]?` | `[0.22,1,0.36,1]` | Cubic Bézier. |
| `className` | `string?` | — | Classes additionnelles. |
| `children` | `React.ReactNode` | — | Contenu de la page. |

**Usage (Next.js / React Router)**
```tsx
import { useLocation } from "react-router-dom";

function AppShell() {
  const { pathname } = useLocation();
  return (
    <PageTransition key={pathname}>
      <Outlet /> {/* votre route active */}
    </PageTransition>
  );
}
```

**Usage simple (section)**
```tsx
<PageTransition>
  <section className="prose">
    <h1>À propos</h1>
    <p>Bienvenue sur mon portfolio.</p>
  </section>
</PageTransition>
```

---

## 🔍 Exemples d’intégration (page démo)
```tsx
export default function ComponentsDemo() {
  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">Loan Lavigne</h1>
        <AvailabilityBadge text="Disponible pour missions" />
      </header>

      <div className="flex flex-wrap gap-3">
        <MagicButton title="Contact" />
        <MagicButton title="Github" icon={<GitHub />} position="left" />
        <MagicButton as="a" href="https://example.com" title="Voir plus" />
        <MagicButton icon={<Plus />} iconOnly ariaLabel="Ajouter" />
      </div>

      <PageTransition>
        <div className="rounded-xl border p-4">
          <h2 className="text-lg font-semibold">Bloc avec transition</h2>
          <p>Ce contenu entre/sort avec une animation douce.</p>
        </div>
      </PageTransition>
    </div>
  );
}
```

---

## ♿ Accessibilité (règles appliquées)
- **Focus visible** par défaut avec Tailwind (`focus-visible:ring-2` recommandé).
- **Aria** : `aria-busy` quand `loading`, `aria-label` requis en `iconOnly`.
- **Couleurs** : maintenir un contraste AA pour le texte des boutons/badges.

---

## 🧪 Qualité & tests rapides
- Vérifiez que `MagicButton` respecte `disabled` + `loading` (pas de double submit).
- Testez la **navigabilité clavier** (Tab, Shift+Tab) sur tous les boutons.
- Sur `PageTransition`, vérifiez que le `key` change bien à chaque route.

---

## ❓ FAQ
**Pourquoi Tailwind et pas CSS-in-JS ?**  
Pour aller vite, garder un design system cohérent et limiter le runtime côté client.



