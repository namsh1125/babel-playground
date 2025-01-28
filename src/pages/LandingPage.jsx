import { useState, useEffect } from "react";
import CodeEditor from "../components/layout/common/CodeEditor";
import {
  MODERN_CODE,
  TRANSFORMED_CODE,
} from "../constants/landing-page-default-code";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          JavaScript Evolution with Babel
        </h1>
        <p className="text-xl text-gray-600">
          Modern JavaScript를 모든 브라우저에서 동작하는 코드로 변환합니다
        </p>
      </div>

      <div
        className={`grid grid-cols-2 gap-10 mb-24 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Modern JavaScript */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">
              Modern JavaScript
            </h2>
          </div>
          <div className="h-[500px] rounded-xl overflow-hidden">
            <CodeEditor value={MODERN_CODE} readOnly={true} />
          </div>
        </div>

        {/* Transformed Code */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">
              Browser Compatible
            </h2>
          </div>
          <div className="h-[500px] rounded-xl overflow-hidden">
            <CodeEditor value={TRANSFORMED_CODE} readOnly={true} />
          </div>
        </div>
      </div>

      {/* Features section with increased spacing */}
      <div
        className={`mb-24 grid grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {[
          {
            title: "최신 문법 지원",
            description: "ES6+의 최신 JavaScript 문법을 사용할 수 있습니다.",
          },
          {
            title: "크로스 브라우징",
            description: "모든 브라우저에서 동작하는 코드로 변환됩니다.",
          },
          {
            title: "플러그인 시스템",
            description: "다양한 변환 규칙을 플러그인으로 제공합니다.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA section with adjusted spacing */}
      <div
        className={`mt-16 text-center transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-gray-600 mb-6">
          Ready to transform your JavaScript?
        </p>
        <a
          href="/playground"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-md"
        >
          Open Playground
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    </div>
  );
}
