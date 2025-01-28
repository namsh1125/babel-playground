/**
 * ES6+ 코드를 ES5로 변환하기 위한 Babel 설정
 * @see {@link https://babeljs.io/docs/babel-preset-env} - env preset 설정
 * @see {@link https://babeljs.io/docs/babel-plugin-transform-class-properties} - class properties 변환
 * @see {@link https://babeljs.io/docs/babel-plugin-proposal-private-methods} - private methods 변환
 * @see {@link https://babeljs.io/docs/babel-plugin-transform-arrow-functions} - 화살표 함수 변환
 * @see {@link https://babeljs.io/docs/babel-plugin-transform-template-literals} - 템플릿 리터럴 변환
 * @see {@link https://babeljs.io/docs/babel-plugin-transform-destructuring} - 구조 분해 할당 변환
 * @see {@link https://babeljs.io/docs/babel-plugin-transform-spread} - 스프레드 연산자 변환
 * @see {@link https://babeljs.io/docs/babel-plugin-proposal-optional-chaining} - 옵셔널 체이닝 변환
 * @see {@link https://babeljs.io/docs/babel-plugin-proposal-nullish-coalescing-operator} - null 병합 연산자 변환
 * @see {@link https://babeljs.io/docs/babel-plugin-transform-runtime} - 런타임 헬퍼 및 폴리필 설정
 * @type {import("@babel/core").TransformOptions}
 */
export const ES6_TO_ES5_CONFIG = {
  presets: [
    [
      "env",
      {
        /**
         * 브라우저 타겟 설정
         * - IE11: Internet Explorer 11 지원 (2013년 출시)
         * - Chrome 58+: 2017년 4월 이후 버전 지원 (Promise, async/await 지원)
         * - Firefox 54+: 2017년 6월 이후 버전 지원 (ES6 모듈 지원)
         * - Safari 11+: 2017년 9월 이후 버전 지원 (async/await 지원)
         */
        targets: {
          ie: "11",
          chrome: "58",
          firefox: "54",
          safari: "11",
        },
        /**
         * loose 모드 비활성화
         * - false: ECMAScript 명세를 정확히 준수하는 코드 생성
         * - 더 안전하지만 코드가 약간 더 복잡할 수 있음
         */
        loose: false,
        /**
         * 모듈 변환 방식 설정
         * - commonjs: Node.js 스타일의 require/exports 사용
         * - false: ES 모듈 문법 유지 (import/export)
         * - amd: RequireJS 스타일
         * - umd: AMD와 CommonJS 모두 지원
         */
        modules: "commonjs",
        /**
         * 폴리필 설정
         * - usage: 실제 사용된 기능에 대한 폴리필만 포함
         * - 최신 JavaScript 기능을 위한 폴리필 자동 주입
         */
        useBuiltIns: "usage",
        /**
         * core-js 버전 지정
         * - 3: 최신 버전의 폴리필 사용
         */
        corejs: 3,
      },
    ],
  ],
  plugins: [
    // 런타임 변환 설정 (폴리필 및 헬퍼 함수 관리)
    [
      "transform-runtime",
      {
        /**
         * core-js 버전 설정
         * - 3: ES2015+ 폴리필 지원
         * - false: 폴리필 비활성화
         */
        corejs: 3,
        /**
         * 헬퍼 함수 관리
         * - true: 전역 스코프 오염 방지
         * - false: 인라인 헬퍼 함수 사용
         */
        helpers: true,
        /**
         * regenerator-runtime 관리
         * - true: async/await 변환 시 런타임 재사용
         */
        regenerator: true,
      },
    ],

    // 클래스 관련 변환 (standalone 버전에서는 transform- 접두사 사용)
    ["transform-class-properties", { loose: false }],
    ["transform-private-methods", { loose: false }],
    ["transform-private-property-in-object", { loose: false }],
    "transform-classes",

    // 함수 관련 변환
    "transform-arrow-functions", // () => {} 를 function() {}로 변환
    "transform-parameters", // 기본 매개변수, rest 매개변수 지원

    // 객체/배열 관련 변환
    "transform-destructuring", // const { x } = obj; 구문 지원
    "transform-spread", // [...array] 구문 지원
    "proposal-object-rest-spread", // { ...obj } 구문 지원

    // 문자열 관련 변환
    "transform-template-literals", // `템플릿 리터럴` 지원

    // ES2020+ 기능 변환
    [
      "proposal-optional-chaining",
      {
        /**
         * Optional Chaining (?.) 변환
         * 예시: obj?.prop → 폴리필된 안전한 접근 방식으로 변환
         * 주의: IE11 지원을 위해 transform-runtime과 함께 사용 필요
         */
      },
    ],
    [
      "proposal-nullish-coalescing-operator",
      {
        /**
         * Nullish Coalescing (??) 변환
         * 예시: a ?? b → 폴리필된 null/undefined 체크로 변환
         * 주의: IE11 지원을 위해 transform-runtime과 함께 사용 필요
         */
      },
    ],
  ],
  sourceType: "script",
  generatorOpts: {
    retainLines: true, // 원본 코드의 줄 번호 유지
    compact: false, // 압축하지 않은 형태로 출력
    minified: false, // 최소화하지 않음
    comments: true, // 주석 유지
  },
};
