/**
 * AST 생성을 위한 파서 설정
 * @type {Object} ParserOptions
 * @see {@link https://babeljs.io/docs/babel-parser} - Babel 파서 설정
 *
 * @property {string} sourceType - 코드 모듈 타입 설정
 *   - "module": ES6+ 모듈 시스템 사용 (import/export 지원)
 *   - "script": 전통적인 스크립트 모드
 *
 * @property {string[]} plugins - 파싱할 문법 플러그인 목록
 *   - "jsx": React JSX 문법 지원
 *   - 그 외: typescript, flow, decorators 등 추가 가능
 *
 * @property {boolean} allowReturnOutsideFunction - 함수 외부 return문 허용 여부
 *   - true: 모듈 레벨에서 return문 사용 가능
 *   - false: 함수 내부에서만 return문 사용 가능
 *
 * @property {boolean} errorRecovery - 파싱 오류 처리 방식
 *   - true: 오류 발생 시에도 가능한 만큼 파싱 계속 진행
 *   - false: 첫 오류 발생 시 즉시 중단
 */
export const PARSER_CONFIG = {
  sourceType: "module",
  plugins: ["jsx"],
  allowReturnOutsideFunction: true,
  errorRecovery: true,
};

/**
 * 코드 생성을 위한 설정
 * @type {Object} GeneratorOptions
 * @see {@link https://babeljs.io/docs/babel-generator} - 코드 생성기 설정
 *
 * @property {boolean} retainLines - 원본 코드의 줄 번호 유지 여부
 *   - true: 변환된 코드가 원본과 같은 줄 번호 유지
 *   - false: 최적화된 줄 바꿈 사용
 *
 * @property {boolean} compact - 코드 압축 여부
 *   - true: 공백 최소화, 한 줄로 출력
 *   - false: 읽기 쉽게 들여쓰기와 줄 바꿈 유지
 *
 * @property {Object} jsescOption - JavaScript escape 처리 옵션
 *   @property {boolean} minimal - 이스케이프 문자 처리 방식
 *     - true: 최소한의 필수 문자만 이스케이프 처리
 *     - false: 안전을 위해 모든 특수 문자 이스케이프 처리
 */
export const GENERATOR_CONFIG = {
  retainLines: true,
  compact: false,
  jsescOption: {
    minimal: true,
  },
};
