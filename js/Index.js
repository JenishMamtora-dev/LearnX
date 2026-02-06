// Courses with per-language syllabus and quiz data
    
    // Hamburger Menu Toggle
    function toggleMobileMenu() {
      const mobileMenu = document.getElementById('mobileMenu');
      const hamburgerBtn = document.getElementById('hamburgerBtn');
      mobileMenu.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
    }

    // Check if navbar links overflowing
    function checkNavbarOverflow() {
      const navbarContainer = document.querySelector('.navbar-container');
      const navbarLinks = document.getElementById('navbarLinks');
      const hamburgerBtn = document.getElementById('hamburgerBtn');
      const mobileMenu = document.getElementById('mobileMenu');

      if (!navbarContainer || !navbarLinks || !hamburgerBtn) return;

      // Force reflow to get accurate measurements
      navbarContainer.offsetHeight;

      // Get actual bounding rectangles
      const containerRect = navbarContainer.getBoundingClientRect();
      const linksRect = navbarLinks.getBoundingClientRect();
      const hamburgerRect = hamburgerBtn.getBoundingClientRect();

      // Check if navbar links would overflow the container
      // Compare the right edge of links with the left edge of hamburger button
      const isOverflowing = linksRect.right + 10 > hamburgerRect.left;

      if (isOverflowing) {
        // Hide links and show hamburger
        navbarLinks.style.display = 'none';
        hamburgerBtn.style.display = 'flex';
      } else {
        // Show links and hide hamburger
        navbarLinks.style.display = 'flex';
        hamburgerBtn.style.display = 'none';
        // Close mobile menu if it's open
        if (mobileMenu) {
          mobileMenu.classList.remove('active');
        }
        hamburgerBtn.classList.remove('active');
      }
    }

    // Initialize when DOM is ready
    function initNavbar() {
      // Wait for page to fully load
      setTimeout(() => {
        checkNavbarOverflow();
      }, 100);

      const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
      mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
          const mobileMenu = document.getElementById('mobileMenu');
          const hamburgerBtn = document.getElementById('hamburgerBtn');
          if (mobileMenu) mobileMenu.classList.remove('active');
          if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        });
      });
    }

    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
      initNavbar();
    }

    // Run on page fully loaded
    window.addEventListener('load', () => {
      setTimeout(checkNavbarOverflow, 300);
    });

    // Check overflow on window resize
    window.addEventListener('resize', () => {
      checkNavbarOverflow();
    });

    // Monitor zoom changes using debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        checkNavbarOverflow();
      }, 100);
    });

    const coursesData = [
      {
        name: 'C Programming',
        overview: 'Learn the fundamentals of C programming including variables, data types, arrays, operators, loops, and advanced concepts like structures and unions.',
        icon: '<i class="bx bx-code-alt"></i>',
        techIcons: ['<i class="bx bx-code-alt"></i>'],
        badge: 'BEGINNER',
        syllabus: [
          { t: '1. Variables', c: 'Learn about C variables: declaration, initialization, naming conventions and variable scope.', quiz: { q: 'What is a variable?', opts: [{t:'A named memory location', ok:true},{t:'A function', ok:false},{t:'A data type', ok:false}] } },
          { t: '2. Data Types', c: 'Explore primitive data types: int, float, double, char, and their sizes and ranges.', quiz: { q: 'Which data type holds decimal numbers with higher precision?', opts: [{t:'float', ok:false},{t:'double', ok:true},{t:'int', ok:false}] } },
          { t: '3. Arrays', c: 'Master 1D and 2D arrays, array declaration, initialization, and accessing elements.', quiz: { q: 'How do you declare a 1D array of 5 integers?', opts: [{t:'int arr[5];', ok:true},{t:'int arr(5);', ok:false},{t:'array int[5];', ok:false}] } },
          { t: '4. Operators', c: 'Understand arithmetic, relational, logical, and assignment operators in C.', quiz: { q: 'What is the result of 10 % 3?', opts: [{t:'3', ok:false},{t:'1', ok:true},{t:'3.33', ok:false}] } },
          { t: '5. If Statements', c: 'Learn decision making with if, else if, else, and nested if statements.', quiz: { q: 'What executes if all conditions are false in an if-else-if chain?', opts: [{t:'The first if block', ok:false},{t:'The else block', ok:true},{t:'Nothing', ok:false}] } },
          { t: '6. Switch Statements', c: 'Control program flow with switch-case statements and break statements.', quiz: { q: 'What keyword ends a case in a switch statement?', opts: [{t:'exit', ok:false},{t:'break', ok:true},{t:'return', ok:false}] } },
          { t: '7. Loops', c: 'Master for, while, and do-while loops for repetitive tasks.', quiz: { q: 'Which loop guarantees at least one execution?', opts: [{t:'for', ok:false},{t:'while', ok:false},{t:'do-while', ok:true}] } },
          { t: '8. Jump Statements', c: 'Learn control flow with break, continue, goto, and return statements.', quiz: { q: 'What does the continue statement do?', opts: [{t:'Exits the loop', ok:false},{t:'Skips to next iteration', ok:true},{t:'Stops the program', ok:false}] } },
          { t: '9. Structures', c: 'Create and use structures to group multiple data types together.', quiz: { q: 'What keyword is used to define a structure in C?', opts: [{t:'class', ok:false},{t:'struct', ok:true},{t:'record', ok:false}] } },
          { t: '10. Unions', c: 'Understand unions: similar to structures but share memory between members.', quiz: { q: 'What is a key difference between struct and union?', opts: [{t:'Union members share memory', ok:true},{t:'Struct members share memory', ok:false},{t:'There is no difference', ok:false}] } }
        ]
      },
      {
        name: 'C++ Programming',
        overview: 'Master object-oriented programming with C++. Learn about classes, inheritance, polymorphism, and the Standard Template Library (STL).',
        icon: '<i class="bx bxl-c-plus-plus"></i>',
        techIcons: ['<i class="bx bxl-c-plus-plus"></i>'],
        badge: 'INTERMEDIATE',
        syllabus: [
          { t: '1. Classes & Objects', c: 'OOP basics in C++.', quiz: { q: 'What is encapsulation?', opts: [{t:'Hiding data', ok:true},{t:'Inheritance', ok:false},{t:'Polymorphism', ok:false}] } },
          { t: '2. Inheritance', c: 'Extending classes.', quiz: { q: 'Keyword for inheritance?', opts: [{t:'extends', ok:false},{t:'public', ok:false},{t:' : (colon)', ok:true}] } },
          { t: '3. STL Intro', c: 'Vectors, maps and algorithms.', quiz: { q: 'Which container is ordered by key?', opts: [{t:'vector', ok:false},{t:'map', ok:true},{t:'set', ok:false}] } }
        ]
      },
      {
        name: 'HTML',
        overview: 'Master HTML - the foundation of web development. Learn semantic markup, forms, multimedia, and best practices for creating accessible web pages.',
        icon: '<i class="bx bxl-html5"></i>',
        techIcons: ['<i class="bx bxl-html5"></i>'],
        badge: 'BEGINNER',
        syllabus: [
          { t: '1. Elements & Tags', c: 'Structure of web pages with HTML.', quiz: { q: 'What tag is for a paragraph?', opts: [{t:'<p>', ok:true},{t:'<div>', ok:false},{t:'<span>', ok:false}] } },
          { t: '2. Links & Images', c: 'Use <a> and <img> tags properly.', quiz: { q: 'Attribute for image source?', opts: [{t:'href', ok:false},{t:'src', ok:true},{t:'alt', ok:false}] } },
          { t: '3. Forms', c: 'Collect input from users.', quiz: { q: 'Tag used to submit data?', opts: [{t:'<form>', ok:true},{t:'<input>', ok:false},{t:'<label>', ok:false}] } }
        ]
      },
      {
        name: 'CSS',
        overview: 'Learn to style and design beautiful web pages with CSS. From basic selectors to advanced layouts with Flexbox and Grid.',
        icon: '<i class="bx bxl-css3"></i>',
        techIcons: ['<i class="bx bxl-css3"></i>'],
        badge: 'BEGINNER',
        syllabus: [
          { t: '1. Selectors', c: 'Target elements using selectors.', quiz: { q: 'Selector for id?', opts: [{t:'#id', ok:true},{t:'.class', ok:false},{t:'tag', ok:false}] } },
          { t: '2. Box Model', c: 'Margins, borders, padding and content.', quiz: { q: 'Part that adds space inside element?', opts: [{t:'margin', ok:false},{t:'padding', ok:true},{t:'border', ok:false}] } },
          { t: '3. Flexbox', c: 'Layout with flexbox.', quiz: { q: 'Property to align items along main axis?', opts: [{t:'justify-content', ok:true},{t:'align-items', ok:false},{t:'flex-wrap', ok:false}] } }
        ]
      },
      {
        name: 'PHP',
        overview: 'Build dynamic web applications with PHP. Learn server-side programming, databases, sessions, and security best practices.',
        icon: '<i class="bx bxl-php"></i>',
        techIcons: ['<i class="bx bxl-php"></i>'],
        badge: 'INTERMEDIATE',
        syllabus: [
          { t: '1. Selectors', c: 'Target elements using selectors.', quiz: { q: 'Selector for id?', opts: [{t:'#id', ok:true},{t:'.class', ok:false},{t:'tag', ok:false}] } },
          { t: '2. Box Model', c: 'Margins, borders, padding and content.', quiz: { q: 'Part that adds space inside element?', opts: [{t:'margin', ok:false},{t:'padding', ok:true},{t:'border', ok:false}] } },
          { t: '3. Flexbox', c: 'Layout with flexbox.', quiz: { q: 'Property to align items along main axis?', opts: [{t:'justify-content', ok:true},{t:'align-items', ok:false},{t:'flex-wrap', ok:false}] } }
        ]
      },
       {
        name: 'JAVA',
        overview: 'Dive into Java - one of the most popular programming languages. Learn OOP concepts, exception handling, and build real-world applications.',
        icon: '<i class="bx bxl-java"></i>',
        techIcons: ['<i class="bx bxl-java"></i>'],
        badge: 'INTERMEDIATE',
        syllabus: [
          { t: '1. Selectors', c: 'Target elements using selectors.', quiz: { q: 'Selector for id?', opts: [{t:'#id', ok:true},{t:'.class', ok:false},{t:'tag', ok:false}] } },
          { t: '2. Box Model', c: 'Margins, borders, padding and content.', quiz: { q: 'Part that adds space inside element?', opts: [{t:'margin', ok:false},{t:'padding', ok:true},{t:'border', ok:false}] } },
          { t: '3. Flexbox', c: 'Layout with flexbox.', quiz: { q: 'Property to align items along main axis?', opts: [{t:'justify-content', ok:true},{t:'align-items', ok:false},{t:'flex-wrap', ok:false}] } }
        ]
      },
       
    ];

    // STATE
    let activeUser = localStorage.getItem('activeUser');
    let activeCourse = null;
    let activeChapter = 0;
    let allNotes = JSON.parse(localStorage.getItem('allNotes')) || {};
    let progress = JSON.parse(localStorage.getItem('progress')) || {};

    // Initialize if logged in
    if (activeUser) init();

    function login() {
      const e = document.getElementById('email').value.trim();
      if (!e) return alert('Enter an email');
      localStorage.setItem('activeUser', e);
      activeUser = e;
      init();
    }
    function logout() { localStorage.removeItem('activeUser'); location.reload(); }

    function init() {
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      renderGrid();
    }

    function renderGrid() {
      const g = document.getElementById('grid'); g.innerHTML = '';
      coursesData.forEach((c, idx) => {
        const userProg = progress[activeUser]?.[c.name] || [];
        const totalChapters = c.syllabus.length;
        const completedChapters = userProg.length;
        const progressPercent = Math.round((completedChapters / totalChapters) * 100);
        
        let techIconsHtml = '';
        if (c.techIcons && c.techIcons.length > 0) {
          techIconsHtml = c.techIcons.map(icon => `<div class="tech-icon">${icon}</div>`).join('');
        }
        
        g.innerHTML += `
          <div class="course-card" onclick="openReader('${ c.name }')">
            <div class="card-badge">${ c.badge || 'COURSE' }</div>
            <div class="card-icon">${ c.icon }</div>
            <div class="card-body">
              <div class="card-title">${ c.name }</div>
              <p class="card-overview">${ c.overview }</p>
              <div class="tech-icons">${ techIconsHtml }</div>
            </div>
          </div>`;
      });
    }

    function openReader(cName) {
      // Redirect to course.html with course name as a URL parameter
      window.location.href = 'course.html?course=' + encodeURIComponent(cName);
    }
    function closeReader() { document.getElementById('reader').style.display = 'none'; }

    function getCourseObj() { return coursesData.find(x => x.name === activeCourse); }

    function isChapterLocked(i) {
      if (i === 0) return false;
      const userProg = progress[activeUser]?.[activeCourse] || [];
      return !userProg.includes(i - 1);
    }
    function attemptLoadChapter(i) { if (isChapterLocked(i)) { alert('This chapter is locked. Complete the previous chapter first.'); return; } loadChapter(i); }

    function renderSidebar() {
      const list = document.getElementById('chapterList'); list.innerHTML = '';
      const userProg = progress[activeUser]?.[activeCourse] || [];
      const course = getCourseObj();
      course.syllabus.forEach((s, i) => {
        const isDone = userProg.includes(i);
        const locked = isChapterLocked(i);
        const activeCls = activeChapter === i ? 'active' : '';
        const doneCls = isDone ? 'completed' : '';
        const lockedCls = locked ? 'locked' : '';
        const icon = locked ? "<i class='bx bxs-lock lock-icon'></i>" : (isDone ? "<i class='bx bxs-check-circle'></i>" : "");
        list.innerHTML += `<div class="toc-item ${ activeCls } ${ doneCls } ${ lockedCls }" onclick="attemptLoadChapter(${ i })"><span>${ s.t }</span>${ icon }</div>`;
      });
    }

    function loadChapter(i) {
      if (isChapterLocked(i)) { alert('This chapter is locked. Complete the previous chapter first.'); return; }
      activeChapter = i; const course = getCourseObj(); const s = course.syllabus[i];
      document.getElementById('lessonTitle').innerText = s.t;
      document.getElementById('lessonText').innerHTML = s.c;

      if (!allNotes[activeUser]) allNotes[activeUser] = {};
      if (!allNotes[activeUser][activeCourse]) allNotes[activeUser][activeCourse] = {};
      document.getElementById('noteInput').value = allNotes[activeUser][activeCourse][i] || '';

      // Quiz render
      const quiz = s.quiz;
      const qc = document.getElementById('quizContainer');
      if (quiz) {
        let html = `<h3 style="margin-bottom:12px">Q: ${ quiz.q }</h3>`;
        quiz.opts.forEach((op, idx) => { html += `<div class='quiz-option' onclick='checkQuiz(this, ${ op.ok })'>${ String.fromCharCode(65+idx) }. ${ op.t }</div>`; });
        qc.innerHTML = html;
      } else { qc.innerHTML = '<em>No quiz for this topic.</em>'; }

      // Reset quiz UI
      document.querySelectorAll('.quiz-option').forEach(el => { el.className = 'quiz-option'; el.style.pointerEvents = 'auto'; });
      document.getElementById('quizResult').innerText = '';

      // Mark button state
      const done = progress[activeUser]?.[activeCourse]?.includes(i);
      const btn = document.getElementById('markBtn');
      btn.disabled = !!done;
      btn.innerHTML = done ? "Completed <i class='bx bx-check'></i>" : "Mark as Complete <i class='bx bx-check'></i>";

      renderSidebar();
    }

    function switchTab(tabName) {
      ['read','notes','quiz'].forEach(t => { 
        const view = document.getElementById('view-' + t);
        const tab = document.getElementById('tab-' + t);
        if (view) view.style.display = 'none'; 
        if (tab) tab.classList.remove('active'); 
      });
      const activeView = document.getElementById('view-' + tabName);
      const activeTab = document.getElementById('tab-' + tabName);
      if (activeView) activeView.style.display = 'block'; 
      if (activeTab) activeTab.classList.add('active');
    }

    function markChapterComplete() {
      if (!progress[activeUser]) progress[activeUser] = {};
      if (!progress[activeUser][activeCourse]) progress[activeUser][activeCourse] = [];
      if (!progress[activeUser][activeCourse].includes(activeChapter)) {
        progress[activeUser][activeCourse].push(activeChapter);
        localStorage.setItem('progress', JSON.stringify(progress));
        renderSidebar();
        const next = activeChapter + 1; if (next < getCourseObj().syllabus.length) { loadChapter(next); } else { alert("Course Completed! You've finished this course 🎉"); }
      }
    }

    function saveNote() {
      const txt = document.getElementById('noteInput').value;
      if (!allNotes[activeUser]) allNotes[activeUser] = {};
      if (!allNotes[activeUser][activeCourse]) allNotes[activeUser][activeCourse] = {};
      allNotes[activeUser][activeCourse][activeChapter] = txt; localStorage.setItem('allNotes', JSON.stringify(allNotes));
      const msg = document.getElementById('saveMsg'); msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 1500);
    }

    function checkQuiz(el, isCorrect) {
      if (isCorrect) { 
        el.classList.add('correct'); 
        document.getElementById('quizResult').innerHTML = "<span style='color:var(--success)'>Correct Answer! Well done. Next chapter unlocked! 🎉</span>"; 
        document.querySelectorAll('.quiz-option').forEach(o => o.style.pointerEvents = 'none');
        setTimeout(() => { markChapterComplete(); }, 1200);
      } else { 
        el.classList.add('wrong'); 
        document.getElementById('quizResult').innerHTML = "<span style='color:var(--danger)'>Oops! Wrong Answer. Try again.</span>"; 
      }
    }

    // Popup Functions - Fixed
    function closePopup() {
      const popup = document.getElementById('popup');
      if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
          popup.style.display = 'none';
        }, 300);
      }
    }

    function openPopup() {
      const popup = document.getElementById('popup');
      if (popup) {
        popup.style.display = 'flex';
        setTimeout(() => {
          popup.classList.add('show');
        }, 10);
      }
    }

    // Popup event listeners
    document.addEventListener('DOMContentLoaded', () => {
      const popup = document.getElementById('popup');
      if (popup) {
        popup.addEventListener('click', (e) => {
          if (e.target === popup) closePopup();
        });
      }
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const p = document.getElementById('popup');
          if (p && p.style.display === 'flex') closePopup();
        }
      });
    });

    // Show popup on page load (uncomment if you want auto-popup)
    // window.addEventListener('load', () => {
    //   setTimeout(() => {
    //     openPopup();
    //   }, 1000);
    // });
    
    