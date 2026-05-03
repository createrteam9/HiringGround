# Design System Strategy: The Editorial Authority

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Curator."** 

In a marketplace for mock interviews, we are not just providing a service; we are staging a career intervention. To move beyond the "template" look of standard SaaS products, this system rejects the rigid, boxy grid in favor of high-end editorial layouts. We achieve this through **intentional asymmetry**, where large-scale typography breaks the container, and **layered depth**, where elements overlap to create a sense of three-dimensional space. The goal is a UI that feels like a premium business journal—authoritative, ambitious, and meticulously polished.

---

## 2. Colors & Surface Architecture
Our palette is anchored by the tension between the high-energy `primary` (#702ae1) and the clinical calm of our `surface` tiers.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established through background shifts. For example, a `surface-container-low` section should sit directly against a `surface` background. This creates a "seamless" high-end feel that mimics premium paper stocks.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the following tiers to create "nested" importance:
- **Base Layer:** `surface` (#f5f7f9) for global backgrounds.
- **Sectional Layer:** `surface-container-low` (#eef1f3) to group related content blocks.
- **Action Layer:** `surface-container-lowest` (#ffffff) for the highest-priority interactive cards, creating a natural "pop" without high-contrast lines.

### The "Glass & Gradient" Rule
To inject "soul" into the interface:
- **CTAs & Heroes:** Always use a linear gradient (45°) transitioning from `primary` (#702ae1) to `primary-container` (#b28cff).
- **Overlays:** Use `surface-container-lowest` at 70% opacity with a `backdrop-blur` of 20px. This "frosted glass" effect ensures the brand colors bleed through the interface, maintaining a cohesive atmosphere.

---

## 3. Typography: The Editorial Voice
Our typography pairing is designed to balance the approachable personality of `lexend` with the functional precision of `manrope`.

- **Display & Headlines (Lexend):** Used for "Brand Moments." These should be set with tight letter-spacing (-0.02em) to feel authoritative. Don't be afraid to use `display-lg` (3.5rem) for hero statements, allowing the text to take center stage.
- **Body & Labels (Manrope):** The workhorse font. Use `body-md` (0.875rem) for most interface text to maintain an airy, sophisticated feel.
- **Hierarchy Hint:** Large headers should often be paired with a `label-md` uppercase kicker in `secondary` (#8319da) to establish an editorial rhythm.

---

## 4. Elevation & Depth
We abandon traditional drop shadows in favor of **Tonal Layering** and **Ambient Light**.

- **The Layering Principle:** Depth is achieved by stacking. A `surface-container-lowest` card placed on a `surface-container-high` background creates immediate focal depth without a single pixel of shadow.
- **Ambient Shadows:** For floating elements (Modals, Dropdowns), use a shadow color tinted with `on-surface` (#2c2f31) at 4-6% opacity. 
    - *Formula:* `0px 20px 40px rgba(44, 47, 49, 0.06)`.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#abadaf) at 15% opacity. Never use 100% opaque borders.
- **Corner Radii:** Embrace the "Super-Ellipse." Use the `md` (1.5rem) scale for cards and the `xl` (3rem) scale for hero sections and large containers.

---

## 5. Components
All components must feel "grown" from the layout, not "pasted" on top.

### Buttons & Interaction
- **Primary Button:** Gradient fill (`primary` to `primary-container`) with a `full` (9999px) corner radius. Use `on-primary` (#f8f0ff) for text.
- **Secondary Button:** `surface-container-lowest` with a Ghost Border. High-end, subtle, and tactile.
- **Chips:** Use `secondary-container` (#e4c6ff) with `on-secondary-container` (#6900b5) text. Corners should be `md` (1.5rem).

### Form Inputs
- **Text Fields:** Abandon the four-sided box. Use a `surface-container-highest` background with a `none` border, using a bottom-only `primary` stroke (2px) only upon focus.
- **Forbid Dividers:** Never use `<hr>` tags or lines to separate list items. Use `3` (1rem) or `4` (1.4rem) spacing units from our scale to create "breathable" separation.

### Specialized Marketplace Components
- **The Mentor Card:** A `surface-container-lowest` base with an `xl` corner radius. The mentor's headshot should bleed off the top-left edge, breaking the container's grid to reinforce the editorial feel.
- **The Feedback Overlay:** A Glassmorphic panel using `surface-tint` at 5% opacity, creating a purple-tinted "frosted" pane for post-interview results.

---

## 6. Do’s and Don’ts

### Do:
- **Do** allow typography to overlap background shapes or images.
- **Do** use `16` (5.5rem) and `20` (7rem) spacing units for section margins to create "luxury" white space.
- **Do** use the `primary-dim` (#6411d5) for hover states on primary actions to maintain depth.

### Don't:
- **Don't** use 100% black text; always use `on-surface` (#2c2f31) for a softer, premium contrast.
- **Don't** use standard 4px or 8px corners. If it's not `1.5rem` or larger, it doesn't belong in this system.
- **Don't** use "Alert Red" for errors unless absolutely necessary. Use `error` (#b41340) in a `surface-container-lowest` card with a `Ghost Border` to maintain the sophisticated palette.