export const DEFAULT_CODE = `// Arrow Function 예제
const greet = (name) => {
  return \`Hello, \${name}!\`;
};

// Class Properties 예제
class Person {
  name = "John";
  age = 30;

  // Arrow Function Method
  sayHi = () => {
    console.log(\`Hi, I'm \${this.name}\`);
  };
}

// Optional Chaining & Nullish Coalescing 예제
const config = {
  settings: {
    timeout: 0
  }
};

const timeout = config?.settings?.timeout ?? 1000;
const username = user?.profile?.name ?? "Anonymous";`;
