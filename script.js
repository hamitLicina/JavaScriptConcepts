// Örnek nesne
let person = {
  id: 1,
  name: "John",
  age: 30,
};

// Serialization
function serialize(person) {
  let buffer = new ArrayBuffer(2 + person.name.length * 2 + 4);
  let view = new DataView(buffer);

  view.setUint8(0, person.id);
  view.setUint8(1, person.age);

  for (let i = 0, strLen = person.name.length; i < strLen; i++) {
    view.setUint16(2 + i * 2, person.name.charCodeAt(i), true);
  }

  return buffer;
}

// Deserialization
function deserialize(buffer) {
  let view = new DataView(buffer);
  let id = view.getUint8(0);
  let age = view.getUint8(1);

  let name = "";
  for (let i = 2; i < buffer.byteLength; i += 2) {
    name += String.fromCharCode(view.getUint16(i, true));
  }

  return { id, name, age };
}

let serialized = serialize(person);
console.log(serialized);

let deserialized = deserialize(serialized);
console.log(deserialized);

document.addEventListener("DOMContentLoaded", function () {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazyload"));

  function lazyLoad() {
    lazyImages.forEach(function (image) {
      if (
        image.getBoundingClientRect().top < window.innerHeight &&
        image.getBoundingClientRect().bottom > 0
      ) {
        image.src = image.dataset.src;
        image.classList.remove("lazyload");
        lazyImages = lazyImages.filter((img) => img !== image);
      }
    });

    if (lazyImages.length === 0) {
      document.removeEventListener("scroll", lazyLoad);
      window.removeEventListener("resize", lazyLoad);
      window.removeEventListener("orientationchange", lazyLoad);
    }
  }

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);

  lazyLoad(); // Run on page load
});

function changeIcon() {
  const iconElement = document.getElementById("icon");
  iconElement.classList.toggle("fa-home");
  iconElement.classList.toggle("fa-user");
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); // 2D context'i elde etme

ctx.fillStyle = "red";
ctx.fillRect(50, 50, 100, 100); // Kırmızı dolu dikdörtgen

ctx.strokeStyle = "blue";
ctx.strokeRect(200, 50, 100, 100); // Mavi kenarlıklı dikdörtgen

ctx.clearRect(75, 75, 50, 50); // Dikdörtgen içinde temizleme

ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(150, 200);
ctx.lineTo(50, 200);
ctx.closePath();

ctx.strokeStyle = "green";
ctx.stroke();

ctx.fillStyle = "yellow";
ctx.fill();

ctx.beginPath();
ctx.arc(150, 150, 50, 0, Math.PI * 2, false); // Tam çember
ctx.strokeStyle = "purple";
ctx.stroke();

ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.fillText("Hello, Canvas!", 100, 100);

ctx.strokeStyle = "orange";
ctx.strokeText("Hello, Canvas!", 100, 150);

const image = new Image();
image.src = "path/to/image.jpg";

image.onload = function () {
  ctx.drawImage(image, 50, 50);
};

ctx.translate(200, 200);
ctx.rotate(Math.PI / 4); // 45 derece döndürme
ctx.fillStyle = "blue";
ctx.fillRect(-50, -50, 100, 100); // Yeni koordinat sisteminde dikdörtgen çizme

// Lineer degrade
const linearGradient = ctx.createLinearGradient(0, 0, 200, 0);
linearGradient.addColorStop(0, "red");
linearGradient.addColorStop(1, "yellow");
ctx.fillStyle = linearGradient;
ctx.fillRect(50, 50, 200, 100);

// Gölge
ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.fillStyle = "green";
ctx.fillRect(300, 50, 100, 100);

(function () {
  console.clear();
  var stage = new PIXI.Stage();
  var renderer = PIXI.autoDetectRecommendedRenderer(
    window.innerWidth,
    window.innerHeight,
    { view: document.getElementById("myCanvas"), transparent: true }
  );

  var starTexture = PIXI.Texture.fromImage(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/167451/Feedbin-Icon-star.svg"
  );

  var colours = [
    0x3498db, // Blue
    0x9b59b6, // Purple
    //0xf1c40f,  // Yellow
    //0xd35400,  // Orange
    0xfa2323, // Red
  ];

  var starPool = [];
  var starsInUse = [];
  for (var i = 0; i < 100; i++) {
    var star = new PIXI.Sprite(starTexture);
    star.anchor.x = star.anchor.y = 0.5;
    star.visible = false;
    star.scaleDecay = 0;
    star.alphaDecay = 0;
    star.speed = 0;
    star.velocity = {
      x: 0,
      y: 0,
    };
    starPool[i] = star;
    stage.addChild(star);
  }

  var spawn = function (x, y) {
    var star = starPool.splice(0, 1)[0];
    star.tint = colours[Math.floor(Math.random() * colours.length)];
    star.scale.x = star.scale.y = Math.random() * 0.8 + 0.2;
    star.scaleDecay = Math.random() * 0.05 + 0.05;
    star.alpha = Math.random() * 0.2 + 0.8;
    star.alphaDecay = Math.random() * 2 + 1;
    star.rotation = 2 * Math.random() * Math.PI;
    star.x = Math.cos(star.rotation) * 10 + x;
    star.y = Math.sin(star.rotation) * 10 + y;
    star.speed = Math.random() * 30 + 20;
    star.velocity.x = star.speed * Math.cos(star.rotation);
    star.velocity.y = star.speed * Math.sin(star.rotation);
    star.visible = true;
    starsInUse.push(star);
  };

  var updateStars = function (delta) {
    for (var i = 0; i < starsInUse.length; i++) {
      var star = starsInUse[i];
      if (star.visible) {
        star.alpha -= star.alphaDecay * delta;
        star.scale.x -= star.scaleDecay * delta;
        star.scale.y -= star.scaleDecay * delta;
        star.x += star.velocity.x * delta;
        star.y += star.velocity.y * delta;

        if (star.alpha < 0 || star.scale.x < 0) {
          star.visible = false;
          starPool.push(starsInUse.splice(i, 1)[0]);
        }
      }
    }
  };

  var lastTime = null;
  var animate = function (timestamp) {
    if (lastTime === null) {
      lastTime = timestamp;
    }
    var delta = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    for (var i = 0; i < Math.min(starPool.length, 5); i++) {
      var pos = stage.interactionManager.mouse.global;
      spawn(pos.x, pos.y);
    }
    updateStars(delta);

    renderer.render(stage);

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
})();
