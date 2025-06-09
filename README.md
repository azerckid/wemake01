# Wemake - 제품 공유 및 리뷰 플랫폼

Wemake는 개발자, 디자이너, 제품 관리자, 창업자 등이 자신의 제품을 공유하고 리뷰를 받을 수 있는 플랫폼입니다.

![Wemake Screenshot]

## 주요 기능

- **제품 등록 및 관리**: 자신의 제품을 등록하고 관리할 수 있습니다.
- **리뷰 시스템**: 사용자들이 제품에 대한 리뷰를 작성하고 평가할 수 있습니다.
- **사용자 프로필**: 사용자별 프로필 페이지를 통해 제품과 활동을 확인할 수 있습니다.
- **카테고리 분류**: 제품을 카테고리별로 분류하여 쉽게 찾을 수 있습니다.
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 등 다양한 디바이스에서 최적화된 경험을 제공합니다.

## 기술 스택

- **프론트엔드**: React, TypeScript, Tailwind CSS, Shadcn UI
- **백엔드**: Supabase (인증, 데이터베이스, 스토리지)
- **라우팅**: React Router
- **폼 관리**: React Hook Form, Zod
- **스타일링**: Tailwind CSS

## 시스템 아키텍처

### 프론트엔드 아키텍처

- **컴포넌트 구조**: 기능별로 모듈화된 컴포넌트 구조
- **상태 관리**: React의 Context API와 커스텀 훅을 활용한 상태 관리
- **라우팅**: React Router를 사용한 클라이언트 사이드 라우팅
- **데이터 페칭**: React Router의 loader와 action 함수를 활용한 데이터 로딩 및 변경
- **폼 처리**: React Hook Form과 Zod를 활용한 폼 유효성 검사

### 백엔드 아키텍처 (Supabase)

- **인증 시스템**: Supabase Auth를 활용한 이메일/소셜 로그인
- **데이터베이스**: PostgreSQL 기반의 관계형 데이터베이스
- **스토리지**: 이미지 및 파일 저장을 위한 Supabase Storage
- **실시간 기능**: Supabase Realtime을 활용한 실시간 업데이트

### 데이터 모델

- **사용자(Users)**: 기본 인증 정보
- **프로필(Profiles)**: 사용자 프로필 정보 (이름, 역할, 소개 등)
- **제품(Products)**: 사용자가 등록한 제품 정보
- **카테고리(Categories)**: 제품 분류를 위한 카테고리
- **리뷰(Reviews)**: 제품에 대한 사용자 리뷰
- **팔로우(Follows)**: 사용자 간 팔로우 관계

### 인증 시스템

- **이메일/비밀번호 인증**: 기본적인 이메일 로그인
- **소셜 로그인**: Google, GitHub 등 소셜 계정 연동
- **세션 관리**: JWT 기반의 세션 관리
- **권한 관리**: 역할 기반 접근 제어 (RBAC)

### API 구조

- **RESTful API**: Supabase를 통한 RESTful API 접근
- **데이터 접근**: Row Level Security(RLS)를 통한 데이터 접근 제어
- **함수 호출**: Supabase Functions를 활용한 서버리스 함수 실행

## 시작하기

### 필수 조건

- Node.js (v16 이상)
- npm 또는 yarn
- Supabase 계정

### 설치

1. 저장소 클론
   ```bash
   git clone https://github.com/yourusername/wemake.git
   cd wemake
   ```

2. 의존성 설치
   ```bash
   npm install
   # 또는
   yarn install
   ```

3. 환경 변수 설정
   `.env.example` 파일을 `.env`로 복사하고 Supabase 프로젝트 정보를 입력합니다.
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. 개발 서버 실행
   ```bash
   npm run dev
   # 또는
   yarn dev
   ```

5. 브라우저에서 확인
   `http://localhost:5173`에서 애플리케이션을 확인할 수 있습니다.

## 프로젝트 구조

```
wemake/
├── app/                    # 애플리케이션 코드
│   ├── common/             # 공통 컴포넌트 및 유틸리티
│   │   ├── components/     # 재사용 가능한 UI 컴포넌트
│   │   └── hooks/          # 커스텀 훅
│   ├── features/           # 기능별 모듈
│   │   ├── auth/           # 인증 관련 기능
│   │   │   ├── components/ # 인증 관련 컴포넌트
│   │   │   ├── mutations.ts # 인증 관련 데이터 변경 함수
│   │   │   └── queries.ts  # 인증 관련 데이터 조회 함수
│   │   ├── products/       # 제품 관련 기능
│   │   │   ├── components/ # 제품 관련 컴포넌트
│   │   │   ├── mutations.ts # 제품 관련 데이터 변경 함수
│   │   │   └── queries.ts  # 제품 관련 데이터 조회 함수
│   │   └── users/          # 사용자 관련 기능
│   │       ├── components/ # 사용자 관련 컴포넌트
│   │       ├── mutations.ts # 사용자 관련 데이터 변경 함수
│   │       └── queries.ts  # 사용자 관련 데이터 조회 함수
│   └── routes/             # 라우트 정의
├── public/                 # 정적 파일
└── supabase/               # Supabase 관련 설정
    ├── migrations/         # 데이터베이스 마이그레이션
    └── seed.sql            # 초기 데이터 시드
```

## 주요 페이지

- **홈**: 추천 제품 및 카테고리 목록
- **제품 상세**: 제품 정보 및 리뷰
- **제품 등록**: 새 제품 등록 폼
- **프로필**: 사용자 프로필 및 제품 목록
- **설정**: 사용자 정보 및 계정 설정

## 개발 가이드

### 코드 스타일

- **TypeScript**: 모든 코드는 TypeScript로 작성
- **함수형 컴포넌트**: 클래스 대신 함수형 컴포넌트 사용
- **명명 규칙**: 
  - 컴포넌트: PascalCase (예: `ProductCard`)
  - 함수/변수: camelCase (예: `getUserProfile`)
  - 상수: UPPER_SNAKE_CASE (예: `MAX_FILE_SIZE`)
- **파일 구조**: 각 기능별로 모듈화된 구조 유지

### 데이터 흐름

1. **데이터 로딩**: React Router의 `loader` 함수를 통해 데이터 로드
2. **데이터 표시**: 컴포넌트에서 `loaderData`를 통해 데이터 표시
3. **데이터 변경**: React Router의 `action` 함수를 통해 데이터 변경
4. **상태 업데이트**: 변경 후 페이지 리로드 또는 리다이렉트

### 인증 흐름

1. **로그인**: 이메일/비밀번호 또는 소셜 로그인
2. **세션 관리**: Supabase Auth를 통한 세션 관리
3. **권한 확인**: `getLoggedInUserId` 함수를 통한 인증 상태 확인
4. **보호된 라우트**: 인증된 사용자만 접근 가능한 라우트 보호

## 기여하기

1. 이 저장소를 포크합니다.
2. 새 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`).
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`).
5. Pull Request를 생성합니다.

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 연락처

프로젝트 관리자 - [@yourusername](https://twitter.com/yourusername)

프로젝트 링크: [https://github.com/yourusername/wemake](https://github.com/yourusername/wemake)
