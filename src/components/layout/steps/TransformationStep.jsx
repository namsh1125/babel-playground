import React, { useState, useMemo } from "react";
import { Card } from "@nextui-org/react";
import CodeEditor from "../common/CodeEditor";

const TransformationStep = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAst, setShowAst] = useState({ left: true, right: true });

  const step = steps[currentStep] || {};

  // 각 에디터의 내용을 메모이제이션하여 불필요한 재계산 방지
  const content = useMemo(
    () => ({
      before: showAst.left
        ? JSON.stringify(step.before?.ast, null, 2)
        : step.before?.code || "",
      after: showAst.right
        ? JSON.stringify(step.after?.ast, null, 2)
        : step.after?.code || "",
    }),
    [step, showAst.left, showAst.right]
  );

  // 각 에디터별 고유 키 생성 함수
  // Monaco Editor는 language prop이 변경되어도 내부 상태를 제대로 업데이트하지 않는 경우가 있어
  // 토글 시 강제로 에디터를 리마운트하기 위해 사용
  const getEditorKey = (side, isAst, content) => {
    if (side === "left" && !showAst.left) {
      // 왼쪽 에디터가 Code 뷰일 때만 강제 리렌더링
      return `${side}-${isAst}-${Date.now()}`;
    }
    if (side === "right" && !showAst.right) {
      // 오른쪽 에디터가 Code 뷰일 때만 강제 리렌더링
      return `${side}-${isAst}-${Date.now()}`;
    }
    // AST 뷰일 때는 고정된 키 사용
    return `${side}-${isAst}`;
  };

  const ViewToggle = ({ isAst, onChange, side }) => (
    <div className="inline-flex rounded-lg bg-gray-100 p-1">
      <button
        onClick={() => onChange(true)}
        className={`px-4 py-1.5 text-sm rounded-md transition-all duration-200 ${
          isAst
            ? "bg-white text-indigo-600 font-semibold shadow-sm"
            : "text-gray-600 hover:text-indigo-600"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isAst ? "text-indigo-600" : "text-gray-600"}
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span>AST</span>
        </div>
      </button>
      <button
        onClick={() => onChange(false)}
        className={`px-4 py-1.5 text-sm rounded-md transition-all duration-200 ${
          !isAst
            ? "bg-white text-indigo-600 font-semibold shadow-sm"
            : "text-gray-600 hover:text-indigo-600"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={!isAst ? "text-indigo-600" : "text-gray-600"}
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>Code</span>
        </div>
      </button>
    </div>
  );

  return (
    <div className="space-y-10">
      {" "}
      <div className="text-center animate-fade-down mb-2">
        {" "}
        <h2 className="text-2xl font-bold mb-2">Transformation</h2>
        <p className="text-gray-600 max-w-3xl mx-auto whitespace-pre-line">
          {`변환 과정에서 Babel 플러그인들은 현대 JavaScript 기능을 ES5 버전으로 변환하기 위해 AST를 수정합니다.
각 플러그인이 코드를 단계별로 어떻게 변환하는지 살펴보세요.`}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-4 shadow-sm animate-slide-right">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {currentStep === 0
                ? "Current"
                : `Current (After ${steps[currentStep - 1]?.plugin?.name})`}
            </h3>
            <ViewToggle
              isAst={showAst.left}
              onChange={(value) =>
                setShowAst((prev) => ({ ...prev, left: value }))
              }
              side="left"
            />
          </div>
          <CodeEditor
            key={getEditorKey("left", showAst.left, content.before)}
            value={content.before || "// No content"}
            language={showAst.left ? "json" : "javascript"}
            height="700px"
            readOnly
          />
        </Card>

        <Card className="p-4 shadow-sm animate-slide-left">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {`After ${step.plugin?.name}`}
            </h3>
            <ViewToggle
              isAst={showAst.right}
              onChange={(value) =>
                setShowAst((prev) => ({ ...prev, right: value }))
              }
              side="right"
            />
          </div>
          <CodeEditor
            key={getEditorKey("right", showAst.right, content.after)}
            value={content.after || "// No content"}
            language={showAst.right ? "json" : "javascript"}
            height="700px"
            readOnly
          />
        </Card>
      </div>
      <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex flex-col items-center gap-6">
          {/* Navigation controls inside info card */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 transition-colors focus:outline-none"
              aria-label="Previous step"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {step.plugin?.name || "Plugin"}
              </h3>
              <span className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            <button
              onClick={() =>
                setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
              }
              disabled={currentStep === steps.length - 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 transition-colors focus:outline-none"
              aria-label="Next step"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Plugin description */}
          <p className="text-gray-600 text-center">
            {step.plugin?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransformationStep;
