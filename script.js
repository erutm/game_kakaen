const questions = [
    {
      text: "Rani mengunggah fotonya dengan alamat rumah terlihat.",
      correct: false,
      explain: "Alamat rumah adalah data pribadi yang tidak boleh disebar."
    },
    {
      text: "Bayu bercerita kalau dia suka makan ayam goreng.",
      correct: true,
      explain: "Makanan favorit aman dibagikan."
    },
    {
      text: "Adit memberikan password game ke teman sekelas.",
      correct: false,
      explain: "Password tidak boleh dibagikan ke siapa pun."
    },
    {
      text: "Sita menulis nama dan nomor HP orang tuanya di komentar.",
      correct: false,
      explain: "Nomor HP dan nama lengkap adalah data pribadi yang harus dijaga."
    },
    {
      text: "Beni membagikan gambar kucing peliharaannya.",
      correct: true,
      explain: "Hewan peliharaan bukan data sensitif."
    }
  ];
  
  let current = 0;
  let score = 0;
  let playerName = "";
  
  function startGame() {
    const input = document.getElementById("player-name");
    playerName = input.value.trim();
  
    if (!playerName) {
      alert("Masukkan namamu terlebih dahulu.");
      return;
    }
  
    document.getElementById("start-container").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    showQuestion();
  }
  
  function showQuestion() {
    const feedback = document.getElementById("feedback");
    const questionElem = document.getElementById("question");
    const progressElem = document.getElementById("progress");
    const scoreElem = document.getElementById("score");
    const restartBtn = document.getElementById("restart-btn");
  
    feedback.textContent = "";
    scoreElem.textContent = `Skor: ${score}`;
  
    if (current < questions.length) {
      questionElem.textContent = questions[current].text;
      progressElem.textContent = `Soal ke ${current + 1} dari ${questions.length}`;
    } else {
      questionElem.textContent = "🎉 Permainan Selesai!";
      progressElem.textContent = `Skor Akhir: ${score} dari ${questions.length}`;
      feedback.textContent = score === questions.length
        ? "Hebat! Kamu menjawab semuanya dengan benar!"
        : "Bagus! Yuk belajar lagi agar makin paham menjaga privasi.";
      document.querySelectorAll("#game-container button").forEach(btn => btn.style.display = "none");
      restartBtn.style.display = "inline-block";
      scoreElem.style.display = "none";
  
      saveToLeaderboard(playerName, score);
      updateLeaderboard();
    }
  }
  
  function answer(choice) {
    if (current >= questions.length) return;
    const q = questions[current];
    const feedback = document.getElementById("feedback");
  
    if (choice === q.correct) {
      feedback.textContent = "✅ Benar! " + q.explain;
      feedback.style.color = "green";
      score++;
    } else {
      feedback.textContent = "❌ Salah! " + q.explain;
      feedback.style.color = "red";
    }
  
    current++;
    setTimeout(showQuestion, 2000);
  }
  
  function restartGame() {
    current = 0;
    score = 0;
    document.querySelectorAll("#game-container button").forEach(btn => btn.style.display = "inline-block");
    document.getElementById("score").style.display = "block";
    showQuestion();
  }
  
  function saveToLeaderboard(name, score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5); // Top 5
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }
  
  function updateLeaderboard() {
    const list = document.getElementById("leaderboard-list");
    list.innerHTML = "";
  
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  
    leaderboard.forEach((entry, index) => {
      const li = document.createElement("li");
      li.textContent = `${entry.name} – ${entry.score} poin`;
      list.appendChild(li);
    });
  }
  
  // Update leaderboard saat halaman dibuka
  updateLeaderboard();  