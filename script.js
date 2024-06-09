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
