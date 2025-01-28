export const DEFAULT_CODE = `// 템플릿 리터럴 태그 함수
const highlight = (strings, ...values) => {
  return strings.reduce((result, str, i) => {
    return \`\${result}\${str}\${values[i] ? \`<span class="highlight">\${values[i]}</span>\` : ''}\`;
  }, '');
};

// 클래스 상속과 Private 필드 예제
class Animal {
  #privateField = "비공개";
  
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

class Dog extends Animal {
  #age = 0;
  static #count = 0;
  
  constructor(name, breed) {
    super(name);
    this.breed = breed;
    Dog.#count++;
  }
  
  // Arrow Function Method
  bark = () => {
    return highlight\`\${this.name} (a \${this.breed}) barks: Woof!\`;
  };
  
  // Private Method
  #calculateDogYears() {
    return this.#age * 7;
  }
  
  // Getter with Optional Chaining
  get info() {
    const dogYears = this.#calculateDogYears();
    return \`\${this.name} is \${dogYears} in dog years\`;
  }
}

// 비동기 함수와 구조 분해 할당
const fetchDogInfo = async ({ name, breed } = {}) => {
  const defaultData = { age: 1, owner: null, location: { city: "Unknown" } };
  
  try {
    // 가상의 API 호출
    const response = await Promise.resolve({ 
      data: { age: 3, owner: "John", location: { city: "Seoul" } }
    });
    
    const { 
      data: { 
        age, 
        owner, 
        location: { city } 
      } = defaultData 
    } = response;

    return {
      name: name ?? "Unknown Dog",
      breed: breed ?? "Mixed",
      age,
      owner: owner ?? "No owner",
      city
    };
  } catch (error) {
    console.error(error?.message ?? "Unknown error");
    return defaultData;
  }
};

// 실행 예제
const main = async () => {
  const dog = new Dog("Max", "Golden Retriever");
  console.log(dog.bark());
  
  const [...letters] = dog.name;
  const [first, ...rest] = letters;
  
  const dogInfo = await fetchDogInfo({
    name: \`\${first.toUpperCase()}\${rest.join("")}\`,
    breed: dog?.breed
  });
  
  const { age = 1, owner: dogOwner = "Unknown" } = dogInfo;
  
  console.log(
    highlight\`Age: \${age}, Owner: \${dogOwner}\`
  );
};

main().catch(console.error);`;
