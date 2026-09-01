/**
 * atmosphere.js
 * Everything that makes the void feel alive:
 *   · a three-layer parallax starfield on <canvas>
 *   · a cursor spotlight that lights the nebula
 *   · scroll-triggered reveals
 *   · magnetic buttons, header state, reading progress
 *
 * Every effect is a no-op under `prefers-reduced-motion`.
 */
;(() => {
  if (window.__atmosphere) return
  window.__atmosphere = true

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  const calm = () => motionQuery.matches
  const lerp = (a, b, t) => a + (b - a) * t

  /* ─── Starfield ──────────────────────────────────────────────
     The canvas is re-created by every view transition, so this rebinds
     to whichever canvas is currently in the document. Star positions and
     parallax drift are kept in module scope, so the sky carries over
     between pages instead of reshuffling. */
  let stars = []
  let rafId = null
  let pointer = { x: 0, y: 0 }
  let drift = { x: 0, y: 0 }
  let scrollBound = false

  let canvas = null
  let ctx = null
  let width = 0
  let height = 0
  let skyBound = false

  function buildStars(w, h) {
    // Three depth layers: far/faint/slow → near/bright/fast
    const layers = [
      { count: Math.round((w * h) / 16000), size: 0.8, depth: 0.12, alpha: 0.5 },
      { count: Math.round((w * h) / 38000), size: 1.2, depth: 0.3, alpha: 0.75 },
      { count: Math.round((w * h) / 95000), size: 1.9, depth: 0.6, alpha: 1 },
    ]

    return layers.flatMap((layer) =>
      Array.from({ length: layer.count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: layer.size * (0.6 + Math.random() * 0.7),
        depth: layer.depth,
        base: layer.alpha * (0.35 + Math.random() * 0.65),
        // Twinkle phase and speed, so no two stars pulse together
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.1,
        // A rare few stars burn a touch brighter or dimmer than the rest
        hue: Math.random() < 0.16 ? "255,255,255" : Math.random() < 0.05 ? "196,196,204" : "244,244,245",
      })),
    )
  }

  function sizeCanvas() {
    if (!canvas || !ctx) return
    // 1x is deliberate: the bitmap is a field of sub-pixel dots, and a 2x
    // backing store costs 4x the GPU memory for no visible gain.
    const dpr = 1
    const w = window.innerWidth
    const h = window.innerHeight

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + "px"
    canvas.style.height = h + "px"
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // Only reshuffle the sky when the viewport actually changed size
    if (w !== width || h !== height || stars.length === 0) {
      width = w
      height = h
      stars = buildStars(w, h)
    }
  }

  function draw(time) {
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)

    // Ease the parallax toward the pointer so movement feels weighted
    drift.x = lerp(drift.x, pointer.x, 0.045)
    drift.y = lerp(drift.y, pointer.y, 0.045)

    const t = time / 1000
    for (const star of stars) {
      const twinkle = 0.55 + 0.45 * Math.sin(t * star.speed + star.phase)
      const x = star.x + drift.x * star.depth * 34
      const y = star.y + drift.y * star.depth * 34

      ctx.globalAlpha = star.base * twinkle
      ctx.fillStyle = `rgb(${star.hue})`
      ctx.beginPath()
      ctx.arc(x, y, star.r, 0, Math.PI * 2)
      ctx.fill()

      // The brightest near-layer stars get a soft bloom
      if (star.r > 1.6) {
        ctx.globalAlpha = star.base * twinkle * 0.16
        ctx.beginPath()
        ctx.arc(x, y, star.r * 4.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1
    rafId = requestAnimationFrame(draw)
  }

  function startSky() {
    if (rafId === null && !calm()) rafId = requestAnimationFrame(draw)
  }

  function stopSky() {
    if (rafId !== null) cancelAnimationFrame(rafId)
    rafId = null
  }

  function initStarfield() {
    const found = document.getElementById("starfield")
    if (!found) return

    // A view transition hands us a brand new, unsized canvas
    if (found !== canvas) {
      stopSky()
      canvas = found
      ctx = canvas.getContext("2d", { alpha: true })
      if (!ctx) return
    }

    sizeCanvas()

    if (!skyBound) {
      skyBound = true
      window.addEventListener("resize", sizeCanvas, { passive: true })
      document.addEventListener("visibilitychange", () =>
        document.hidden ? stopSky() : startSky(),
      )
    }

    if (calm()) {
      // Draw a single static frame — the sky is there, it just holds still
      drift = { x: 0, y: 0 }
      draw(0)
      stopSky()
      return
    }

    startSky()
  }

  /* ─── Cursor spotlight + starfield parallax ──────────────── */
  function initPointer() {
    if (calm() || window.matchMedia("(hover: none)").matches) return

    let queued = false
    let lastX = 0
    let lastY = 0

    const flush = () => {
      queued = false
      const root = document.documentElement.style
      root.setProperty("--mx", lastX + "px")
      root.setProperty("--my", lastY + "px")
    }

    window.addEventListener(
      "pointermove",
      (e) => {
        lastX = e.clientX
        lastY = e.clientY
        pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
        pointer.y = (e.clientY / window.innerHeight - 0.5) * 2

        // One style write per frame, not one per event
        if (!queued) {
          queued = true
          requestAnimationFrame(flush)
        }
      },
      { passive: true },
    )
  }

  /* ─── Scroll reveals ─────────────────────────────────────── */
  function initReveal() {
    const targets = document.querySelectorAll("[data-reveal]:not(.revealed)")
    if (!targets.length) return

    if (calm() || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("revealed"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add("revealed")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    )

    targets.forEach((el) => observer.observe(el))

    // Children of a stagger group cascade in one after another
    document.querySelectorAll("[data-reveal-stagger]").forEach((group) => {
      const step = Number(group.dataset.revealStagger) || 90
      Array.from(group.children).forEach((child, i) => {
        const el = child.hasAttribute("data-reveal") ? child : child.querySelector("[data-reveal]")
        el?.style.setProperty("--reveal-delay", i * step + "ms")
      })
    })
  }

  /* ─── Magnetic buttons ───────────────────────────────────── */
  function initMagnetic() {
    if (calm() || window.matchMedia("(hover: none)").matches) return

    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      if (el.dataset.bound) return
      el.dataset.bound = "1"
      const strength = Number(el.dataset.magnetic) || 0.28

      el.addEventListener("pointermove", (e) => {
        const rect = el.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
      })

      el.addEventListener("pointerleave", () => {
        el.style.transform = ""
      })
    })
  }

  /* ─── Header state + reading progress ────────────────────── */
  function initScroll() {
    // Re-queried on every tick so the handler survives view transitions
    const onScroll = () => {
      const y = window.scrollY
      document.getElementById("header")?.classList.toggle("scrolled", y > 24)

      const progress = document.getElementById("progress")
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
      }
    }

    onScroll()
    if (scrollBound) return
    scrollBound = true
    window.addEventListener("scroll", onScroll, { passive: true })
  }

  /* ─── Mobile drawer ──────────────────────────────────────── */
  function initDrawer() {
    const button = document.getElementById("drawer-button")
    const drawer = document.getElementById("drawer")
    if (!button || !drawer || button.dataset.bound) return
    button.dataset.bound = "1"

    const setOpen = (open) => {
      drawer.classList.toggle("open", open)
      button.classList.toggle("open", open)
      button.setAttribute("aria-expanded", String(open))
      document.body.style.overflow = open ? "hidden" : ""
    }

    button.addEventListener("click", () => setOpen(!drawer.classList.contains("open")))
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)))
    document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false))
  }

  /* ─── Back to top ────────────────────────────────────────── */
  function initBackToTop() {
    const button = document.getElementById("back-to-top")
    if (!button || button.dataset.bound) return
    button.dataset.bound = "1"
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: calm() ? "auto" : "smooth" })
    })
  }

  /* Pointer tracking is global and only needs binding once. */
  const boot = () => {
    initPointer()
  }

  /* Re-binds after each page navigation; every init below is idempotent. */
  const bootPage = () => {
    initStarfield()
    initReveal()
    initMagnetic()
    initScroll()
    initDrawer()
    initBackToTop()
  }

  const start = () => {
    boot()
    bootPage()
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true })
  } else {
    start()
  }

  // Fires again after every view transition; every init above is idempotent.
  document.addEventListener("astro:page-load", bootPage)
})()
