import moment from "moment";
import { MdEdit } from "react-icons/md";

const UserInfo = ({ tweet }) => {
  // kullanıcı ismi oluştur
  const userName = tweet.user.name.toLowerCase().replaceAll(" ", "_");

  // tarihi nesne(object) veri formatına çevirdik
  let date = tweet.createdAt?.toDate();

  // moment kütüphanesi ile gönderi tarihinin şuanın tarihinden uzaklığını hesapla
  date = moment(date).fromNow(true);

  return (
    <div className="flex gap-2 items-center whitespace-nowrap text-gray-400">
      <p className="text-secondaryWhite font-semibold">{tweet.user.name}</p>
      <p className="text-sm">@{userName}</p>
      <p className="text-sm">{date}</p>

      {tweet.isEdited && (
        <p>
          <MdEdit className="md:hidden" />
          <span className=" max-md:hidden text-xs">* düzenlendi</span>
        </p>
      )}
    </div>
  );
};

export default UserInfo;
