import UserInfo from "./userInfo";
import Buttons from "./buttons";
import Dropdown from "./dropdown";
import Content from "./content";

const Post = ({ tweet }) => {
  return (
    <div className="border-b border-fourthGray p-4 flex gap-2">
      <img
        src={tweet.user.photo}
        alt="profile"
        className="size-12 rounded-full"
      />
      <div className="w-full">
        <div className="flex justify-between">
          <UserInfo tweet={tweet} />

          <Dropdown tweet={tweet} />
        </div>

        <Content data={tweet.content} />

        <Buttons tweet={tweet} />
      </div>
    </div>
  );
};

export default Post;
