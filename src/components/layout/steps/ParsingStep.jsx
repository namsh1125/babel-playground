import React from "react";
import { Card } from "@nextui-org/react";
import CodeEditor from "../common/CodeEditor";

const ParsingStep = ({ sourceCode, ast, onCodeChange }) => {
  const formattedAst =
    typeof ast === "string" ? ast : JSON.stringify(ast, null, 2);

  return (
    <div className="space-y-8 p-4">
      {" "}
      <div className="text-center animate-fade-down mb-2">
        {" "}
        <h2 className="text-2xl font-bold mb-2">Parsing</h2>
        <p className="text-gray-600 max-w-3xl mx-auto whitespace-pre-line">
          {`이 단계에서 Babel은 현대 JavaScript 코드를 읽어 추상 구문 트리(AST)를 생성합니다.
AST는 Babel이 이해하고 조작할 수 있는 코드의 구조화된 표현입니다.`}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 animate-slide-right">
          <h3 className="text-lg font-semibold mb-2">Source Code</h3>
          <CodeEditor
            value={sourceCode || "// Enter your code here"}
            onChange={onCodeChange}
            language="javascript"
            height="700px"
          />
        </Card>

        <Card className="p-4 animate-slide-left">
          <h3 className="text-lg font-semibold mb-2">Abstract Syntax Tree</h3>
          <CodeEditor
            value={formattedAst || "// AST will appear here"}
            language="json"
            height="700px"
            readOnly
          />
        </Card>
      </div>
    </div>
  );
};

export default ParsingStep;
