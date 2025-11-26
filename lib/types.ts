/**
 * HisLight 데이터 타입 정의
 * JSON 데이터 구조에 대한 TypeScript 인터페이스
 */

/**
 * Category - 대분류 (주거, 생활)
 */
export interface Category {
  /** 고유 ID (예: "housing", "life") */
  id: string
  /** 화면 표시명 (예: "주거", "생활") */
  name: string
  /** 카테고리 설명 */
  description: string
}

/**
 * Subcategory - 중분류 (청약·분양, 복지·지원 등)
 */
export interface Subcategory {
  /** 고유 ID (예: "housing-finance") */
  id: string
  /** 연결된 대분류 ID (예: "housing") */
  categoryId: string
  /** 화면 표시명 (예: "금융지원") */
  name: string
  /** 중분류 설명 */
  description: string
}

/**
 * Resource - 개별 리소스 (실제 링크 및 정보)
 */
export interface Resource {
  /** 고유 ID (예: "res-001") */
  id: string
  /** 연결된 중분류 ID (예: "housing-finance") */
  subcategoryId: string
  /** 리소스 제목 (20자 이내) */
  title: string
  /** 리소스 상세 설명 (100자 내외, 2-3문장) */
  description: string
  /** 외부 링크 URL */
  url: string
}
