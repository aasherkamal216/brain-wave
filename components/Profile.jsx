import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="red_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>

      {/* Fixed Black Back Button */}
      <button
        onClick={handleGoHome}
        className="black_back_btn"
      >
        <span>◁◁</span>
      </button>
    </section>
  );
};

export default Profile;
