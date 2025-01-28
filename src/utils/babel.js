import * as Babel from "@babel/standalone";
import * as parser from "@babel/parser";
import generate from "@babel/generator";
import { ES6_TO_ES5_CONFIG } from "../constants/playground-page-transform-code-babel-config";
import {
  PARSER_CONFIG,
  GENERATOR_CONFIG,
} from "../constants/transform-process-page-transform-code-config";

/**
 * ES6+ 코드를 ES5 코드로 변환
 * 해당 코드는 오로지 PlayGround에서만 사용
 *
 * @see {@link https://babeljs.io/docs/babel-core}
 */
export const transformCode = (code) => {
  if (!code?.trim()) {
    return { code: "", ast: null, error: null };
  }

  try {
    const result = Babel.transform(code, {
      filename: "example.js",
      presets: ["env"],
      ast: true,
    });

    return {
      code: result.code,
      ast: result.ast,
      error: null,
    };
  } catch (error) {
    return {
      code: null,
      ast: null,
      error: `변환 오류: ${error.message}`,
    };
  }
};

/**
 * 소스 코드를 AST로 파싱
 * @param {string} code - 파싱할 소스 코드
 * @returns {{ast: Object|null, error: string|null, formatted: string|null}} 파싱된 AST 또는 에러
 */
export const parseToAST = (code) => {
  if (!code?.trim()) {
    return { ast: null, error: "코드가 비어있습니다.", formatted: null };
  }

  try {
    const ast = parser.parse(code, {
      ...PARSER_CONFIG,
      sourceType: "module",
    });
    return {
      ast,
      error: null,
      formatted: JSON.stringify(ast, null, 2),
    };
  } catch (error) {
    return {
      ast: null,
      error: `파싱 오류: ${error.message}`,
      formatted: null,
    };
  }
};

/**
 * AST를 소스 코드로 생성
 * @param {Object} ast - 생성할 AST
 * @returns {{code: string|null, error: string|null}} 생성된 코드 또는 에러
 */
export const generateCode = (ast) => {
  try {
    const result = generate(ast, GENERATOR_CONFIG);
    return { code: result.code, error: null };
  } catch (error) {
    return { code: null, error: error.message };
  }
};

/**
 * AST에 변환 플러그인 적용
 * @param {Object} ast - 변환할 AST
 * @param {Array<string>} plugins - 적용할 플러그인 목록
 * @returns {{ast: Object|null, error: string|null}} 변환된 AST 또는 에러
 */
export const transformAST = (ast, plugins = []) => {
  try {
    const { ast: transformedAST } = Babel.transformFromAst(ast, null, {
      plugins, // 플러그인만 사용
      ast: true,
      code: false,
      configFile: false,
      babelrc: false,
    });
    return { ast: transformedAST, error: null };
  } catch (error) {
    return { ast: null, error: error.message };
  }
};
