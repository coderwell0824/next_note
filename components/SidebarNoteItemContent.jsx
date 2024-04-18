"use client";

import { useState, useRef, useEffect, useTransition, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

//客户端组件不能使用async
export default function NoteItemContent({
  id,
  title,
  children,
  expendedChildren,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const selectedId = pathname.split("/")[1] || null;

  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = id === selectedId;

  const itemRef = useRef(null);
  const prevTitleRef = useRef(title);

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current.classList.add("flash");
    }
  }, [title]);

  const handleOpenBtn = () => {
    const sidebarToggleEl = document.getElementById("sidebar-toggle");
    if (sidebarToggleEl) {
      sidebarToggleEl.checked = true;
    }
    router.push(`/note/${id}`);
  };

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => itemRef.current.classList.remove("flash")}
      className={["sidebar-note-list-item", isExpanded && "note-expanded"].join(
        " "
      )}
    >
      {children}
      <button
        className="sidebar-note-open"
        style={{
          background: isPending
            ? "var(--gray-80)"
            : isActive
            ? "var(--tertiary-blue)"
            : "",
          border: isActive
            ? "1px solid var(--primary-border)"
            : "1px solid transparent",
        }}
        onClick={handleOpenBtn}
      >
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <img
            src="/chevron-down.svg"
            alt="Collapse"
            width="10px"
            height="10px"
          />
        ) : (
          <img src="/chevron-up.svg" alt="Expand" width="10px" height="10px" />
        )}
      </button>
      {isExpanded && expendedChildren}
    </div>
  );
}
