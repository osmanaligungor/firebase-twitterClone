import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import ForgotPassword from "./forgotPassword";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

const Form = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }, { resetForm }) => {
      if (isSignUp) {
        // yeni hesap oluştur
        createUserWithEmailAndPassword(auth, email, password)
          .then((res) => {
            // doğrulama epostası gönder
            sendEmailVerification(res.user);

            toast.info(
              "Mailinize doğrulama e-postası gönderildi lütfen mailinizi doğrulayın ve giriş yapın"
            );

            setIsSignUp(false);
            resetForm();
          })
          .catch((err) => toast.error("Hata" + err.code));
      } else {
        // varolan hesaba giriş yap
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            toast.success("Hesabınıza giriş yapıldı");
            navigate("/feed");
          })
          .catch((err) => toast.error("Hata" + err.code));
      }
    },
  });

  return (
    <>
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="input"
          onChange={formik.handleChange}
          value={formik.values.email}
          autoFocus
        />

        <label className="mt-5">Şifre</label>

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            className="input w-full"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button
            type="button"
            className="absolute end-2 top-3 text-black text-2xl cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <BiShow /> : <BiHide />}
          </button>
        </div>
        {!isSignUp ? <ForgotPassword /> : <div className="h-[28px] w-1" />}

        <button
          type="submit"
          className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300 cursor-pointer"
        >
          {isSignUp ? "Kaydol" : "Giriş Yap"}
        </button>

        <p className="mt-5">
          <span className="text-gray-500">
            {isSignUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
          </span>
          <span
            className="cursor-pointer ms-2 text-blue-500 hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Giriş yapın" : "Kaydolun"}
          </span>
        </p>
      </form>
    </>
  );
};

export default Form;
