const db = openDatabase("mydb", "1.0", "Test DB", 2 * 1024 * 1024);

db.transaction(function (tx) {
  tx.executeSql("CREATE TABLE IF NOT EXISTS LOGS (id unique, log)");
});

db.transaction(function (tx) {
  tx.executeSql("INSERT INTO LOGS (id, log) VALUES (?, ?)", [
    1,
    "First log entry",
  ]);
  tx.executeSql("INSERT INTO LOGS (id, log) VALUES (?, ?)", [
    2,
    "Second log entry",
  ]);
});

db.transaction(function (tx) {
  tx.executeSql("SELECT * FROM LOGS", [], function (tx, results) {
    const len = results.rows.length;
    for (let i = 0; i < len; i++) {
      console.log(results.rows.item(i).log);
    }
  });
});

db.transaction(function (tx) {
  tx.executeSql("UPDATE LOGS SET log = ? WHERE id = ?", [
    "Updated log entry",
    1,
  ]);
});

db.transaction(function (tx) {
  tx.executeSql("DELETE FROM LOGS WHERE id = ?", [1]);
});

db.transaction(function (tx) {
  tx.executeSql(
    "SELECT * FROM LOGS",
    [],
    function (tx, results) {
      // Başarılı sorgu
      console.log("Sorgu başarılı.");
    },
    function (tx, error) {
      // Hatalı sorgu
      console.log("Sorgu hatası: " + error.message);
    }
  );
});

function initializeDatabase() {
  db.transaction(function (tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS LOGS (id unique, log)");
    alert("Database initialized.");
  });
}

function insertData() {
  db.transaction(function (tx) {
    tx.executeSql("INSERT INTO LOGS (id, log) VALUES (?, ?)", [
      1,
      "First log entry",
    ]);
    tx.executeSql("INSERT INTO LOGS (id, log) VALUES (?, ?)", [
      2,
      "Second log entry",
    ]);
    alert("Data inserted.");
  });
}

function readData() {
  db.transaction(function (tx) {
    tx.executeSql("SELECT * FROM LOGS", [], function (tx, results) {
      const len = results.rows.length;
      let output = "";
      for (let i = 0; i < len; i++) {
        output += results.rows.item(i).log + "\n";
      }
      alert(output);
    });
  });
}

function updateData() {
  db.transaction(function (tx) {
    tx.executeSql("UPDATE LOGS SET log = ? WHERE id = ?", [
      "Updated log entry",
      1,
    ]);
    alert("Data updated.");
  });
}

function deleteData() {
  db.transaction(function (tx) {
    tx.executeSql("DELETE FROM LOGS WHERE id = ?", [1]);
    alert("Data deleted.");
  });
}

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    // Video akışını video elementine bağlayın
    const videoElement = document.querySelector("video");
    videoElement.srcObject = stream;
  })
  .catch((error) => {
    console.error("Kameraya erişim başarısız:", error);
  });

imageCapture
  .takePhoto()
  .then((blob) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(blob);
    document.body.appendChild(img);
  })
  .catch((error) => {
    console.error("Fotoğraf çekme başarısız:", error);
  });

// Odak ayarlarını al
imageCapture
  .getPhotoCapabilities()
  .then((capabilities) => {
    console.log("Odak mesafesi aralığı:", capabilities.focusMode);
  })
  .catch((error) => {
    console.error("Kamera özelliklerini alma başarısız:", error);
  });

// Parlaklık ayarını değiştir
imageCapture
  .setOptions({ brightness: 0.5 })
  .then(() => {
    console.log("Parlaklık ayarı başarıyla değiştirildi");
  })
  .catch((error) => {
    console.error("Parlaklık ayarını değiştirme başarısız:", error);
  });

let imageCapture;

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    const videoElement = document.querySelector("video");
    videoElement.srcObject = stream;

    const track = stream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
  })
  .catch((error) => {
    console.error("Kameraya erişim başarısız:", error);
  });

function capturePhoto() {
  if (imageCapture) {
    imageCapture
      .takePhoto()
      .then((blob) => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        document.body.appendChild(img);
      })
      .catch((error) => {
        console.error("Fotoğraf çekme başarısız:", error);
      });
  } else {
    console.log("ImageCapture nesnesi henüz hazır değil.");
  }
}

const audioContext = new AudioContext();

// Dış ses dosyası yüklemek
fetch("audio.mp3")
  .then((response) => response.arrayBuffer())
  .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
  .then((audioBuffer) => {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  })
  .catch((error) => console.error("Ses dosyası yükleme hatası:", error));

// Ses kaynağı oluştur
const oscillator = audioContext.createOscillator();
oscillator.frequency.value = 440; // 440 Hz
oscillator.type = "sine"; // Sine dalga formu

// Ses efekti ekle (örneğin, yankı efekti)
const delay = audioContext.createDelay();
delay.delayTime.value = 0.5; // 500 ms

// Ses kaynağını bağla
oscillator.connect(delay);
delay.connect(audioContext.destination);

// Ses oynat
oscillator.start();

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let x = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(x, 50, 50, 50);
  x += 1;
  if (x > canvas.width) {
    x = 0;
  }
  requestAnimationFrame(animate);
}

animate();

const http = NodeRequire("https");

http
  .createServer((req, res) => {
    if (req.headers.accept && req.headers.accept === "text/event-stream") {
      if (req.url === "/events") {
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        });

        // Veri gönderme
        setInterval(() => {
          res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
        }, 1000);

        // Bağlantı kapandığında temizleme
        req.on("close", () => {
          clearInterval(interval);
          res.end();
        });
      }
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(3000, () => {
    console.log("SSE server running on port 3000");
  });

if (typeof EventSource !== "undefined") {
  const eventSource = new EventSource("/events");

  eventSource.onmessage = function (event) {
    document.getElementById("time").innerText = "Current Time: " + event.data;
  };

  eventSource.onerror = function (event) {
    console.error("Error occurred: ", event);
  };
} else {
  console.log("Your browser does not support Server-Sent Events.");
}

const observer = new PerformanceObserver((list) => {
  const entries = list.getEntriesByType("img");
  entries.forEach((entry) => {
    console.log(`Resource: ${entry.name}`);
    console.log(`    Fetch Start: ${entry.fetchStart}`);
    console.log(`    Response End: ${entry.responseEnd}`);
    console.log(`    Duration: ${entry.duration}`);
  });
});

// Resource timing girişlerini dinlemeye başla
observer.observe({ entryTypes: ["img"] });
