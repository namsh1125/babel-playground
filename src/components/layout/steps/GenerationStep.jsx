import React from "react";
import { Card } from "@nextui-org/react";
import CodeEditor from "../common/CodeEditor";

const GenerationStep = ({ ast, code }) => {
  return (
    <div className="space-y-8 p-4">
      {" "}
      <div className="text-center animate-fade-down mb-2">
        {" "}
        <h2 className="text-2xl font-bold mb-2">Generation</h2>
        <p className="text-gray-600 max-w-3xl mx-auto whitespace-pre-line">
          {`마지막 단계에서 Babel은 변환된 AST를 가지고 동등한 ES5 JavaScript 코드를 생성합니다.
이 코드는 동일한 기능을 유지하면서 더 넓은 브라우저 호환성을 제공합니다.`}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 animate-slide-right">
          <h3 className="text-lg font-semibold mb-2">Transformed AST</h3>
          <CodeEditor
            value={typeof ast === "string" ? ast : JSON.stringify(ast, null, 2)}
            language="json"
            height="700px"
            readOnly
          />
        </Card>

        <Card className="p-4 animate-slide-left">
          <h3 className="text-lg font-semibold mb-2">Generated Code</h3>
          <CodeEditor
            value={code}
            language="javascript"
            height="700px"
            readOnly
          />
        </Card>
      </div>
    </div>
  );
};

export default GenerationStep;
