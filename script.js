// script.js

const problems = {
    bubbleSort: [
      "for (let i = 0; i < arr.length; i++) {",
      "  for (let j = 0; j < arr.length - i - 1; j++) {",
      "    if (arr[j] > arr[j + 1]) {",
      "      let temp = arr[j];",
      "      arr[j] = arr[j + 1];",
      "      arr[j + 1] = temp;",
      "    }",
      "  }",
      "}"
    ],
    insertionSort: [
      "for (let i = 1; i < arr.length; i++) {",
      "  let key = arr[i];",
      "  let j = i - 1;",
      "  while (j >= 0 && arr[j] > key) {",
      "    arr[j + 1] = arr[j];",
      "    j--;",
      "  }",
      "  arr[j + 1] = key;",
      "}"
    ],
    factorial: [
      "function factorial(n) {",
      "  if (n === 0 || n === 1) return 1;",
      "  return n * factorial(n - 1);",
      "}"
    ],
    palindrome: [
      "function isPalindrome(str) {",
      "  let reversed = str.split('').reverse().join('');",
      "  return str === reversed;",
      "}"
    ],
    fibonacci: [
      "function fibonacci(n) {",
      "  if (n <= 1) return n;",
      "  return fibonacci(n - 1) + fibonacci(n - 2);",
      "}"
    ],
    linearSearch: [
      "function linearSearch(arr, target) {",
      "  for (let i = 0; i < arr.length; i++) {",
      "    if (arr[i] === target) return i;",
      "  }",
      "  return -1;",
      "}"
    ]
  };
  
  let correctCode = [];
  let draggedItem = null;
  let score = 0;
  let timer = 0;
  let interval;
  
  function loadProblem() {
    const selected = document.getElementById("problemSelector").value;
    const container = document.getElementById("code-container");
    const result = document.getElementById("result");
    result.textContent = "";
  
    clearInterval(interval);
    timer = 0;
    document.getElementById("timer").textContent = `⏱️ 0s`;
    interval = setInterval(() => {
      timer++;
      document.getElementById("timer").textContent = `⏱️ ${timer}s`;
    }, 1000);
  
    if (!selected) {
      container.innerHTML = "";
      return;
    }
  
    correctCode = problems[selected];
    const shuffled = [...correctCode].sort(() => Math.random() - 0.5);
    container.innerHTML = "";
  
    shuffled.forEach((line) => {
      const div = document.createElement("div");
      div.className = "code-line";
      div.draggable = true;
      div.textContent = line;
  
      div.addEventListener("dragstart", dragStart);
      div.addEventListener("dragover", dragOver);
      div.addEventListener("drop", drop);
      div.addEventListener("dragenter", dragEnter);
      div.addEventListener("dragleave", dragLeave);
  
      container.appendChild(div);
    });
  }
  
  function dragStart(e) {
    draggedItem = this;
  }
  function dragOver(e) { e.preventDefault(); }
  function dragEnter(e) { this.style.border = "2px dashed #888"; }
  function dragLeave(e) { this.style.border = "none"; }
  
  function drop(e) {
    e.preventDefault();
    this.style.border = "none";
  
    const container = document.getElementById("code-container");
    const children = Array.from(container.children);
    const fromIndex = children.indexOf(draggedItem);
    const toIndex = children.indexOf(this);
  
    if (fromIndex !== toIndex) {
      if (fromIndex < toIndex) {
        container.insertBefore(draggedItem, this.nextSibling);
      } else {
        container.insertBefore(draggedItem, this);
      }
    }
  }
  
  function checkOrder() {
    const container = document.getElementById("code-container");
    const lines = Array.from(container.children).map(el => el.textContent.trim());
  
    const isCorrect = lines.every((line, index) =>
      line.replace(/\s+/g, ' ').trim() === correctCode[index].replace(/\s+/g, ' ').trim()
    );
  
    const result = document.getElementById("result");
    if (isCorrect) {
      result.textContent = "🎉 Correct! You nailed it!";
      result.style.color = "green";
      score++;
      document.getElementById("score").textContent = `🏆 Score: ${score}`;
      clearInterval(interval);
      popBalloons();
    } else {
      result.textContent = "❌ Oops! Try again.";
      result.style.color = "red";
    }
  }
  
  function popBalloons() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const balloons = Array.from({length: 20}, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      r: 15 + Math.random() * 15,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      speed: 2 + Math.random() * 3
    }));
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const b of balloons) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        ctx.fillStyle = b.color;
        ctx.fill();
        b.y -= b.speed;
      }
      if (balloons[0].y + balloons[0].r > 0) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    animate();
  }