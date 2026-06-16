const newsData = [
      {
        title: "AI Tools Are Changing The Future Of Web Development",
        category: "technology",
        source: "Tech Daily",
        time: "2 hours ago",
        description: "Developers are using AI tools to design, debug and improve frontend workflows faster than ever."
      },
      {
        title: "Students Build JavaScript Capstone Projects",
        category: "education",
        source: "Campus News",
        time: "Today",
        description: "Learners are creating dashboards, quizzes, expense trackers and Kanban boards using pure JavaScript."
      },
      {
        title: "Small Businesses Adopt Digital Dashboards",
        category: "business",
        source: "Business Lens",
        time: "Yesterday",
        description: "Modern dashboards help businesses track data, expenses, productivity and growth in one clean interface."
      },
      {
        title: "Sports Analytics Apps Become Popular",
        category: "sports",
        source: "Sports Tech",
        time: "4 hours ago",
        description: "Interactive apps are helping fans and teams understand performance using live data and clean UI."
      },
      {
        title: "GitHub API Projects Help Beginners Learn APIs",
        category: "technology",
        source: "Developer Weekly",
        time: "6 hours ago",
        description: "Public APIs give students real practice in async JavaScript, loading states and error handling."
      },
      {
        title: "LocalStorage Makes Frontend Apps Persistent",
        category: "education",
        source: "JS Classroom",
        time: "1 day ago",
        description: "Browser storage helps apps remember tasks, expenses and settings even after page refresh."
      }
    ];

    function renderNews(items) {
      const newsGrid = document.getElementById("newsGrid");
      newsGrid.innerHTML = "";

      if (items.length === 0) {
        newsGrid.innerHTML = `<div class="empty-message">No news found. Try another search or category.</div>`;
        return;
      }

      items.forEach((news, index) => {
        newsGrid.innerHTML += `
          <article class="news-card" style="animation-delay:${index * 0.06}s">
            <span class="news-tag">${news.category}</span>
            <h3>${news.title}</h3>
            <p>${news.description}</p>
            <div class="news-meta">
              <span>${news.source}</span>
              <span>${news.time}</span>
            </div>
          </article>
        `;
      });
    }

    function filterNews() {
      const searchValue = document.getElementById("searchInput").value.toLowerCase().trim();
      const category = document.getElementById("categorySelect").value;

      const filtered = newsData.filter((news) => {
        const matchesSearch =
          news.title.toLowerCase().includes(searchValue) ||
          news.description.toLowerCase().includes(searchValue) ||
          news.source.toLowerCase().includes(searchValue) ||
          news.category.toLowerCase().includes(searchValue);

        const matchesCategory = category === "all" || news.category === category;

        return matchesSearch && matchesCategory;
      });

      renderNews(filtered);
    }

    async function fetchNews() {
      const newsGrid = document.getElementById("newsGrid");
      newsGrid.innerHTML = `<div class="loader">Fetching latest headlines...</div>`;

      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({ ok: true, data: newsData });
          }, 700);
        });

        if (!response.ok) {
          throw new Error("Unable to fetch news right now.");
        }

        filterNews();
      } catch (error) {
        newsGrid.innerHTML = `<div class="error-message">${error.message}</div>`;
      }
    }

    function setCategory(category, button) {
      document.getElementById("categorySelect").value = category;

      document.querySelectorAll(".category-tabs button").forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");
      filterNews();
    }

    document.getElementById("searchInput").addEventListener("input", filterNews);
    document.getElementById("categorySelect").addEventListener("change", filterNews);

    fetchNews();
