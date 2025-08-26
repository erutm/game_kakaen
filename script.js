const questions = [
  {
    text: "Andi memberitahu temannya password WiFi rumahnya.",
    correct: false,
    explain: "Password rumah tidak boleh dibagikan ke siapa pun."
  },
  {
    text: "Sinta menulis alamat lengkap rumahnya di bio media sosial.",
    correct: false,
    explain: "Alamat rumah adalah rahasia pribadi yang tidak boleh disebar."
  },
  {
    text: "Budi bercerita tentang warna kesukaannya yaitu biru.",
    correct: true,
    explain: "Warna kesukaan bukan informasi rahasia."
  },
  {
    text: "Ratih membagikan foto kartu pelajar di WhatsApp.",
    correct: false,
    explain: "Kartu pelajar mengandung data penting yang bisa disalahgunakan."
  },
  {
    text: "Tono menceritakan hobinya bermain sepak bola.",
    correct: true,
    explain: "Hobi adalah hal positif yang boleh dibagikan."
  },
  {
    text: "Eko membagikan foto makanannya di kantin sekolah.",
    correct: true,
    explain: "Foto makanan biasa tidak mengandung informasi rahasia."
  },
  {
    text: "Meli menulis nomor telepon rumahnya di komentar foto.",
    correct: false,
    explain: "Nomor telepon rumah adalah data pribadi yang harus dijaga."
  },
  {
    text: "Bambang membagikan foto bermain dengan anjing peliharaannya.",
    correct: true,
    explain: "Foto bermain dengan hewan peliharaan tidak mengandung data pribadi."
  },
];

let current = 0;
let score = 0;
let playerName = "";

function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
  const input = document.getElementById("player-name");
  playerName = input.value.trim();

  if (!playerName) {
    alert("Masukkan namamu terlebih dahulu.");
    return;
  }

  shuffleQuestions(questions);
  current = 0;
  score = 0;

  document.getElementById("start-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const feedback = document.getElementById("feedback");
  const questionElem = document.getElementById("question");
  const progressElem = document.getElementById("progress");
  const scoreElem = document.getElementById("score");

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
    scoreElem.style.display = "none";

    saveToLeaderboard(playerName, score);
    updateLeaderboard();

    setTimeout(() => {
      document.getElementById("start-container").style.display = "block";
      document.getElementById("game-container").style.display = "none";
      document.getElementById("player-name").value = "";
      document.getElementById("score").style.display = "block";
      document.querySelectorAll("#game-container button").forEach(btn => btn.style.display = "inline-block");
    }, 4000);
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

function resetLeaderboard() {
  const confirmReset = confirm("Apakah kamu yakin ingin menghapus leaderboard?");
  if (confirmReset) {
    localStorage.removeItem("leaderboard");
    updateLeaderboard();
    alert("Leaderboard berhasil dihapus.");
  }
}

window.onload = () => {
  updateLeaderboard();  
  document.getElementById("start-container").style.display = "block";
  document.getElementById("game-container").style.display = "none";
};
