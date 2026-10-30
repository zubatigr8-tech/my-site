// Tema: sahifa chizilishidan oldin qo'llanadi (oq "miltillash" bo'lmasligi uchun).
// Avval saqlangan tanlov, bo'lmasa kompyuter/telefon sozlamasi ishlatiladi.
const root = document.documentElement;
let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch {}
root.dataset.theme = savedTheme ||
  (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

document.addEventListener("DOMContentLoaded", () => {
  // Tema almashtirish tugmasi
  const toggle = document.querySelector(".theme-toggle");
  const updateLabel = () => {
    toggle.setAttribute("aria-label", root.dataset.theme === "dark" ? "Kunduzgi rejim" : "Tungi rejim");
  };
  updateLabel();

  toggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    updateLabel();
  });

  // Rasm hali qo'yilmagan bo'lsa, o'rnida fayl nomini ko'rsatadi
  document.querySelectorAll(".media img").forEach((img) => {
    const markEmpty = () => {
      img.parentElement.classList.add("is-empty");
      img.parentElement.dataset.label = img.getAttribute("src");
    };
    img.addEventListener("error", markEmpty);
    if (img.complete && img.naturalWidth === 0) markEmpty();
  });

  // Telefon raqami ustiga bosilganda uni nusxalaydi (kompyuterda qulay)
  const phone = document.querySelector(".phone");

  phone.addEventListener("click", async () => {
    const original = phone.textContent;
    try {
      await navigator.clipboard.writeText("+48729432702");
      phone.textContent = "Nusxalandi ✓";
    } catch {
      phone.textContent = "Nusxalab bo'lmadi";
    }
    setTimeout(() => (phone.textContent = original), 1500);
  });

  // Footerdagi yil avtomatik yangilanadi
  document.getElementById("year").textContent = new Date().getFullYear();
});
