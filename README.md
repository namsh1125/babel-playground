# Babel Playground

Modern JavaScript와 JSX 코드를 실시간으로 변환해볼 수 있는 웹 기반 Babel 플레이그라운드입니다.

## 주요 기능

### 1. Babel 실시간 변환

- ES6+ 코드를 ES5로 변환
- JSX를 순수 JavaScript로 변환
- 실시간 코드 변환 결과 확인

### 2. 개발자 친화적 기능

- Monaco 에디터 내장 (VS Code와 동일한 에디터)
- 원클릭 코드 복사
- 직관적인 Before/After 뷰

### 3. 최적화된 사용자 경험

- 반응형 디자인 지원
- 다크 테마 에디터
- 직관적인 UI/UX

## 기술 스택

- React
- Babel (standalone)
- Monaco Editor
- NextUI
- TailwindCSS

## 시작하기

```bash
# 저장소 클론
git clone https://github.com/namsh1125/babel-playground.git

# 디렉토리 이동
cd babel-playground

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm start
```

## 사용 예시

다음과 같은 모던 JavaScript 코드를:

```javascript
[1, 2, 3].map((n) => n + 1);
```

아래와 같이 변환합니다:

```javascript
"use strict";

[1, 2, 3].map(function (n) {
  return n + 1;
});
```
