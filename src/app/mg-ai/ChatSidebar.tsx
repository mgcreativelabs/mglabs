"use client";
// ============================================================
// src/app/mg-ai/ChatSidebar.tsx
// Conversation history sidebar for MG Labs AI — list, search,
// pin, rename, delete. Reads from useChatHistory (Supabase),
// which already handles anonymous session_id vs signed-in
// user_id under the hood.
// ============================================================
import React, { useMemo, useState } from "react";
import {
  Plus, Search, Pin, PinOff, Pencil, Trash2, Check, X, PanelLeftClose, PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatRelativeDate } from "@/lib/utils/format";
import { Skeleton } from "@/components/ui/Skeleton";
import type { StoredConversation } from "@/lib/hooks/useChatHistory";

interface ChatSidebarProps {
  conversations: StoredConversation[];
  loading: boolean;
  activeId: string | null;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onRename: (id: string, title: string) => void;
  onTogglePinned: (id: string, pinned: boolean) => void;
  onDelete: (id: string) => void;
}

export function ChatSidebar({
  conversations,
  loading,
  activeId,
  collapsed,
  onToggleCollapsed,
  onSelect,
  onNewChat,
  onRename,
  onTogglePinned,
  onDelete,
}: ChatSidebarProps) {
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return conversations;
    const q = query.trim().toLowerCase();
    return conversations.filter((c) => c.title.toLowerCase().includes(q));
  }, [conversations, query]);

  const pinned = filtered.filter((c) => c.pinned);
  const recent = filtered.filter((c) => !c.pinned);

  const startEditing = (c: StoredConversation) => {
    setEditingId(c.id);
    setEditValue(c.title);
  };

  const commitEdit = () => {
    if (editingId && editValue.trim()) {
      onRename(editingId, editValue.trim());
    }
    setEditingId(null);
  };

  if (collapsed) {
    return (
      <div className="hidden sm:flex flex-col items-center w-14 border-r border-white/[0.06] bg-surface/50 py-4 gap-3">
        <button
          onClick={onToggleCollapsed}
          title="Expand sidebar"
          className="h-9 w-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-surface-2 transition-colors"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
        <button
          onClick={onNewChat}
          title="New chat"
          className="h-9 w-9 rounded-lg flex items-center justify-center bg-brand-blue/20 border border-brand-blue/40 text-brand-blue hover:bg-brand-blue/30 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex flex-col w-64 flex-shrink-0 border-r border-white/[0.06] bg-surface/50">
      <div className="flex items-center gap-2 px-3 pt-4 pb-2">
        <button
          onClick={onNewChat}
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-1 border border-white/[0.08] hover:border-brand-blue/40 text-sm text-white transition-colors"
        >
          <Plus className="h-3.5 w-3.5 text-brand-blue" />
          New chat
        </button>
        <button
          onClick={onToggleCollapsed}
          title="Collapse sidebar"
          className="h-9 w-9 flex-shrink-0 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-surface-2 transition-colors"
        >
          <PanelLeftClose className="h-4 w-4" />
        </button>
      </div>

      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="h-3.5 w-3.5 text-gray-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats"
            className="w-full bg-surface-1 border border-white/[0.06] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-600 outline-none focus:border-brand-blue/40"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-4">
        {loading ? (
          <div className="space-y-2 px-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full" />
            ))}
          </div>
        ) : (
          <>
            {pinned.length > 0 && (
              <ChatGroup
                label="Pinned"
                items={pinned}
                activeId={activeId}
                editingId={editingId}
                editValue={editValue}
                confirmDeleteId={confirmDeleteId}
                onSelect={onSelect}
                onStartEdit={startEditing}
                onEditChange={setEditValue}
                onCommitEdit={commitEdit}
                onCancelEdit={() => setEditingId(null)}
                onTogglePinned={onTogglePinned}
                onRequestDelete={setConfirmDeleteId}
                onConfirmDelete={(id) => {
                  onDelete(id);
                  setConfirmDeleteId(null);
                }}
                onCancelDelete={() => setConfirmDeleteId(null)}
              />
            )}
            {recent.length > 0 && (
              <ChatGroup
                label="Recent"
                items={recent}
                activeId={activeId}
                editingId={editingId}
                editValue={editValue}
                confirmDeleteId={confirmDeleteId}
                onSelect={onSelect}
                onStartEdit={startEditing}
                onEditChange={setEditValue}
                onCommitEdit={commitEdit}
                onCancelEdit={() => setEditingId(null)}
                onTogglePinned={onTogglePinned}
                onRequestDelete={setConfirmDeleteId}
                onConfirmDelete={(id) => {
                  onDelete(id);
                  setConfirmDeleteId(null);
                }}
                onCancelDelete={() => setConfirmDeleteId(null)}
              />
            )}
            {filtered.length === 0 && (
              <p className="text-xs text-gray-600 px-2 pt-2">
                {query ? "No chats match your search." : "No chats yet — start one above."}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface ChatGroupProps {
  label: string;
  items: StoredConversation[];
  activeId: string | null;
  editingId: string | null;
  editValue: string;
  confirmDeleteId: string | null;
  onSelect: (id: string) => void;
  onStartEdit: (c: StoredConversation) => void;
  onEditChange: (v: string) => void;
  onCommitEdit: () => void;
  onCancelEdit: () => void;
  onTogglePinned: (id: string, pinned: boolean) => void;
  onRequestDelete: (id: string) => void;
  onConfirmDelete: (id: string) => void;
  onCancelDelete: () => void;
}

function ChatGroup({
  label,
  items,
  activeId,
  editingId,
  editValue,
  confirmDeleteId,
  onSelect,
  onStartEdit,
  onEditChange,
  onCommitEdit,
  onCancelEdit,
  onTogglePinned,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
}: ChatGroupProps) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-600 px-2 mb-1">
        {label}
      </p>
      <div className="space-y-0.5">
        {items.map((c) => {
          const isActive = c.id === activeId;
          const isEditing = c.id === editingId;
          const isConfirmingDelete = c.id === confirmDeleteId;

          return (
            <div
              key={c.id}
              className={cn(
                "group relative rounded-lg px-2 py-2 cursor-pointer transition-colors",
                isActive ? "bg-surface-2" : "hover:bg-surface-1"
              )}
              onClick={() => !isEditing && !isConfirmingDelete && onSelect(c.id)}
            >
              {isEditing ? (
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => onEditChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onCommitEdit();
                      if (e.key === "Escape") onCancelEdit();
                    }}
                    className="flex-1 min-w-0 bg-surface-3 border border-brand-blue/40 rounded-md px-2 py-1 text-xs text-white outline-none"
                  />
                  <button onClick={onCommitEdit} className="p-1 text-green-400 hover:text-green-300 flex-shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={onCancelEdit} className="p-1 text-gray-500 hover:text-gray-300 flex-shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : isConfirmingDelete ? (
                <div className="flex items-center justify-between gap-1" onClick={(e) => e.stopPropagation()}>
                  <span className="text-xs text-red-300 truncate">Delete this chat?</span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => onConfirmDelete(c.id)}
                      className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] hover:bg-red-500/30"
                    >
                      Delete
                    </button>
                    <button
                      onClick={onCancelDelete}
                      className="px-1.5 py-0.5 rounded bg-surface-3 text-gray-400 text-[10px] hover:text-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs truncate", isActive ? "text-white" : "text-gray-300")}>
                      {c.title}
                    </p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{formatRelativeDate(c.updatedAt)}</p>
                  </div>
                  <div
                    className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onTogglePinned(c.id, !c.pinned)}
                      title={c.pinned ? "Unpin" : "Pin"}
                      className="p-1 rounded text-gray-500 hover:text-brand-purple hover:bg-surface-3"
                    >
                      {c.pinned ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
                    </button>
                    <button
                      onClick={() => onStartEdit(c)}
                      title="Rename"
                      className="p-1 rounded text-gray-500 hover:text-white hover:bg-surface-3"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => onRequestDelete(c.id)}
                      title="Delete"
                      className="p-1 rounded text-gray-500 hover:text-red-400 hover:bg-surface-3"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
