import React from "react";
import { useColors, Fonts, FontSize } from "@common";
import { AiOutlineUser, AiOutlineLock, AiOutlineCheck } from "react-icons/ai";
import { TextInput, Select, Button } from "@components";

export default ({
  handleOnChangeRoles,
  isLoading,
  email,
  error,
  handleChangeUsername,
  password,
  Roles,
  role,
  handleAddNewUser,
  isUpdate,
  handlePassword
}) => {
  const Colors = useColors();

  return (
    <div className="user__form">
      <TextInput
        isRequired
        disabled={isLoading}
        label="Nom d'utilisateur | Email"
        IconName={AiOutlineUser}
        value={email}
        handleChangeValue={(e) => handleChangeUsername(e)}
        style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
        error={error.feild === "username" && error.error}
        removeBase
        useGray
      />
      {!isUpdate && (
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
          useGray
        />
      )}
      <Select
        label={"Role"}
        data={Roles}
        style={{
          width: "100%",
          marginTop: 1,
        }}
        isMultible={true}
        value={role}
        handleOnChange={handleOnChangeRoles}
      />
      {!isUpdate && (
        <Button
          btnText={isUpdate ? "Mettre à jour" : "Ajout"}
          IconName={AiOutlineCheck}
          handlePressed={handleAddNewUser}
          isLoading={isLoading}
          style={{
            color: Colors.blackText,
            backgroundColor: Colors.primary,
            borderRadius: 12,
            padding: "15px 26px",
            fontFamily: Fonts().primaryRegular,
            fontSize: FontSize().smallText,
            marginTop: "22px",
            width: "100%",
          }}
        />
      )}
    </div>
  );
};
