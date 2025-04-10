import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import uploadToStorage from "../../firebase/uploadToStorage";
import Loader from "../loader";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(null);

  const fileInputRef = useRef();

  // yeni resim seçildiğinde seçen önizlemesini göstermek için local URL'e çevir ve state'e aktar.
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  // çarpıya basıldığında hem ekrandaki resmi kaldır hem de inputu temizle
  const clearImage = () => {
    setImage(null);
    fileInputRef.current.value = null;
    fileInputRef.current.files = null;
  };

  // * form gönderildiğinde

  const handleSubmit = async (e) => {
    e.preventDefault();

    // inputlardaki verilere eriş
    const text = e.target.text.value.trim();
    const file = e.target.image.files[0];

    // yazı ve resim içeriği yoksa hata gönder
    if (!text && !file)
      return toast.warning("Lütfen gönderi içeriğini belirleyiniz");

    try {
      // yüklenme başlayınca isLoading'i güncelle
      setIsLoading(true);

      // resmi firebase storage'a yükle
      const imageUrl = await uploadToStorage(file);

      // kolleksiyonun referansını al
      const tweetsCol = collection(db, "tweets");
      // kolleksiyona yeni tweet belgesi oluştur
      await addDoc(tweetsCol, {
        content: {
          text,
          image: imageUrl,
        },
        isEdited: false,
        likes: [],
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
        createdAt: serverTimestamp(),
      });

      // inputları temizle
      e.target.reset();
      setImage(null);
    } catch (error) {
      console.log(error);
    }

    // yüklenme bittiğinde isLoading'i güncelle
    setIsLoading(false);
  };

  return (
    <div className="border-b border-fourthGray p-4 flex gap-3">
      <img
        src={user?.photoURL}
        alt="user-photo"
        className="size-[35px] md:size-[45px] rounded-full "
      />
      <form className="w-full pt-[6px]" onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="text"
          className="w-full bg-transparent mb-2 md:text-lg text-gray-300 outline-none resize-y min-h-[50px] max-h-[260px]"
          placeholder="Neler Oluyor?"
        />

        {image && (
          <div className="relative mb-2">
            <button
              type="button"
              className="absolute top-3 end-3 p-3 bg-primaryBlack/90 rounded-xl transition hover:bg-zinc-800"
              onClick={clearImage}
            >
              <IoMdClose />
            </button>
            <img src={image} alt="image" />
          </div>
        )}

        <div className="flex justify-between">
          <div className="text-thirdBlue text-xl flex gap-4">
            <label className="form-icon" htmlFor="image">
              <input
                id="image"
                name="image"
                type="file"
                className="hidden"
                onChange={onImageChange}
                ref={fileInputRef}
              />
              <CiImageOn />
            </label>

            <button className="form-icon" type="button">
              <MdOutlineGifBox />
            </button>

            <button className="form-icon" type="button">
              <FaRegSmile className="text-lg" />
            </button>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-secondaryWhite font-bold px-5 py-[6px] rounded-full text-primaryBlack tracking-wide hover:brightness-90 transition min-w-[100px]"
          >
            {isLoading ? <Loader /> : "Gönder"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Form);
