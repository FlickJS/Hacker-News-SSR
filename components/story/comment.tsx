import { CommentType } from "@/types/types";
import { sanitizeHtml } from "../../utils/sanitize-html";

interface CommentProps {
  comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => {
  const generateUniqueKey = (id: number, parentId: number | null): string => {
    return `${parentId ? `${parentId}-` : ""}${id}`;
  };

  if (!comment.text) {
    return null;
  }

  const convertUnixToDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <li className="overflow-hidden comment">
      <p className="font-semibold text-gray-800 mb-2">
        Commented by: {comment.by} - {convertUnixToDate(comment.time)}
      </p>
      <div
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(comment.text) }}
      ></div>
      {comment.kids && comment.kids.length > 0 && (
        <ul className="pl-4 border-l-2 border-gray-200">
          {comment.kids.map((kidComment: CommentType) => (
            <Comment
              key={generateUniqueKey(kidComment.id, comment.id)}
              comment={kidComment}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Comment;
