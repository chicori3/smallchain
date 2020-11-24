interface Human {
  name: string;
  age: number;
}

const human = {
  name: "white",
  age: 66,
};

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age} `;
};

console.log(sayHi(human));

export {};
