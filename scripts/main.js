// Custom Cursor Circle (Unfilled Border)
const cursor = document.getElementById("cursorCircle");

let lastMove = 0;
document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastMove > 10) {
    // only update every 10ms
    cursor.style.transform = `translate(${e.clientX - 12}px, ${
      e.clientY - 12
    }px)`;
    lastMove = now;
  }
});

const hamburgerToggle = document.getElementById("hamburgerToggle");
const hamburgerMenu = document.getElementById("hamburgerMenu");
const closeHamburger = document.getElementById("closeHamburger");
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("sidebarToggle");
const arrowIcon = document.getElementById("arrowIcon");
const titleEl = document.getElementById("dynamicTitle");

// Hamburger toggle
hamburgerToggle.addEventListener("click", () => {
  hamburgerMenu.classList.remove("translate-x-full");
});

closeHamburger.addEventListener("click", () => {
  hamburgerMenu.classList.add("translate-x-full");
});

// Sidebar toggle logic
let isSidebarOpen = false;
let closeTimeout = null;

const openSidebar = () => {
  sidebar.classList.remove("-translate-x-full");
  arrowIcon.classList.remove("rotate-180");
  isSidebarOpen = true;
};

const closeSidebar = () => {
  sidebar.classList.add("-translate-x-full");
  arrowIcon.classList.add("rotate-180");
  isSidebarOpen = false;
};

toggleBtn.addEventListener("click", () => {
  isSidebarOpen ? closeSidebar() : openSidebar();
});

if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
  sidebar.addEventListener("mouseleave", () => {
    if (isSidebarOpen) {
      closeTimeout = setTimeout(closeSidebar, 800);
    }
  });

  sidebar.addEventListener("mouseenter", () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
  });
}

// Rotating sidebar title
const titles = [
  "Artist",
  "Bicyclist",
  "Web Developer",
  "UI/UX Designer",
  "Advanced Repair Agent",
];

let current = 0;

setInterval(() => {
  titleEl.classList.add("opacity-0");
  setTimeout(() => {
    current = (current + 1) % titles.length;
    titleEl.textContent = titles[current];
    titleEl.classList.remove("opacity-0");
  }, 500);
}, 2000);

document.addEventListener("DOMContentLoaded", function () {
  const section = document.getElementById("identityReveal");
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        startAnimation();
        observer.unobserve(section);
      }
    },
    { threshold: 0.5 }
  );
  observer.observe(section);

  function typeText(el, text, delay = 50) {
    return new Promise((resolve) => {
      el.textContent = "";
      el.style.opacity = 1;
      let i = 0;
      const interval = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  }

  function clearText(el, delay = 25) {
    return new Promise((resolve) => {
      let text = el.textContent;
      const interval = setInterval(() => {
        text = text.slice(0, -1);
        el.textContent = text;
        if (text.length === 0) {
          clearInterval(interval);
          el.style.opacity = 0;
          resolve();
        }
      }, delay);
    });
  }

  async function startAnimation() {
    const dateText = document.getElementById("dateText");
    const actionText = document.getElementById("actionText");
    const manuelVega = document.getElementById("manuelVega");
    const vegaText = document.getElementById("vegaText");
    const santiagoMarshutz = document.getElementById("santiagoMarshutz");

    await typeText(dateText, "DECEMBER 10TH, 1999...");
    manuelVega.classList.remove("translate-x-[-100%]");
    manuelVega.classList.add("translate-x-0", "opacity-100");
    await new Promise((res) => setTimeout(res, 1000));
    await typeText(actionText, "WAS BORN.");
    await new Promise((res) => setTimeout(res, 500));

    // Remove line-through and fade VEGA slowly while next date types
    vegaText.classList.remove("line-through", "text-primary");
    vegaText.classList.add("text-gray-400");
    vegaText.style.transition = "opacity 2s ease";
    vegaText.style.opacity = "0.2";

    await clearText(dateText);
    await typeText(dateText, "NOVEMBER 18TH, 2006...");
    santiagoMarshutz.classList.remove("scale-75", "opacity-0");
    santiagoMarshutz.classList.add("scale-100", "opacity-100");

    await clearText(actionText);
    await typeText(actionText, "WAS ADOPTED.");
    await new Promise((res) => setTimeout(res, 1500));

    await clearText(dateText);
    await typeText(dateText, "JUNE 13TH, 2025...");
    await clearText(actionText);
    await typeText(actionText, "GRADUATED.");
  }
});

function openModal(id) {
  document
    .querySelectorAll(".project-modal")
    .forEach((modal) => modal.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

document.querySelectorAll('#hamburgerMenu a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Custom offsets for each section
      const offsetMap = {
        hero: 60,
        projects: 100,
        experience: 40,
        contact: 40,
      };

      const offset = offsetMap[targetId] || 100; // fallback if ID not mapped

      // Close hamburger menu first
      hamburgerMenu.classList.add("translate-x-full");

      // Scroll to section after menu closes
      setTimeout(() => {
        const scrollY =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          offset;

        window.scrollTo({
          top: scrollY,
          behavior: "smooth",
        });
      }, 300); // match hamburger menu animation duration
    }
  });
});

const settingsIcon = document.getElementById("settingsIcon");
const accentPicker = document.getElementById("accentPicker");
const accentOptions = document.querySelectorAll("#accentOptions button");

settingsIcon.addEventListener("click", () => {
  accentPicker.classList.toggle("hidden");
  accentPicker.classList.toggle("opacity-0");
});

document.addEventListener("click", (e) => {
  if (!accentPicker.contains(e.target) && !settingsIcon.contains(e.target)) {
    accentPicker.classList.add("hidden");
    accentPicker.classList.add("opacity-0");
  }
});

accentOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    const color = btn.getAttribute("data-color");
    document.documentElement.setAttribute("data-accent", color);
    localStorage.setItem("accent", color);

    accentOptions.forEach((b) => b.classList.remove("accent-active"));
    btn.classList.add("accent-active");
  });
});

// Load saved accent on page load
const savedAccent = localStorage.getItem("accent") || "purple";
document.documentElement.setAttribute("data-accent", savedAccent);

accentOptions.forEach((btn) => {
  if (btn.getAttribute("data-color") === savedAccent) {
    btn.classList.add("accent-active");
  } else {
    btn.classList.remove("accent-active");
  }
});

const closeAccentPicker = document.getElementById("closeAccentPicker");

closeAccentPicker.addEventListener("click", () => {
  accentPicker.classList.add("hidden");
  accentPicker.classList.add("opacity-0");
  accentPicker.classList.add("scale-95");
});
