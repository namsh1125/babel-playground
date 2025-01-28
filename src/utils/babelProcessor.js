import { parseToAST, transformAST, generateCode } from "./babel";
import { BABEL_PLUGINS } from "../constants/transform-process-page-babel-plugins";

export const processBabelSteps = (sourceCode) => {
  try {
    // 1. Initial Parsing
    const { ast: initialAst, formatted: formattedAst } = parseToAST(sourceCode);
    const detectedPlugins = BABEL_PLUGINS.filter((plugin) =>
      plugin.detect(sourceCode)
    );

    // 2. Sequential transformation
    const transformSteps = [];
    let currentCode = sourceCode;
    let currentAst = initialAst;

    for (const plugin of detectedPlugins) {
      // 이전 단계의 결과를 기반으로 현재 플러그인 적용
      const { ast: transformedAst } = transformAST(currentAst, [plugin.id]);
      if (!transformedAst) continue;

      // 변환된 AST를 코드로 생성
      const { code: transformedCode } = generateCode(transformedAst);

      transformSteps.push({
        plugin: {
          id: plugin.id,
          name: plugin.name,
          description: plugin.description,
        },
        before: {
          code: currentCode,
          ast: currentAst,
        },
        after: {
          code: transformedCode,
          ast: transformedAst,
        },
      });

      // 다음 플러그인을 위해 현재 상태 업데이트
      currentCode = transformedCode;
      currentAst = transformedAst;
    }

    // 최종 결과는 마지막 변환 상태 사용
    return {
      parsing: {
        sourceCode,
        ast: initialAst,
        formattedAst,
      },
      transformation: {
        steps: transformSteps,
        plugins: detectedPlugins,
      },
      generation: {
        ast: currentAst,
        code: currentCode,
      },
      result: {
        originalCode: sourceCode,
        transformedCode: currentCode,
      },
    };
  } catch (error) {
    console.error("Babel processing error:", error);
    return {
      parsing: { sourceCode, ast: null, formattedAst: null },
      transformation: { steps: [], plugins: [] },
      generation: { ast: null, code: null },
      result: { originalCode: sourceCode, transformedCode: null },
    };
  }
};
