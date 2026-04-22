# Design System Document: Liquid Glass & Tonal Precision

## 1. Overview & Creative North Star
**Creative North Star: The Ethereal Executive**
This design system moves away from the rigid, blocky constraints of traditional corporate dashboards, embracing an aesthetic of "Liquid Glass." It is designed to feel less like a software interface and more like a high-end physical installation—a precision instrument carved from crystal and light.

To break the "template" look, we utilize **intentional asymmetry**. Layouts should prioritize large, breathable negative space over dense data grids. Components should feel suspended in an airy environment, using overlapping glass layers and dramatic typographic scales to create a sense of editorial authority. Every interaction must feel fluid, professional, and bespoke.

---

## 2. Colors & Surface Philosophy

The color palette is anchored in a pristine, "hyper-clean" foundation, using the brand's deep navy and vivid red as precision accents rather than dominant washes.

### The Palette (Material Design Tokens)
*   **Surface:** `#F8F9FA` (Main backdrop)
*   **Surface Lowest:** `#FFFFFF` (Elevated glass cards)
*   **Primary:** `#000000` (Main text and high-contrast elements)
*   **On-Primary-Container:** `#7F81A2` (Deep navy accent for corporate grounding)
*   **Tertiary-Container:** `#F1414D` (The signature red dot for alerts and active status)

### The "No-Line" Rule
**Standard 1px solid borders are strictly prohibited for sectioning.** 
Boundaries must be defined through tonal shifts. A `surface-container-low` section sitting on a `surface` background provides all the separation the eye needs. This creates a softer, more integrated look that mirrors high-end industrial design.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of glass. 
1.  **Base Layer:** `surface` (#F8F9FA).
2.  **Parent Containers:** `surface-container-low` or `surface-container-high`.
3.  **Active Cards:** `surface-container-lowest` (#FFFFFF) for maximum "pop."
Nesting an inner container with a higher brightness level creates a natural sense of focus without visual clutter.

### The "Glass & Gradient" Rule
For floating navigational elements or secondary sidebars, use **Glassmorphism**:
*   **Fill:** `rgba(255, 255, 255, 0.4)`
*   **Backdrop Blur:** 20px–40px.
*   **Signature Texture:** Use a subtle linear gradient on primary CTAs (e.g., transitioning from `primary` to `primary-container`) to provide a "sheen" that flat colors cannot replicate.

---

## 3. Typography
We use a high-contrast typographic pairing to balance modern technology with editorial sophistication.

*   **Display & Headlines (Manrope):** This is our "Authority" font. Use `display-lg` (3.5rem) for main dashboard headings to create a bold, editorial entry point. The wide apertures of Manrope feel futuristic yet professional.
*   **Body & Labels (Inter/SF Pro-like):** The "Functional" font. Use `body-md` (0.875rem) for data density. Inter provides the precision required for corporate automation while maintaining the airy feel of the Liquid Glass aesthetic.

**Hierarchy Tip:** Always skip a weight or size level between adjacent text strings to ensure clear information architecture without needing lines.

---

## 4. Elevation & Depth

In this design system, depth is a function of light and translucency, not darkness.

*   **The Layering Principle:** Depth is achieved by "stacking" surface tiers. To make a card "lift" from a light gray background, simply change the card fill to pure `#FFFFFF`.
*   **Ambient Shadows:** For floating modals or "Liquid Glass" panels, use extra-diffused shadows:
    *   `box-shadow: 0 20px 40px rgba(25, 28, 29, 0.05);`
    *   Shadows should never be "black"; they should be a very low-opacity tint of the `on-surface` color.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. This creates a "breath" of a line rather than a hard edge.
*   **Roundedness:** A signature of this system is the extreme corner radius.
    *   **Default:** `1rem` (16px)
    *   **Large (Cards/Panels):** `2rem` (32px) or `3rem` (48px)
    These large radii make the UI feel "liquid" and approachable.

---

## 5. Components

### Buttons
*   **Primary:** High-contrast (`primary` fill, `on-primary` text). Use a `xl` (3rem) border-radius for a pill-shaped, premium feel.
*   **Secondary/Tertiary:** No background fill. Use a `surface-variant` hover state or the "Ghost Border" at 15% opacity.

### Input Fields
*   **Style:** Minimalist. No bottom line or box. Use a `surface-container-highest` background with a `24px` border-radius. Labels should be `label-sm` positioned above the field in a muted `on-surface-variant`.

### Cards & Lists
*   **The Divider Ban:** Strictly forbid 1px horizontal lines in lists. Use vertical white space (`spacing-xl`) or subtle background alternating tiers (`surface` to `surface-container-low`) to distinguish items.
*   **Dashboard Widgets:** Each widget should be a `surface-container-lowest` card with a soft ambient shadow and `lg` (2rem) rounded corners.

### Status Indicators (The Red Dot)
*   Inspired by the logo, use the `tertiary-container` (#F1414D) for active notifications or critical errors. It should be used sparingly—like a jewel—against the white and gray canvas.

---

## 6. Do's and Don'ts

### Do
*   **Do** use extreme whitespace. If a section feels "almost empty," it is likely perfect.
*   **Do** use fluid transitions. Every modal or state change should "flow" into position with a `cubic-bezier(0.4, 0, 0.2, 1)` easing.
*   **Do** use `display-lg` typography to anchor the top-left of a page, creating a strong editorial focus.

### Don't
*   **Don't** use pure black for shadows; it kills the "Liquid Glass" translucency.
*   **Don't** use sharp corners. Anything under 16px radius will break the "soft" brand identity.
*   **Don't** use more than two "Glass" layers deep; too much backdrop-blur will impact performance and degrade legibility.
*   **Don't** use 100% opaque borders. They are the enemy of an airy, modern interface.