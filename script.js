// Örnek nesne
let person = {
    id: 1,
    name: "John",
    age: 30
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
