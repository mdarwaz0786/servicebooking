import { formatDate } from "../../helper/formatDate";
import defaultAvatar from "../../assets/avatar.png";

const CommentList = ({ comments }) => {
  if (!comments || comments?.length === 0) return <p>No comments yet.</p>;

  return (
    <ul className="list-unstyled">
      {comments?.map((comment) => {
        const profileImage = comment?.user?.profileImage
          ? `${import.meta.env.VITE_API_SERVER_BASE_URL}${comment?.user?.profileImage}`
          : defaultAvatar;

        {/* const profileImage = defaultAvatar; */ }

        return (
          <li key={comment._id} className="d-flex mb-4 border-bottom pb-3">
            {/* Profile Image */}
            <div className="me-3" style={{ flexShrink: 0 }}>
              <img
                src={profileImage}
                alt="user"
                className="rounded-circle"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  minWidth: "60px"
                }}
              />
            </div>

            {/* Comment Content */}
            <div className="flex-grow-1">
              {/* Name and Date/Time */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>{comment?.name || comment?.user?.name || "Anonymous"}</strong>
                <span className="text-muted">
                  {formatDate(comment?.createdAt)}
                  {comment?.time ? `, ${comment?.time}` : ""}
                </span>
              </div>
              {/* Comment Text */}
              <p className="mb-0">{comment?.comment}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;