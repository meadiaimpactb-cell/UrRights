/**
 * سحب وإفلات لإعادة الترتيب — بـ HTML5 drag and drop بلا أي مكتبة خارجية.
 * يعطي كل صف الخصائص اللازمة، ويُبلّغ onDrop بالترتيب الجديد كاملًا.
 */
import { useState, type DragEvent } from "react";

export function useDragOrder<T extends { id: number | string }>(
  items: T[],
  onReorder: (orderedIds: (number | string)[]) => void,
) {
  const [dragId, setDragId] = useState<number | string | null>(null);
  const [overId, setOverId] = useState<number | string | null>(null);

  const reset = () => {
    setDragId(null);
    setOverId(null);
  };

  function rowProps(item: T) {
    return {
      draggable: true,
      onDragStart: (e: DragEvent) => {
        setDragId(item.id);
        e.dataTransfer.effectAllowed = "move";
        // فايرفوكس يحتاج بيانات فعلية حتى يبدأ السحب
        e.dataTransfer.setData("text/plain", String(item.id));
      },
      onDragOver: (e: DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if (item.id !== overId) setOverId(item.id);
      },
      onDragLeave: () => {
        if (item.id === overId) setOverId(null);
      },
      onDrop: (e: DragEvent) => {
        e.preventDefault();
        if (dragId == null || dragId === item.id) return reset();
        const ids = items.map((x) => x.id);
        const from = ids.indexOf(dragId);
        const to = ids.indexOf(item.id);
        if (from < 0 || to < 0) return reset();
        const next = [...ids];
        next.splice(from, 1);
        next.splice(to, 0, dragId);
        reset();
        onReorder(next);
      },
      onDragEnd: reset,
    };
  }

  /** أصناف بصرية تُظهر الصف المسحوب وموضع الإفلات. */
  function rowClass(item: T) {
    if (item.id === dragId) return "opacity-40";
    if (item.id === overId) return "ring-2 ring-[#2fa3c4] ring-offset-2";
    return "";
  }

  return { rowProps, rowClass, dragging: dragId != null };
}
