import { useState, useEffect, useCallback } from "react";
import CodeEditor from "../components/layout/common/CodeEditor";
import debounce from "lodash/debounce";
import { transformCode } from "../utils/babel";
import { DEFAULT_CODE } from "../constants/playground-page-default-code";

export default function PlaygroundPage() {
  const [input, setInput] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // 코드 변환 함수
  const handleTransform = useCallback((code) => {
    const result = transformCode(code);
    if (result.error) {
      setError(result.error);
      setOutput("");
    } else {
      setOutput(result.code || "");
      setError("");
    }
  }, []);

  // 디바운스된 변환 함수
  const debouncedTransform = useCallback(
    debounce((code) => handleTransform(code), 500),
    [handleTransform]
  );

  // 초기 로딩
  useEffect(() => {
    handleTransform(input);
  }, [handleTransform, input]);

  // 입력값 변경 시 변환 실행
  useEffect(() => {
    if (input) {
      debouncedTransform(input);
    }
  }, [input, debouncedTransform]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-down">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Babel Playground
        </h1>
        <p className="text-gray-600">
          최신 JavaScript 코드를 입력하면 자동으로 변환된 결과를 확인할 수
          있습니다
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4 animate-slide-right">
          <h2 className="text-lg font-semibold text-gray-900">Input</h2>
          <div className="h-[600px]">
            <CodeEditor
              value={input}
              onChange={setInput}
              language="javascript"
              height="100%"
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4 animate-slide-left">
          <h2 className="text-lg font-semibold text-gray-900">Output</h2>
          <div className="h-[600px]">
            {error ? (
              <CodeEditor value={error} readOnly={true} language="plaintext" />
            ) : (
              <CodeEditor
                value={output}
                readOnly={true}
                language="javascript"
                height="100%"
              />
            )}
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg animate-fade-up">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">사용 방법</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>왼쪽 편집기에 최신 JavaScript 코드를 입력하세요</li>
          <li>입력이 완료되면 자동으로 코드가 변환됩니다</li>
          <li>변환된 코드는 오른쪽 패널에서 실시간으로 확인할 수 있습니다</li>
          <li>에러가 발생하면 오른쪽 패널에 에러 메시지가 표시됩니다</li>
        </ul>
      </div>
    </div>
  );
}
