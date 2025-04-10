import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from ".";
import { v4 } from "uuid";

// bu fonksiyon parametre olarak dosyayı alıp eğerki türü resimse firebase storage'a yükleyecek ardından url'ini return edecek.

const uploadToStorage = async (file) => {
  // 1) dosya resim değilse veya dosya yoksa fonksiyonu durdur
  if (!file || !file.type.startsWith("image")) return null;

  // 2) maksimum dosya boyutunu belirle
  if (file.size > 2097152) {
    toast.error("Lütfen 2mb altında medya yükleyin");
    throw new Error("Resim 2mb üstü");
  }

  // 3) dosyanın yükleneceği konumun referansını al
  const imageRef = ref(storage, v4() + file.name);

  // 4) referansını oluşturduğumuz konuma dosyayı yükle
  await uploadBytes(imageRef, file);

  // 5) storage'a yüklenen dosyanın url'ini al ve return et
  const url = await getDownloadURL(imageRef);

  return url;
};

export default uploadToStorage;
