import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { DEFAULT_CODE } from "../constants/transform-process-page-default-code";
import ParsingStep from "../components/layout/steps/ParsingStep";
import TransformationStep from "../components/layout/steps/TransformationStep";
import GenerationStep from "../components/layout/steps/GenerationStep";
import ResultStep from "../components/layout/steps/ResultStep";
import { processBabelSteps } from "../utils/babelProcessor";

export default function TransformationProcessPage() {
  const [babelProcess, setBabelProcess] = useState(() =>
    processBabelSteps(DEFAULT_CODE)
  );
  const [selectedTab, setSelectedTab] = useState("parsing");

  const handleCodeChange = (newCode) => {
    setBabelProcess(processBabelSteps(newCode));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-down">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Babel Transformation Process
        </h1>
        <p className="text-gray-600">
          Babel이 코드를 변환하는 과정을 단계별로 확인해보세요
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-up">
        <Tabs
          aria-label="Babel process steps"
          classNames={{
            base: "flex flex-col items-center w-full",
            tabList:
              "relative w-full max-w-2xl mx-auto rounded-xl p-2 border border-gray-200 bg-gray-50 mb-4",
            cursor: "bg-white shadow-md rounded-lg transition-all duration-200",
            tab: "flex-1 h-12 text-center data-[selected=true]:text-indigo-600 transition-all duration-200 focus:outline-none",
            tabContent:
              "text-sm font-medium group-data-[selected=true]:text-indigo-600",
            panel: "w-full pt-6",
          }}
          variant="solid"
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
        >
          {[
            {
              key: "parsing",
              title: "Parsing",
              component: (
                <div className="tab-enter-active">
                  <ParsingStep
                    {...babelProcess.parsing}
                    onCodeChange={handleCodeChange}
                  />
                </div>
              ),
            },
            {
              key: "transformation",
              title: "Transformation",
              component: (
                <div className="tab-enter-active">
                  <TransformationStep
                    steps={babelProcess.transformation?.steps || []}
                  />
                </div>
              ),
            },
            {
              key: "generation",
              title: "Generation",
              component: (
                <div className="tab-enter-active">
                  <GenerationStep {...babelProcess.generation} />
                </div>
              ),
            },
            {
              key: "result",
              title: "Result",
              component: (
                <div className="tab-enter-active">
                  <ResultStep {...babelProcess.result} />
                </div>
              ),
            },
          ].map((tab, index) => (
            <Tab
              key={tab.key}
              title={
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-semibold">{index + 1}.</span>
                  <span>{tab.title}</span>
                </div>
              }
            >
              {tab.component}
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
