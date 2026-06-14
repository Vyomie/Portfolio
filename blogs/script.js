document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blogList");

  // Blog metadata. `file` is the PDF inside blog-pdfs/; the thumbnail is
  // auto-detected from the image that shares the same base name.
  const blogs = [
    {
      file: "projectile_with_spin.pdf",
      title: "Projectile Motion with Spin",
      category: "Physics",
      date: "2025",
      desc: "Modelling the trajectory of a spinning projectile, accounting for the Magnus effect and drag."
    },
    {
      file: "effective_microscopic_de_broglie_waves.pdf",
      title: "Effective Microscopic de Broglie Waves",
      category: "Quantum Physics",
      date: "2025",
      desc: "An exploration of effective de Broglie wavelengths at microscopic scales and their implications."
    },
    {
      file: "probabilistic_approach_to_goldbach’s_conjecture.pdf",
      title: "A Probabilistic Approach to Goldbach’s Conjecture",
      category: "Mathematics",
      date: "2025",
      desc: "Using probabilistic heuristics to reason about the distribution of Goldbach partitions."
    }
  ];

  const imageExtensions = [".webp", ".png", ".jpg", ".jpeg"];

  // Resolve the first image extension that actually loads; otherwise null.
  function findValidImage(baseFile, callback) {
    let index = 0;
    (function tryNext() {
      if (index >= imageExtensions.length) return callback(null);
      const img = new Image();
      const src = `blog-pdfs/${baseFile}${imageExtensions[index]}`;
      img.onload = () => callback(src);
      img.onerror = () => { index++; tryNext(); };
      img.src = src;
    })();
  }

  blogs.forEach(blog => {
    const baseFile = blog.file.replace(/\.pdf$/, "");
    const pdfPath = `blog-pdfs/${blog.file}`;

    findValidImage(baseFile, imageSrc => {
      const card = document.createElement("div");
      card.className = "blog-card";

      const thumb = imageSrc
        ? `<div class="thumb-wrap"><img class="thumb" src="${imageSrc}" alt="${blog.title}" loading="lazy" /></div>`
        : `<div class="thumb-wrap"><div class="thumb-fallback">PDF</div></div>`;

      card.innerHTML = `
        ${thumb}
        <div class="body">
          <div class="meta">${blog.category} · ${blog.date}</div>
          <div class="title">${blog.title}</div>
          <div class="desc">${blog.desc}</div>
          <div class="read">Read PDF →</div>
        </div>
      `;

      card.addEventListener("click", () => window.open(pdfPath, "_blank"));
      blogList.appendChild(card);
    });
  });

  // Fade-in reveal on scroll (matches the main site)
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.1 });
  document.querySelectorAll(".fade").forEach(el => io.observe(el));
});
