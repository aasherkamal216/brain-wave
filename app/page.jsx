const PromptCard = ({ post, handleTagClick, reFetchPosts }) => {
  const handleEdit = () => {
    // Your edit logic here
    reFetchPosts(); // Trigger fetch after edit
  };

  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        reFetchPosts(); // Trigger fetch after delete
      } catch (error) {
        console.log("Error deleting prompt", error);
      }
    }
  };

  return (
    <div>

      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PromptCard;
