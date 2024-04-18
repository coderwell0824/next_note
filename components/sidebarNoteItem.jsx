import SidebarNoteItemContent from "./SidebarNoteItemContent";
import SidebarNoteItemHeader from "./SidebarNoteItemHeader";

export default async function NoteItem({ noteId, note }) {
  const { title, content = "", updateTime } = note;
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expendedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>{"No Content"}</i>}
        </p>
      }
    >
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  );
}
