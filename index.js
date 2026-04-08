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

let coursesData = [];
const initialCoursesData = [
  {
    name: 'C Programming',
    overview: 'Learn the fundamentals of C programming including variables, data types, arrays, operators, loops, and advanced concepts like structures and unions.',
    icon: '<i class="bx bx-code-alt"></i>',
    techIcons: ['<i class="bx bx-code-alt"></i>'],
    badge: 'BEGINNER',
    syllabus: [
      {
        t: '1. Variables',
        shortDescription: 'Learn about C variables and their usage.',
        detailedDefinition: 'A variable in C is a named memory location used to store data. Each variable has a data type, a name (identifier), and a value. Variables allow programs to store, modify, and retrieve data during execution.',
        syntax: 'int age = 25;',
        examples: ['int a = 10;', 'float price = 99.99;', 'char grade = \'A\';'],
        notes: ['Variables must be declared before use', 'Variable names are case-sensitive'],
        c: 'Learn about C variables: declaration, initialization, naming conventions and variable scope.',
        quiz: { q: 'What is a variable?', opts: [{ t: 'A named memory location', ok: true }, { t: 'A function', ok: false }, { t: 'A data type', ok: false }] }
      },
      {
        t: '2. Data Types',
        shortDescription: 'Understand different data types in C.',
        detailedDefinition: 'Data types define the type and size of data. C provides several built-in data types including int, float, double, char, and void. Each data type has a specific size and range of values it can store.',
        syntax: 'int age; float salary; char initial;',
        examples: ['int count = 5;', 'float temperature = 36.5;', 'double pi = 3.14159;', 'char letter = \'x\';'],
        notes: ['int typically uses 4 bytes', 'float uses 4 bytes, double uses 8 bytes', 'char uses 1 byte'],
        c: 'Explore primitive data types: int, float, double, char, and their sizes and ranges.',
        quiz: { q: 'Which data type holds decimal numbers with higher precision?', opts: [{ t: 'float', ok: false }, { t: 'double', ok: true }, { t: 'int', ok: false }] }
      },
      {
        t: '3. Arrays',
        shortDescription: 'Master array handling in C.',
        detailedDefinition: 'An array is a collection of elements of the same data type stored in contiguous memory locations. Arrays can be one-dimensional (1D) or multi-dimensional (2D, 3D, etc.). They are useful for storing multiple values under a single variable name.',
        syntax: 'int arr[5]; int matrix[3][4];',
        examples: ['int numbers[5] = {1, 2, 3, 4, 5};', 'float scores[10];', 'char name[50];'],
        notes: ['Array indices start from 0', 'Arrays have fixed size once declared', 'Out of bounds access causes undefined behavior'],
        c: 'Master 1D and 2D arrays, array declaration, initialization, and accessing elements.',
        quiz: { q: 'How do you declare a 1D array of 5 integers?', opts: [{ t: 'int arr[5];', ok: true }, { t: 'int arr(5);', ok: false }, { t: 'array int[5];', ok: false }] }
      },
      {
        t: '4. Operators',
        shortDescription: 'Learn about C operators.',
        detailedDefinition: 'Operators are symbols used to perform operations on variables and values. C provides arithmetic, relational, logical, assignment, and bitwise operators. Different operators have different precedence levels.',
        syntax: 'a + b, a == b, a && b',
        examples: ['int sum = 10 + 5;', 'bool equal = (x == y);', 'if (x > 5 && y < 10)'],
        notes: ['Operator precedence determines order of evaluation', 'Use parentheses to clarify expressions', 'Arithmetic: +, -, *, /, %'],
        c: 'Understand arithmetic, relational, logical, and assignment operators in C.',
        quiz: { q: 'What is the result of 10 % 3?', opts: [{ t: '3', ok: false }, { t: '1', ok: true }, { t: '3.33', ok: false }] }
      },
      {
        t: '5. If Statements',
        shortDescription: 'Master decision-making with if statements.',
        detailedDefinition: 'If statements allow conditional execution of code based on whether a condition is true or false. You can use if, else if, and else to create decision trees. Nested if statements allow more complex conditions.',
        syntax: 'if (condition) { } else if (condition) { } else { }',
        examples: ['if (age >= 18) printf("Adult");', 'if (x > y) max = x; else max = y;', 'if (grade == \'A\') printf("Excellent");'],
        notes: ['Use == for comparison, = for assignment', 'Conditions must evaluate to true or false', 'Indentation makes code more readable'],
        c: 'Learn decision making with if, else if, else, and nested if statements.',
        quiz: { q: 'What executes if all conditions are false in an if-else-if chain?', opts: [{ t: 'The first if block', ok: false }, { t: 'The else block', ok: true }, { t: 'Nothing', ok: false }] }
      },
      {
        t: '6. Switch Statements',
        shortDescription: 'Control flow with switch statements.',
        detailedDefinition: 'Switch statements provide a cleaner way to handle multiple conditions compared to if-else chains. Each case represents a specific value, and break statements prevent fall-through to the next case.',
        syntax: 'switch (variable) { case value: break; default: break; }',
        examples: ['switch (day) { case 1: printf("Monday"); break; default: printf("Unknown"); }'],
        notes: ['Each case must end with break to avoid fall-through', 'default case executes if no cases match', 'Only works with constant values'],
        c: 'Control program flow with switch-case statements and break statements.',
        quiz: { q: 'What keyword ends a case in a switch statement?', opts: [{ t: 'exit', ok: false }, { t: 'break', ok: true }, { t: 'return', ok: false }] }
      },
      {
        t: '7. Loops',
        shortDescription: 'Master loop structures in C.',
        detailedDefinition: 'Loops allow repeated execution of code blocks. C provides three types of loops: for (when you know iterations), while (when condition is uncertain), and do-while (executes at least once). Each serves different purposes.',
        syntax: 'for (i = 0; i < n; i++) { } while (condition) { } do { } while (condition);',
        examples: ['for (int i = 0; i < 10; i++) printf("%d ", i);', 'while (count > 0) { count--; }', 'do { printf("x"); } while (x < 5);'],
        notes: ['for loop: initialization, condition, increment', 'while loop: only condition check', 'do-while: loop runs at least once'],
        c: 'Master for, while, and do-while loops for repetitive tasks.',
        quiz: { q: 'Which loop guarantees at least one execution?', opts: [{ t: 'for', ok: false }, { t: 'while', ok: false }, { t: 'do-while', ok: true }] }
      },
      {
        t: '8. Jump Statements',
        shortDescription: 'Learn control flow with break, continue, goto, and return.',
        detailedDefinition: 'Jump statements alter the normal flow of program execution. break exits a loop, continue skips to the next iteration, goto jumps to a labeled statement, and return exits a function. Use these carefully for clean code.',
        syntax: 'break; continue; goto label; return value;',
        examples: ['if (x == 0) break;', 'if (skip) continue;', 'goto error_handler;', 'return 0;'],
        notes: ['break exits the innermost loop or switch', 'continue skips remaining loop body', 'Avoid excessive goto for maintainability', 'return ends function execution'],
        c: 'Learn control flow with break, continue, goto, and return statements.',
        quiz: { q: 'What does the continue statement do?', opts: [{ t: 'Exits the loop', ok: false }, { t: 'Skips to next iteration', ok: true }, { t: 'Stops the program', ok: false }] }
      },
      {
        t: '9. Structures',
        shortDescription: 'Group data with structures.',
        detailedDefinition: 'Structures (struct) group multiple variables of different types together under one name. This creates a composite data type. Each member can have a different data type and is accessed using the dot operator.',
        syntax: 'struct Person { int age; char name[50]; };',
        examples: ['struct Student { char name[50]; int roll; float gpa; };', 'struct Point { int x; int y; };'],
        notes: ['struct is used to define a structure type', 'Members are accessed with dot operator (.)', 'Structures can be passed to functions'],
        c: 'Create and use structures to group multiple data types together.',
        quiz: { q: 'What keyword is used to define a structure in C?', opts: [{ t: 'class', ok: false }, { t: 'struct', ok: true }, { t: 'record', ok: false }] }
      },
      {
        t: '10. Unions',
        shortDescription: 'Understand unions and shared memory.',
        detailedDefinition: 'Unions are similar to structures but all members share the same memory location. Only one member can hold a value at any time. The size of union equals the size of its largest member. This saves memory when only one field is used at a time.',
        syntax: 'union Data { int i; float f; char c; };',
        examples: ['union Color { int rgb; char name[20]; };', 'union Number { int whole; float decimal; };'],
        notes: ['Union members share memory', 'Size equals largest member', 'Modifying one member affects others'],
        c: 'Understand unions: similar to structures but share memory between members.',
        quiz: { q: 'What is a key difference between struct and union?', opts: [{ t: 'Union members share memory', ok: true }, { t: 'Struct members share memory', ok: false }, { t: 'There is no difference', ok: false }] }
      }
    ]
  },
  {
    name: 'C++ Programming',
    overview: 'Master object-oriented programming with C++. Learn about classes, inheritance, polymorphism, and the Standard Template Library (STL).',
    icon: '<i class="bx bxl-c-plus-plus"></i>',
    techIcons: ['<i class="bx bxl-c-plus-plus"></i>'],
    badge: 'INTERMEDIATE',
    syllabus: [
      {
        t: '1. Classes & Objects',
        shortDescription: 'Learn OOP basics in C++.',
        detailedDefinition: 'Classes are blueprints for creating objects. They encapsulate data (attributes) and methods (functions) that operate on that data. Objects are instances of classes. C++ supports public, private, and protected access modifiers for controlling member visibility.',
        syntax: 'class Person { private: int age; public: void setAge(int a) { age = a; } };',
        examples: ['class Animal { public: void bark() { } };', 'class Car { private: int speed; };'],
        notes: ['Classes are user-defined data types', 'Objects are created from classes', 'Encapsulation hides internal details'],
        c: 'OOP basics in C++.',
        quiz: { q: 'What is encapsulation?', opts: [{ t: 'Hiding data', ok: true }, { t: 'Inheritance', ok: false }, { t: 'Polymorphism', ok: false }] }
      },
      {
        t: '2. Inheritance',
        shortDescription: 'Extending classes with inheritance.',
        detailedDefinition: 'Inheritance allows a class to inherit properties and methods from another class. The parent class (base class) provides common functionality, while child classes (derived classes) extend or override this functionality. This promotes code reuse and hierarchical organization.',
        syntax: 'class Dog : public Animal { };',
        examples: ['class Vehicle { }; class Car : public Vehicle { };', 'class Employee : protected Person { };'],
        notes: ['Parent class properties are inherited', 'Use public, protected, private inheritance', 'Child class can override parent methods'],
        c: 'Extending classes.',
        quiz: { q: 'Keyword for inheritance?', opts: [{ t: 'extends', ok: false }, { t: 'public', ok: false }, { t: ' : (colon)', ok: true }] }
      },
      {
        t: '3. STL Intro',
        shortDescription: 'Introduction to Standard Template Library.',
        detailedDefinition: 'The STL (Standard Template Library) provides reusable data structures and algorithms. Containers like vector, map, set, and queue store data. Algorithms like sort, find, and transform process that data. Iterators provide access to elements in containers.',
        syntax: 'vector<int> v; map<string, int> m; set<double> s;',
        examples: ['vector<string> names; vector<int> scores(10);', 'map<int, string> idToName;'],
        notes: ['Vector is dynamic array', 'Map stores key-value pairs', 'Set stores unique elements'],
        c: 'Vectors, maps and algorithms.',
        quiz: { q: 'Which container is ordered by key?', opts: [{ t: 'vector', ok: false }, { t: 'map', ok: true }, { t: 'set', ok: false }] }
      }
    ]
  },
  {
    name: 'HTML',
    overview: 'Master HTML - the foundation of web development. Learn semantic markup, forms, multimedia, and best practices for creating accessible web pages.',
    icon: '<i class="bx bxl-html5"></i>',
    techIcons: ['<i class="bx bxl-html5"></i>'],
    badge: 'BEGINNER',
    syllabus: [
      {
        t: '1. Elements & Tags',
        shortDescription: 'Structure of web pages with HTML.',
        detailedDefinition: 'HTML uses elements (tags) to structure content. Each tag tells the browser how to display content. Tags come in opening and closing pairs. Semantic tags like <header>, <nav>, <article> give meaning to content and help with SEO and accessibility.',
        syntax: '<p>This is a paragraph</p>',
        examples: ['<h1>Heading</h1>', '<p>Paragraph text</p>', '<strong>Bold text</strong>'],
        notes: ['Tags are case-insensitive but lowercase is preferred', 'Proper nesting improves readability', 'Self-closing tags like <img> don\'t need closing tag'],
        c: 'Structure of web pages with HTML.',
        quiz: { q: 'What tag is for a paragraph?', opts: [{ t: '<p>', ok: true }, { t: '<div>', ok: false }, { t: '<span>', ok: false }] }
      },
      {
        t: '2. Links & Images',
        shortDescription: 'Use links and images properly.',
        detailedDefinition: 'Links (<a> tags) navigate to other pages or resources using the href attribute. Images (<img> tags) display visual content using the src attribute. Both are essential for creating interactive and visually appealing web pages. Always include alt text for accessibility.',
        syntax: '<a href="page.html">Link</a> <img src="image.jpg" alt="Description">',
        examples: ['<a href="https://google.com">Visit Google</a>', '<img src="photo.png" alt="My Photo">'],
        notes: ['href specifies the link destination', 'src specifies image file path', 'alt text is crucial for screen readers'],
        c: 'Use <a> and <img> tags properly.',
        quiz: { q: 'Attribute for image source?', opts: [{ t: 'href', ok: false }, { t: 'src', ok: true }, { t: 'alt', ok: false }] }
      },
      {
        t: '3. Forms',
        shortDescription: 'Collect user input with forms.',
        detailedDefinition: 'Forms collect user data through input fields. The <form> tag wraps form elements. Various input types include text, email, password, number, checkbox, radio, and more. The submit button sends form data to a server for processing.',
        syntax: '<form><input type="text"><button type="submit">Submit</button></form>',
        examples: ['<input type="email" name="email">', '<textarea name="message"></textarea>', '<input type="checkbox" name="agree">'],
        notes: ['Each input should have a name attribute', '<label> improves usability', 'Forms need action and method attributes'],
        c: 'Collect input from users.',
        quiz: { q: 'Tag used to submit data?', opts: [{ t: '<form>', ok: true }, { t: '<input>', ok: false }, { t: '<label>', ok: false }] }
      }
    ]
  },
  {
    name: 'CSS',
    overview: 'Learn to style and design beautiful web pages with CSS. From basic selectors to advanced layouts with Flexbox and Grid.',
    icon: '<i class="bx bxl-css3"></i>',
    techIcons: ['<i class="bx bxl-css3"></i>'],
    badge: 'BEGINNER',
    syllabus: [
      {
        t: '1. Selectors',
        shortDescription: 'Target elements using selectors.',
        detailedDefinition: 'Selectors target HTML elements to apply styles. Element selectors target all elements of a type. Class selectors target elements with a specific class. ID selectors target unique elements. Attribute selectors target elements with specific attributes.',
        syntax: 'p { } .classname { } #idname { } [attribute="value"] { }',
        examples: ['div { color: blue; }', '.highlight { background: yellow; }', '#header { padding: 20px; }'],
        notes: ['Element selector: p, h1, div', 'Class selector: .classname', 'ID selector: #idname'],
        c: 'Target elements using selectors.',
        quiz: { q: 'Selector for id?', opts: [{ t: '#id', ok: true }, { t: '.class', ok: false }, { t: 'tag', ok: false }] }
      },
      {
        t: '2. Box Model',
        shortDescription: 'Understanding the CSS box model.',
        detailedDefinition: 'The box model describes how elements on a page are laid out. Every element has content, then padding (inside), border, and margin (outside). Content-box vs border-box affects how width and height are calculated. Understanding this is crucial for layout.',
        syntax: 'box-sizing: border-box; padding: 10px; margin: 5px; border: 1px solid black;',
        examples: ['div { width: 100px; padding: 10px; margin: 20px; }', 'p { border: 2px solid red; }'],
        notes: ['margin: space outside border', 'padding: space inside element', 'border: line around element'],
        c: 'Margins, borders, padding and content.',
        quiz: { q: 'Part that adds space inside element?', opts: [{ t: 'margin', ok: false }, { t: 'padding', ok: true }, { t: 'border', ok: false }] }
      },
      {
        t: '3. Flexbox',
        shortDescription: 'Layout with flexbox.',
        detailedDefinition: 'Flexbox (Flexible Box Layout) provides an efficient way to arrange space and distribute elements. The flex container holds flex items. Use justify-content for horizontal alignment, align-items for vertical alignment, and flex-wrap for wrapping.',
        syntax: '.container { display: flex; justify-content: center; align-items: center; }',
        examples: ['.flex { display: flex; gap: 10px; }', '.container { flex-wrap: wrap; }'],
        notes: ['display: flex enables flexbox', 'justify-content aligns horizontally', 'align-items aligns vertically'],
        c: 'Layout with flexbox.',
        quiz: { q: 'Property to align items along main axis?', opts: [{ t: 'justify-content', ok: true }, { t: 'align-items', ok: false }, { t: 'flex-wrap', ok: false }] }
      }
    ]
  },
  {
    name: 'PHP',
    overview: 'Build dynamic web applications with PHP. Learn server-side programming, databases, sessions, and security best practices.',
    icon: '<i class="bx bxl-php"></i>',
    techIcons: ['<i class="bx bxl-php"></i>'],
    badge: 'INTERMEDIATE',
    syllabus: [
      {
        t: '1. Variables & Data Types',
        shortDescription: 'Work with PHP variables.',
        detailedDefinition: 'PHP variables store data values. Variables start with $ symbol. PHP is loosely typed, so variables can hold any data type. Common types include string, integer, float, boolean, array, and object.',
        syntax: '$variable = "value"; $age = 25; $price = 99.99;',
        examples: ['$name = "John";', '$count = 10;', '$items = array("apple", "banana");'],
        notes: ['Variables start with $', 'No need to declare type', 'Variable names are case-sensitive'],
        c: 'Target elements using selectors.',
        quiz: { q: 'How do you declare a variable in PHP?', opts: [{ t: '$name', ok: true }, { t: 'name', ok: false }, { t: 'var name', ok: false }] }
      },
      {
        t: '2. Control Structures',
        shortDescription: 'Control program flow in PHP.',
        detailedDefinition: 'Control structures determine program flow. If statements execute code conditionally. Loops repeat code blocks. Switch statements handle multiple conditions. These are essential for logical programming.',
        syntax: 'if ($age > 18) { } for ($i = 0; $i < 10; $i++) { }',
        examples: ['if ($name == "Admin") { echo "Welcome"; }', 'while ($count < 5) { $count++; }'],
        notes: ['if, else if, else for conditions', 'for, while loops for repetition', 'switch for multiple cases'],
        c: 'Margins, borders, padding and content.',
        quiz: { q: 'Which control structure is used for repetition?', opts: [{ t: 'if', ok: false }, { t: 'loop', ok: true }, { t: 'switch', ok: false }] }
      },
      {
        t: '3. Functions & Arrays',
        shortDescription: 'Create functions and work with arrays.',
        detailedDefinition: 'Functions encapsulate reusable code. Arrays store multiple values in one variable. Associative arrays use keys instead of indices. Understanding functions and arrays is crucial for organized code. Functions improve code reusability and maintainability.',
        syntax: 'function greet($name) { return "Hello " . $name; } $arr = array("a", "b", "c");',
        examples: ['function add($a, $b) { return $a + $b; }', '$colors = array("red", "green", "blue");'],
        notes: ['Functions start with function keyword', 'Arrays are created with array() or []', 'Associative arrays use key => value'],
        c: 'Layout with flexbox.',
        quiz: { q: 'How do you create a function in PHP?', opts: [{ t: 'def name()', ok: false }, { t: 'function name()', ok: true }, { t: 'func name()', ok: false }] }
      }
    ]
  },
  {
    name: 'JAVA',
    overview: 'Dive into Java - one of the most popular programming languages. Learn OOP concepts, exception handling, and build real-world applications.',
    icon: '<i class="bx bxl-java"></i>',
    techIcons: ['<i class="bx bxl-java"></i>'],
    badge: 'INTERMEDIATE',
    syllabus: [
      {
        t: '1. Java Basics',
        shortDescription: 'Get started with Java.',
        detailedDefinition: 'Java is an object-oriented programming language. Every Java program runs on the Java Virtual Machine (JVM). Main method is the entry point. Java emphasizes "write once, run anywhere" philosophy. It\'s platform-independent and widely used for enterprise applications.',
        syntax: 'public class HelloWorld { public static void main(String[] args) { } }',
        examples: ['System.out.println("Hello");', 'int x = 10;', 'String message = "Java";'],
        notes: ['Java is case-sensitive', 'Every program must have a main method', 'Statements end with semicolon'],
        c: 'Target elements using selectors.',
        quiz: { q: 'What is the entry point of a Java program?', opts: [{ t: 'main method', ok: true }, { t: 'constructor', ok: false }, { t: 'start method', ok: false }] }
      },
      {
        t: '2. Object-Oriented Programming',
        shortDescription: 'Master OOP concepts in Java.',
        detailedDefinition: 'OOP revolves around objects and classes. Encapsulation hides data. Inheritance allows code reuse. Polymorphism enables method overriding. Abstraction simplifies complex systems. These principles make code organized and maintainable.',
        syntax: 'class Animal { } class Dog extends Animal { }',
        examples: ['public class Car { private String color; }', 'class Vehicle { public void drive() { } }'],
        notes: ['Classes define objects', 'Inheritance extends parent class', 'Polymorphism allows override'],
        c: 'Margins, borders, padding and content.',
        quiz: { q: 'What does encapsulation do?', opts: [{ t: 'Hides data', ok: true }, { t: 'Extends class', ok: false }, { t: 'Overrides method', ok: false }] }
      },
      {
        t: '3. Exception Handling',
        shortDescription: 'Handle errors gracefully.',
        detailedDefinition: 'Exceptions occur when something goes wrong during execution. Try-catch blocks handle exceptions. Throw keyword throws custom exceptions. Finally block executes regardless. Proper exception handling prevents abrupt program termination and provides user-friendly error messages.',
        syntax: 'try { } catch (Exception e) { } finally { }',
        examples: ['try { int x = 5/0; } catch (ArithmeticException e) { }', 'throw new Exception("Error");'],
        notes: ['Try catches potential errors', 'Catch handles specific exceptions', 'Finally cleans up resources'],
        c: 'Layout with flexbox.',
        quiz: { q: 'Which block always executes in try-catch-finally?', opts: [{ t: 'try', ok: false }, { t: 'catch', ok: false }, { t: 'finally', ok: true }] }
      }
    ]
  }
];

// Export coursesData for backwards compatibility initially, but we will mostly rely on Supabase
// localStorage.setItem('coursesData', JSON.stringify(coursesData));

// STATE
let activeUser = null;
try {
  const stored = localStorage.getItem('activeUser');
  activeUser = stored ? JSON.parse(stored) : null;
} catch (e) {
  activeUser = null;
}
let activeCourse = null;
let activeChapter = 0;
let allNotes = JSON.parse(localStorage.getItem('allNotes')) || {};
let progress = JSON.parse(localStorage.getItem('progress')) || {};
let userCourses = JSON.parse(localStorage.getItem('userCourses')) || {}; // Track started courses per user

// Initialize on page load
async function initPageLoad() {
  // Check for existing Supabase session
  await checkAndRestoreSession();
  await fetchCoursesFromSupabase();
  if (activeUser) {
    await loadUserDataFromSupabase();
  }
  renderGrid();
  if (activeUser) {
    updateProfileMenu();
  }
}

function updateProfileMenu() {
  const profileSection = document.getElementById('profileSection');
  const profileEmail = document.getElementById('profileEmail');
  const profileName = document.getElementById('profileName');
  if (activeUser && profileSection) {
    profileSection.style.display = 'flex';
    const email = activeUser.email || activeUser;
    if (profileEmail) profileEmail.innerText = email;
    if (profileName) {
      if (activeUser.id && window.supabaseClient) {
        supabaseClient.from('users').select('full_name').eq('id', activeUser.id).single()
          .then(({ data, error }) => {
            if (data && data.full_name) {
              profileName.innerText = data.full_name;
            } else {
              const namePart = typeof email === 'string' ? email.split('@')[0] : 'Student';
              profileName.innerText = namePart.charAt(0).toUpperCase() + namePart.slice(1);
            }
          })
          .catch(() => {
              const namePart = typeof email === 'string' ? email.split('@')[0] : 'Student';
              profileName.innerText = namePart.charAt(0).toUpperCase() + namePart.slice(1);
          });
      } else {
        // Basic display name derivation from email
        const namePart = typeof email === 'string' ? email.split('@')[0] : 'Student';
        profileName.innerText = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      }
    }
  }
}

async function fetchCoursesFromSupabase() {
  try {
    const { data, error } = await supabaseClient
      .from('courses')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    if (!data || data.length === 0) {
      // If empty, insert the hardcoded courses
      console.log('Courses table empty, seeding data...');
      coursesData = initialCoursesData;
      for (const course of coursesData) {
        await supabaseClient.from('courses').insert({
          name: course.name,
          overview: course.overview,
          badge: course.badge,
          icon: course.icon,
          tech_icons: course.techIcons || [],
          syllabus: course.syllabus || [],
          is_live: true
        });
      }
      // fetch again to get IDs and standardize format
      const { data: newData } = await supabaseClient.from('courses').select('*').order('id', { ascending: true });
      if (newData) coursesData = newData;
    } else {
      coursesData = data;
      // Note: techIcons maps from tech_icons in Supabase for backwards compatibility
      coursesData.forEach(c => {
        c.techIcons = c.tech_icons || [];
      });
    }

    // Save to localStorage just in case other standalone pages need it synchronously before they update
    localStorage.setItem('coursesData', JSON.stringify(coursesData));
  } catch (err) {
    console.error('Failed to fetch courses:', err);
    coursesData = initialCoursesData; // Fallback
  }
}

async function checkAndRestoreSession() {
  try {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (user) {
      activeUser = { email: user.email, id: user.id };
      localStorage.setItem('activeUser', JSON.stringify(activeUser));
      updateProfileMenu();
    }
  } catch (error) {
    console.log('No active session');
  }
}

async function loadUserDataFromSupabase() {
  if (!activeUser || !activeUser.id) return;
  try {
    const uKey = activeUser.email || activeUser;
    // Load progress
    const { data: progData } = await supabaseClient
      .from('course_progress')
      .select('course_name, chapter_index, completed')
      .eq('user_id', activeUser.id)
      .eq('completed', true);

    if (progData) {
      progress[uKey] = {};
      progData.forEach(p => {
        if (!progress[uKey][p.course_name]) progress[uKey][p.course_name] = [];
        progress[uKey][p.course_name].push(p.chapter_index);
      });
      localStorage.setItem('progress', JSON.stringify(progress));
    }

    // Load notes
    const { data: notesData } = await supabaseClient
      .from('user_notes')
      .select('course_name, chapter_index, note_content')
      .eq('user_id', activeUser.id);

    if (notesData) {
      allNotes[uKey] = {};
      notesData.forEach(n => {
        if (!allNotes[uKey][n.course_name]) allNotes[uKey][n.course_name] = {};
        allNotes[uKey][n.course_name][n.chapter_index] = n.note_content;
      });
      localStorage.setItem('allNotes', JSON.stringify(allNotes));
    }
  } catch (e) {
    console.error('Failed to load user data:', e);
  }
}

// Call on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPageLoad);
} else {
  initPageLoad();
}

// Show profile menu if user is already logged in
if (activeUser) {
  updateProfileMenu();
}

async function login() {
  const e = document.getElementById('email').value.trim();
  const p = document.getElementById('password').value;
  const errorMsg = document.getElementById('loginError');

  try {
    // Sign in with Supabase
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: e,
      password: p
    });

    if (error) throw new Error(error.message);

    activeUser = { email: e, id: data.user.id };
    localStorage.setItem('activeUser', JSON.stringify(activeUser));

    await loadUserDataFromSupabase();

    errorMsg.style.display = 'none';
    // Clear form
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('agree').checked = false;
    init();
  } catch (error) {
    errorMsg.innerText = error.message || 'Invalid email or password';
    errorMsg.style.display = 'block';
    setTimeout(() => {
      errorMsg.style.display = 'none';
    }, 3000);
  }
}
async function logout() {
  try {
    await supabaseClient.auth.signOut();
    localStorage.removeItem('activeUser');
    location.reload();
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.removeItem('activeUser');
    location.reload();
  }
}

function init() {
  // Show profile menu when user is logged in
  updateProfileMenu();
}

function renderGrid() {
  const g = document.getElementById('grid'); g.innerHTML = '';

  coursesData.forEach((c, idx) => {
    if (c.hasOwnProperty('is_live') && !c.is_live) return; // Skip if offline

    const uKey = activeUser ? (activeUser.email || activeUser) : null;
    const userProg = uKey && progress[uKey] ? (progress[uKey][c.name] || []) : [];
    const totalChapters = c.syllabus.length;
    const completedChapters = userProg.length;
    const progressPercent = Math.round((completedChapters / totalChapters) * 100);

    let techIconsHtml = '';
    if (c.techIcons && c.techIcons.length > 0) {
      techIconsHtml = c.techIcons.map(icon => `<div class="tech-icon">${icon}</div>`).join('');
    }

    g.innerHTML += `
          <div class="course-card" onclick="openReader('${c.name}')">
            <div class="card-badge">${c.badge || 'COURSE'}</div>
            <div class="card-icon">${c.icon}</div>
            <div class="card-body">
              <div class="card-title">${c.name}</div>
              <p class="card-overview">${c.overview}</p>
              <div class="tech-icons">${techIconsHtml}</div>
            </div>
          </div>`;
  });
}

async function openReader(cName) {
  // Check if user is logged in
  if (!activeUser) {
    alert('Please log in first to access this course.');
    // Scroll to login section at top
    document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('email').focus();
    return;
  }

  // Add course to user's "My Courses" list
  const userEmail = typeof activeUser === 'string' ? activeUser : activeUser.email;
  if (!userCourses[userEmail]) {
    userCourses[userEmail] = [];
  }

  // Check if course already in list
  if (!userCourses[userEmail].includes(cName)) {
    userCourses[userEmail].push(cName);
    localStorage.setItem('userCourses', JSON.stringify(userCourses));
  }

  // Save course enrollment to Supabase
  await saveUserCourse(cName);

  // Redirect to course.html with course name as a URL parameter
  window.location.href = 'course.html?course=' + encodeURIComponent(cName);
}
function closeReader() { document.getElementById('reader').style.display = 'none'; }

function getCourseObj() { return coursesData.find(x => x.name === activeCourse); }

function isChapterLocked(i) {
  if (i === 0) return false;
  const uKey = activeUser.email || activeUser;
  const userProg = progress[uKey]?.[activeCourse] || [];
  return !userProg.includes(i - 1);
}
function attemptLoadChapter(i) { if (isChapterLocked(i)) { alert('This chapter is locked. Complete the previous chapter first.'); return; } loadChapter(i); }

function renderSidebar() {
  const list = document.getElementById('chapterList'); list.innerHTML = '';
  const uKey = activeUser.email || activeUser;
  const userProg = progress[uKey]?.[activeCourse] || [];
  const course = getCourseObj();
  course.syllabus.forEach((s, i) => {
    const isDone = userProg.includes(i);
    const locked = isChapterLocked(i);
    const activeCls = activeChapter === i ? 'active' : '';
    const doneCls = isDone ? 'completed' : '';
    const lockedCls = locked ? 'locked' : '';
    const icon = locked ? "<i class='bx bxs-lock lock-icon'></i>" : (isDone ? "<i class='bx bxs-check-circle'></i>" : "");
    list.innerHTML += `<div class="toc-item ${activeCls} ${doneCls} ${lockedCls}" onclick="attemptLoadChapter(${i})"><span>${s.t}</span>${icon}</div>`;
  });
}

function loadChapter(i) {
  if (isChapterLocked(i)) { alert('This chapter is locked. Complete the previous chapter first.'); return; }
  activeChapter = i; const course = getCourseObj(); const s = course.syllabus[i];
  document.getElementById('lessonTitle').innerText = s.t;
  document.getElementById('lessonText').innerHTML = s.c;

  const uKey = activeUser.email || activeUser;
  if (!allNotes[uKey]) allNotes[uKey] = {};
  if (!allNotes[uKey][activeCourse]) allNotes[uKey][activeCourse] = {};
  document.getElementById('noteInput').value = allNotes[uKey][activeCourse][i] || '';

  // Quiz render
  const quiz = s.quiz;
  const qc = document.getElementById('quizContainer');
  if (quiz) {
    let html = `<h3 style="margin-bottom:12px">Q: ${quiz.q}</h3>`;
    quiz.opts.forEach((op, idx) => { html += `<div class='quiz-option' onclick='checkQuiz(this, ${op.ok})'>${String.fromCharCode(65 + idx)}. ${op.t}</div>`; });
    qc.innerHTML = html;
  } else { qc.innerHTML = '<em>No quiz for this topic.</em>'; }

  // Reset quiz UI
  document.querySelectorAll('.quiz-option').forEach(el => { el.className = 'quiz-option'; el.style.pointerEvents = 'auto'; });
  document.getElementById('quizResult').innerText = '';

  renderSidebar();
}

function switchTab(tabName) {
  ['read', 'notes', 'quiz'].forEach(t => {
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

async function markChapterComplete() {
  const uKey = activeUser.email || activeUser;
  if (!progress[uKey]) progress[uKey] = {};
  if (!progress[uKey][activeCourse]) progress[uKey][activeCourse] = [];
  if (!progress[uKey][activeCourse].includes(activeChapter)) {
    progress[uKey][activeCourse].push(activeChapter);
    localStorage.setItem('progress', JSON.stringify(progress));

    if (activeUser && activeUser.id) {
      try {
        await supabaseClient.from('course_progress').upsert({
          user_id: activeUser.id,
          course_name: activeCourse,
          chapter_index: activeChapter,
          completed: true,
          completed_at: new Date().toISOString()
        }, { onConflict: 'user_id,course_name,chapter_index' });
      } catch (err) { console.error('Error saving progress:', err); }
    }

    renderSidebar();
    const next = activeChapter + 1; if (next < getCourseObj().syllabus.length) { loadChapter(next); } else { alert("Course Completed! You've finished this course 🎉"); }
  }
}

async function saveNote() {
  const txt = document.getElementById('noteInput').value;
  if (!activeUser) return;

  const uKey = activeUser.email || activeUser;
  // Save to localStorage first (for offline support)
  if (!allNotes[uKey]) allNotes[uKey] = {};
  if (!allNotes[uKey][activeCourse]) allNotes[uKey][activeCourse] = {};
  allNotes[uKey][activeCourse][activeChapter] = txt;
  localStorage.setItem('allNotes', JSON.stringify(allNotes));

  // Save to Supabase
  await saveNoteToSupabase(txt);

  const msg = document.getElementById('saveMsg');
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 1500);
}

async function saveNoteToSupabase(noteContent) {
  if (!activeUser) return;

  try {
    const courseObj = getCourseObj();
    const { error } = await supabaseClient
      .from('user_notes')
      .upsert({
        user_id: activeUser.id,
        course_name: courseObj.name,
        chapter_index: activeChapter,
        note_content: noteContent
      }, { onConflict: 'user_id,course_name,chapter_index' });

    if (error) console.error('Error saving note to Supabase:', error);
  } catch (error) {
    console.error('Error saving note:', error);
  }
}

async function saveUserCourse(courseName) {
  if (!activeUser) return;

  try {
    const { error } = await supabaseClient
      .from('user_courses')
      .insert({
        user_id: activeUser.id,
        course_name: courseName
      });

    if (error && error.code !== '23505') {
      console.error('Error saving course:', error);
    }
  } catch (error) {
    console.error('Error saving course:', error);
  }
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

