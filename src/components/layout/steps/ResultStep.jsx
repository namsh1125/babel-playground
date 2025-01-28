import React from "react";
import { Card } from "@nextui-org/react";
import CodeEditor from "../common/CodeEditor";

const ResultStep = ({ originalCode, transformedCode }) => {
  return (
    <div className="space-y-8 p-4">
      <div className="text-center animate-fade-down mb-2">
        <h2 className="text-2xl font-bold mb-2">Result</h2>
        <p className="text-gray-600 max-w-3xl mx-auto whitespace-pre-line">
          {`원본 ES6+ 코드와 최종 ES5 출력 결과를 나란히 비교해볼 수 있습니다.
변환된 코드는 동일한 기능을 유지하면서 구형 브라우저에서도 실행됩니다.`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 animate-slide-right">
          <h3 className="text-lg font-semibold mb-2">Original Code (ES6+)</h3>
          <CodeEditor
            value={originalCode}
            language="javascript"
            height="700px"
            readOnly
          />
        </Card>

        <Card className="p-4 animate-slide-left">
          <h3 className="text-lg font-semibold mb-2">Transformed Code (ES5)</h3>
          <CodeEditor
            value={transformedCode}
            language="javascript"
            height="700px"
            readOnly
          />
        </Card>
      </div>
    </div>
  );
};

export default ResultStep;
