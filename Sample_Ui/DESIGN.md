# Design System Specification

## 1. Overview & Creative North Star: "The Cognitive Sanctuary"

This design system is built to transform the high-anxiety environment of live interview practice into a space of focused, authoritative calm. We move beyond "SaaS Blue" by embracing **The Cognitive Sanctuary**—a creative North Star that prioritizes mental clarity through ethereal depth and editorial precision.

While many platforms rely on rigid grids and heavy borders to create structure, this system utilizes **Tonal Architecture**. We break the "template" look by using intentional asymmetry, overlapping "glass" surfaces, and a high-contrast typography scale that feels more like a premium broadsheet than a generic dashboard. The result is an interface that feels both technologically advanced and humanly supportive.

---

## 2. Colors & Surface Philosophy

Our palette is rooted in atmospheric blues and warm organic accents. We avoid flat UI by treating every surface as a physical material with varying levels of translucency.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders (`#DDD` or similar) are strictly prohibited for sectioning. Boundaries must be defined solely through background shifts. 
- *Example:* A `surface-container-low` (`#F3F3F3`) sidebar sitting against a `surface` (`#F9F9F9`) main content area. 

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of fine paper or frosted glass. Use the hierarchy below to define importance without adding visual noise:
- **Surface (Main):** `#FAFAFA` — The foundational canvas.
- **Surface-Container-Low:** `#F3F3F3` — Secondary utility areas (Sidebars, Nav).
- **Surface-Container-Lowest:** `#FFFFFF` — Primary interaction points (Cards, Inputs). This creates a "lifted" effect against the main background.
- **Glassmorphism:** `rgba(255, 255, 255, 0.55)` with a `20px` backdrop-blur. Reserved for floating navigation or overlaying performance metrics to maintain a sense of layered depth.

### Signature Textures
Main CTAs and Hero sections should utilize a subtle linear gradient: 
`Linear-Gradient(135deg, #465C97 0%, #A5BBFC 100%)`. 
This prevents the primary actions from feeling "flat" and adds a professional, light-catching polish.

---

## 3. Typography: Editorial Authority

We use a dual-typeface system to balance technical precision with approachable authority.

*   **Display & Headlines (Manrope):** Chosen for its geometric modernism. Used in `headline-lg` through `display-lg`. These should be set with tight letter-spacing (`-0.02em`) to feel like a premium publication.
*   **Body & UI (Inter):** The workhorse for readability. Used for all `body`, `label`, and `title` tokens. Inter’s tall x-height ensures clarity during high-pressure interview simulations.

**The Power Scale:**
- **Display-LG (3.5rem / 56px):** Used for "moment of truth" stats or hero value props.
- **Headline-SM (1.5rem / 24px):** Use `#0A2156` (Headings) to command attention for module titles.
- **Body-MD (0.875rem / 14px):** Use `#666` (On-Surface-Variant) for primary descriptive text to reduce eye strain.

---

## 4. Elevation & Depth: Tonal Layering

We reject traditional box-shadows in favor of **Ambient Light Simulation**.

*   **The Layering Principle:** Instead of shadows, stack `surface-container-lowest` on top of `surface-container-low`. The 2-tone shift creates a sophisticated "natural lift."
*   **Ambient Shadows:** For floating elements (Modals, Popovers), use a multi-layered shadow:
    `box-shadow: 0 4px 6px -1px rgba(10, 33, 86, 0.04), 0 10px 15px -3px rgba(10, 33, 86, 0.08);`
    *Note: The shadow uses a tint of our Heading color (#0A2156) rather than pure black to keep the UI feeling "organic."*
*   **The Ghost Border:** If a border is required for accessibility (e.g., input focus), use `outline-variant` at 20% opacity. Never use 100% opaque lines.

---

## 5. Components

### Buttons
- **Primary:** Gradient-filled (`#465C97` to `#A5BBFC`) with `9999px` (Full) roundedness. 
- **Secondary:** Surface-container-lowest (`#FFFFFF`) with a "Ghost Border."
- **Tertiary:** Text-only in `Primary` blue, used for low-priority actions like "Cancel" or "Learn More."

### Input Fields
- **Styling:** Avoid "box" looks. Use `surface-container-lowest` background with a soft `0.375rem` (md) corner radius. 
- **States:** On focus, transition the background to `surface-container-lowest` and apply a subtle glow using the `primary-fixed` (`#DAE2FF`) color.

### Cards & Lists
- **The "No Divider" Rule:** Forbid the use of horizontal lines between list items. Use `spacing-4` (1.4rem) of vertical white space or a very subtle alternate row background (`surface-container-low`) to separate content.
- **Interview Feedback Cards:** Use the `tertiary-container` (`#D2B89E`) as a soft highlight color for AI-generated tips to distinguish "Advice" from "Data."

### Specialized Component: The "Focus Glass"
A specialized container for the Live Video Feed. Use the Glassmorphism spec (55% white, blur) for the controls overlaying the video. This ensures the user’s focus remains on the person/AI, not the UI chrome.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Place a large headline on the left with a floating glass metric card overlapping the right edge of a container.
*   **Use Generous Whitespace:** If you think there’s enough space, add `spacing-2` (0.7rem) more. Space is luxury.
*   **Respect the "On-Surface" Tones:** Use `#666` for body text. Pure black is too harsh for a "Sanctuary" vibe.

### Don't:
*   **Don't Use Sharp Corners:** Avoid `none` or `sm` roundedness. Stick to `md` (6px) or `xl` (12px) to maintain a soft, approachable feel.
*   **Don't Use High-Contrast Grids:** Do not use dark borders to separate dashboard modules. Use background color steps.
*   **Don't Default to Shadows:** Always try to achieve depth via color nesting before reaching for a shadow effect.