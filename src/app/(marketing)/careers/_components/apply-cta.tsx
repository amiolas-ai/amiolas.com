// 지원 CTA 영역 — 지원 채널 오픈 전까지 비활성 버튼 + 안내 문구 (외부 연결 없음)
import { Button } from "@/components/ui/button";

export function ApplyCta() {
  return (
    <div className="mt-4 border-t border-dashed border-border pt-10">
      <Button
        variant="primary"
        size="lg"
        disabled
        aria-disabled
        className="px-7"
      >
        지원 안내 준비 중
      </Button>
      <p className="m-0 mt-4 max-w-[44ch] break-keep text-body-sm text-fg-muted">
        지원 채널을 준비하고 있습니다. 오픈하면 이 페이지에서 안내드리겠습니다.
      </p>
    </div>
  );
}
