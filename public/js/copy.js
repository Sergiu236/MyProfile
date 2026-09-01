/**
 * copy.js — adds a copy button to every code block, re-running after
 * each view transition so freshly swapped articles get buttons too.
 */
function addCopyButtons() {
  document.querySelectorAll("pre:has(code)").forEach((pre) => {
    if (pre.dataset.copyReady) return
    pre.dataset.copyReady = "1"

    const use = document.createElementNS("http://www.w3.org/2000/svg", "use")
    use.setAttribute("href", "/ui.svg#copy")

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.classList.add("copy-svg")
    svg.append(use)

    const button = document.createElement("button")
    button.type = "button"
    button.setAttribute("aria-label", "Copy code to clipboard")
    button.classList.add("copy-btn")
    button.append(svg)
    button.addEventListener("click", () => {
      const code = pre.querySelector("code")
      if (!code) return
      navigator.clipboard.writeText(code.innerText)
      use.setAttribute("href", "/ui.svg#check")
      setTimeout(() => use.setAttribute("href", "/ui.svg#copy"), 1200)
    })

    const container = document.createElement("div")
    container.classList.add("copy-cnt")
    container.append(button)

    pre.classList.add("relative")
    pre.append(container)
  })
}

document.addEventListener("DOMContentLoaded", addCopyButtons)
document.addEventListener("astro:page-load", addCopyButtons)
