---
name: Kaesar Adam Rafano — Portfolio
description: A cooled-magma editorial portfolio — rock-strata calm with one molten seam.
colors:
  ember: "#D9481E"
  ember-deep: "#B03A16"
  paper: "#ECEBE6"
  surface: "#E6E4DD"
  ink: "#1B1A17"
  ink-soft: "#57544C"
  ink-faint: "#6B6760"
  line: "#D2CFC6"
typography:
  display:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3rem, 9vw, 7.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  display-mega:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(4.5rem, 18vw, 16rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.16em"
  label-micro:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.16em"
rounded:
  none: "0px"
  sm: "3px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "120px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
  button-primary-hover:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.paper}"
  chip-inquiry:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
  chip-inquiry-selected:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
---

# Design System: Kaesar Adam Rafano — Portfolio

## Overview

**Creative North Star: "The Strata"**

The portfolio is a cross-section of cooled rock. Magma cools into layered stone; this
surface reads like that geology — calm, banded horizontal layers of pale mineral paper, each
section a stratum separated by a fine hairline, with a single molten seam of ember running
through where heat still lives. The mood is quiet, technical, and editorial: a light,
confident ground where big typography and generous whitespace do the work, and colour is
withheld until it means something. It is the opposite of the loud dark-photo hero it
replaces — the artefact (the work) leads, the interface recedes.

This is an **Experience** surface. A recruiter should feel craft and calm within one
viewport: a near-white page, an oversized name, and one warm ember line that signals there is
heat under the composure. Restraint is the whole point — the page earns attention by being
unhurried and precise, not by shouting.

**Key Characteristics:**
- Light, cool-neutral mineral ground (never warm cream); ink-charcoal text.
- Horizontal strata: sections banded and divided by 1px hairlines, not boxed in cards.
- One molten accent (ember), used surgically — the rarer it is, the hotter it reads.
- Oversized grotesque display against small monospace index labels.
- Calm, single-grammar motion: content rises and un-blurs into place; nothing bounces.

## Colors

A near-monochrome mineral palette — pale stone and ink — cut by a single molten accent.

### Primary
- **Ember** (`#D9481E` light / `#FF6A38` dark): the molten seam. Active section index, links
  on hover, the strata seam-tick, one hero underline, selected inquiry chip. The one hot
  colour in a cool room.
- **Ember Deep** (`#B03A16` light / `#FF824F` dark): text-weight ember for links and small
  ember labels where the bright ember would drop below 4.5:1 on paper.

### Neutral
- **Paper** (`#ECEBE6` light / `#121110` dark): the dominant page ground — cooled pale stone,
  or basalt at night.
- **Surface** (`#E6E4DD` light / `#1A1917` dark): alternating stratum ground, one shade
  deeper, to band sections without borders.
- **Ink** (`#1B1A17` light / `#ECEAE3` dark): display and primary text.
- **Ink Soft** (`#57544C` light / `#A6A29A` dark): body and secondary text.
- **Ink Faint** (`#6B6760` light / `#837E74` dark): mono labels, captions, divider tick text.
  Tuned to hold ≥4.5:1 on its ground so the small mono labels stay legible.
- **Line** (`#D2CFC6` light / `#2A2824` dark): the hairline that separates every stratum.

### Named Rules
**The Molten Seam Rule.** Ember covers ≤5% of any viewport. It is a seam, never a fill — no
ember backgrounds on large regions, no ember-tinted sections. Its scarcity is the heat.
**The No Warm Cream Rule.** The ground is cool mineral stone, not cream/ivory/parchment. If a
swatch looks like paper for a book, it drifted; pull it cooler and greyer.

## Typography

**Display Font:** Hanken Grotesk (with system-ui, sans-serif)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)

**Character:** One confident grotesque carries display and body; hierarchy comes from weight
(800 vs 400) and scale, not from a second face. Monospace appears only as index and
measurement (section numbers, dates, metadata) — never as decorative "tech" styling. Emphasis
inside prose uses the grotesque's true *italic*, echoing the reference's italic accents.

### Hierarchy
- **Display** (800, `clamp(3rem, 9vw, 7.5rem)`, lh 0.92, ls -0.04em): hero name and contact
  headline. One or two per page.
- **Display Mega** (800, `clamp(4.5rem, 18vw, 16rem)`, lh 1, ls -0.05em): the giant `surface`-
  toned footer name only; a single quiet close, not a heading.
- **Headline** (700, `clamp(1.6rem, 3.2vw, 2.4rem)`, lh 1.05, ls -0.02em): section titles.
- **Title** (700, `1.05rem`, lh 1.3): project and role names.
- **Body** (400, `1.0625rem`, lh 1.65, measure 65–72ch): paragraphs and descriptions.
- **Label** (500 mono, `0.6875rem`, ls 0.16em, UPPERCASE): section numbers, dates, field
  labels, metadata ticks.
- **Label Micro** (500 mono, `0.625rem`, ls 0.16em, UPPERCASE): the smallest metadata — tech
  tags, footer meta, dense captions where the 11px label would crowd.

### Named Rules
**The Index Rule.** Numbers that order the page (00–05, project indices, dates) are always
monospace; everything a person reads for meaning is the grotesque.

## Layout

A single centered column, `max-width: 78rem`, gutters `1.5rem` mobile / `3rem` desktop.
Sections are full-bleed horizontal **strata**: alternating `paper` and `surface` grounds,
each opening with a hairline divider that carries a mono section number and a short ember
tick. Vertical rhythm is generous — section padding steps up to ~`120px` on desktop — and
there is always more space above a heading than below it. Content grids are asymmetric
editorial splits (e.g. `1fr` text beside a narrower meta column, or a wide project row with a
right-aligned index), never a wall of equal cards. Mobile collapses every split to one column
and keeps the strata bands and hairlines intact.

## Elevation & Depth

Flat by default. Depth is tonal and linear — the one-shade band between `paper` and
`surface`, and the `line` hairline — not shadow. Shadows appear only as a soft, warm response
to state (a project row or the resume button lifting on hover), never as ambient decoration.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 18px 40px -18px rgba(20,14,10,0.28)`): hover only, on interactive
  rows/buttons. Warm-tinted, offset, blurred — never a zero-offset halo.

### Named Rules
**The Flat Strata Rule.** At rest the page is layers of flat stone. If a surface has a shadow
while idle, remove it; the hairline does the separating.

## Shapes

Hard, geological edges. Radius is `0` for structural elements — buttons, inputs, image
frames, section blocks — echoing cut rock and cross-sections. The only curved form is the
`pill` (999px) reserved for small toggles and the inquiry chips, so roundness reads as a
deliberate interactive signal, not a default softness. Images sit in clean rectangular frames
with a 1px `line` border, no rounding.

## Components

### Buttons
- **Shape:** square (0 radius).
- **Primary:** `ink` ground, `paper` text, padding `16px 28px`, mono-adjacent label. The
  send/CTA action.
- **Hover / Focus:** ground transitions to `ember`; subtle `Lift` shadow. Focus-visible shows
  a 2px `ember` outline offset from the edge.
- **Ghost/link:** underlined text in `ink`; underline and text shift to `ember-deep` on hover.

### Chips (inquiry type)
- **Style:** `pill`, `paper` ground, 1px `line` border, `ink-soft` text.
- **State:** selected fills `ember` with `paper` text and no border; unselected hover lifts
  text to `ink` and border to `ink-faint`. Toggle (click again to clear).

### Cards / Containers
- Prefer **rows and strata over cards.** When a bounded block is unavoidable (project entry),
  it is a square-cornered frame on the section ground with a 1px `line` border and a mono
  index in the corner — never a floating rounded shadowed card, never nested.
- **Internal Padding:** `32px` desktop, `24px` mobile.

### Inputs / Fields
- **Style:** square, `paper` ground, 1px `line` border, mono uppercase label above.
- **Focus:** border shifts to `ember`; no glow.
- **Error/Disabled:** error border `ember-deep` with a mono helper line; disabled drops text
  to `ink-faint`.

### Navigation
- **Style:** minimal top bar — `KAR` mark left, a short mono index of sections + theme toggle
  + resume right. No pill container; links are mono labels.
- **States:** default `ink-faint`; hover `ink`; active section `ember`. Mobile collapses the
  section index into a slide-down sheet on the `paper` ground.

### Strata Divider (signature)
A full-width 1px `line` opening each section, carrying a left-aligned mono section number
(`01`) and a short 24px `ember` tick segment butting into the line — the molten seam surfacing
between rock layers. This is the page's recurring identity mark.

## Do's and Don'ts

### Do:
- **Do** keep the ground cool mineral stone (`#ECEBE6` / basalt `#121110`) and let ink + space
  carry the page.
- **Do** ration ember to seams, ticks, active states, and hovers — ≤5% of any viewport.
- **Do** band sections as alternating `paper`/`surface` strata split by the 1px hairline.
- **Do** set every ordering number and date in JetBrains Mono; set everything readable in
  Hanken Grotesk.
- **Do** give motion one grammar: rise + un-blur on reveal, exponential ease-out, from an
  already-visible default.

### Don't:
- **Don't** reintroduce warm cream, parchment, or ivory grounds, or a serif display.
- **Don't** fill regions with ember or tint whole sections warm; the seam must stay thin.
- **Don't** wrap content in floating rounded shadowed cards, or nest cards.
- **Don't** use monospace for running text or as generic "technical" decoration.
- **Don't** scatter hover animations; one authored motion, not many.
