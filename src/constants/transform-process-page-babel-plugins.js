export const BABEL_PLUGINS = Object.freeze([
  // 1. 클래스 관련 변환을 가장 먼저
  {
    id: "proposal-class-properties",
    name: "Class Properties",
    detect: (code) => /class.*{[^}]*=/.test(code),
    sample: "class A { x = 1 }",
    description: "클래스 속성 문법 변환",
  },

  // 2. 기본 문법 변환
  {
    id: "transform-destructuring",
    name: "Destructuring",
    detect: (code) => /\{[^}]+\}\s*=/.test(code) || /\[[^\]]+\]\s*=/.test(code),
    sample: "const { x, y } = obj",
    description: "구조 분해 할당 변환",
  },
  {
    id: "transform-template-literals",
    name: "Template Literals",
    detect: (code) => /`[^`]*`/.test(code),
    sample: "`Hello ${name}`",
    description: "템플릿 리터럴을 문자열 연결로 변환",
  },
  {
    id: "transform-arrow-functions",
    name: "Arrow Functions",
    detect: (code) =>
      /(?:^|\s|;|,|\()\s*(?:\([^)]*\)|\w+)\s*=>\s*(?:{[\s\S]*}|[^;]*)/.test(
        code
      ),
    sample: "(a, b) => a + b",
    description: "화살표 함수를 일반 함수로 변환",
  },
  {
    id: "transform-spread",
    name: "Spread Operator",
    detect: (code) => /\.\.\./.test(code),
    sample: "[...array], { ...object }",
    description: "스프레드 연산자 변환",
  },

  // 3. 연산자 관련 변환
  {
    id: "proposal-optional-chaining",
    name: "Optional Chaining",
    detect: (code) => code.includes("?."),
    sample: "obj?.prop",
    description: "옵셔널 체이닝(?.) 변환",
  },
  {
    id: "proposal-nullish-coalescing-operator",
    name: "Nullish Coalescing",
    detect: (code) => code.includes("??"),
    sample: "value ?? defaultValue",
    description: "널 병합 연산자(??) 변환",
  },

  // 4. 비동기 관련 변환을 마지막에
  {
    id: "transform-async-to-generator",
    name: "Async/Await",
    detect: (code) => /async/.test(code) && /await/.test(code),
    sample: "async function foo() { await bar() }",
    description: "async/await를 generator로 변환",
  },
]);
