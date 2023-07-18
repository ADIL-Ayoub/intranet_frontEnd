import React, { useState } from "react";
import "./index.css";
import back1 from "@images/back1.png";
import back2 from "@images/back2.png";
import procheck from "@images/logo_procheck.png";
import sagma from "@images/logo_sagma.png";
import { useColors, Fonts, FontSize, useToast } from "@common";
import { TextInput, Button } from "@components";
import { AiOutlineUser, AiOutlineLock, AiOutlineCheck } from "react-icons/ai";
import { AUTH } from "@services";
import { LOGIN, STOREID } from "@redux/account/types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default ({ }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const Colors = useColors();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState({ feild: "", error: "" });

  const handleChangeUsername = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (!email) {
      setIsError({
        feild: "username",
        error: "L'e-mail ne doit pas être vide",
      });
      return;
    } else if (!password) {
      setIsError({
        feild: "password",
        error: "Le mot de passe ne doit pas être vide",
      });
      return;
    } else {
      setIsLoading(true);
      const params = {
        username: email.trim(),
        password,
      };
      setIsError({ feild: "", error: "" });
      AUTH.Login(params)
        .then((data) => {
          setIsLoading(false);
          if (data.status === 200) {
            if (data.data.messageResponse.message === "Please change the password") {
              console.log(data.data.messageResponse.message);
              setTimeout(() => {
                dispatch({type: STOREID, payload:{id:data.data.id,Token:data.data.token}})
                navigate(`/ChangedPassword`, { state: "dashboard" });
              }, 100);
            } else {
              dispatch({ type: LOGIN, payload: data.data });
              setTimeout(() => {
                navigate("/", { state: "dashboard" });
              }, 100);
            }


          } else {
            toast("error", "E-mail ou mot de passe ne correspondant pas");
            return;
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error) {
            if (error.response && error.response.status === 404) {
              setIsError({
                isError: true,
                status: error.response.status,
                message: "Ooops!.. 404 error occured",
              });
            } else {
              setIsError({
                isError: true,
                status: error.response ? error.response.status : 404,
                message:
                  "Ooops!.. Une erreur 500 s'est produite, vous pouvez réessayer plus tard",
              });
              toast("error", "E-mail ou mot de passe ne correspondant pas");
            }
          }
        });
    }
  };

  return (
    <div className="container">
      <div className="child_container">
        <div className="background1">
          <img src={back1} alt="background" className="back1" />
        </div>
        <img src={back2} alt="background2" className="back2" />
      </div>

      <div className="auth_box">
        <div className="content_box" style={{ background: Colors.boxes }}>
          <div className="content">
            <div className="logo">
              <img src={procheck} alt="procheck" className="procheck" />
              <img src={sagma} alt="sagma" className="sagma" />
            </div>
            <div className="title__box">
              <h5 className="title">Bienvenue sur intranet ! 👋🏻</h5>
              <p className="text">
                Veuillez vous connecter à votre compte pour obtenir l'accès .
              </p>
            </div>
            <div className="form">
              <TextInput
                isRequired
                disabled={isLoading}
                label="Nom d'utilisateur"
                IconName={AiOutlineUser}
                value={email}
                handleChangeValue={(e) => handleChangeUsername(e)}
                style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
                error={error.feild === "username" && error.error}
                removeBase
              />
              <TextInput
                isRequired
                disabled={isLoading}
                label="Mot de passe"
                IconName={AiOutlineLock}
                value={password}
                handleChangeValue={(e) => handlePassword(e)}
                isPassword
                style={{ width: "100%", marginTop: 16, borderRadius: 22 }}
                error={error.feild === "password" && error.error}
                removeBase
              />
              <Button
                btnText={"Connexion"}
                IconName={AiOutlineCheck}
                handlePressed={handleLogin}
                isLoading={isLoading}
                style={{
                  color: Colors.blackText,
                  backgroundColor: Colors.primary,
                  borderRadius: 12,
                  padding: "13px 26px",
                  fontFamily: Fonts().primaryRegular,
                  fontSize: FontSize().smallText,
                  marginTop: "22px",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
