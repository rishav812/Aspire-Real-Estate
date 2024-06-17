import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputWrapper from "../../utilities/formElements/InputWrapper";
import { RootStateOrAny, useSelector } from "react-redux";
import "./profile.css";
import CommonButton from "../../utilities/formElements/commonButton";
import avatar from "../../../assets/image/avatar.jpg";

export default function Profile() {
  const [userData, setUserData] = useState<any>();
  const [update, setUpdate] = useState(false);
  const [change, setChange] = useState(false);
  const fileref = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState({});
  const [previewImage, setPreviewImage] = useState<string>();
  const userDetails = useSelector(
    (state: RootStateOrAny) => state.AuthReducer.authData
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  // resolver: yupResolver(userSignupValidationSchema),

  const onSubmit = async (data: any) => {
    console.log("data==========", data);
  };

  const editProfile = async () => {
    Object.entries(userDetails).forEach(([key, value]) => {
      setValue(key, value);
      setValue("oldPassword", "");
      setValue("password", "");
    });
  };

  const onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    console.log("fileeeeee====", files);
    if (files && files?.[0]?.size / 1024 / 1024 < 5.006307601928711) {
      const Extension = files[0]?.type?.split("/")[1];
      if (Extension === "jpeg" || Extension === "jpg" || Extension === "png") {
        setPreviewImage(URL.createObjectURL(files[0]));
        setImage(files[0]);
      }
    }
  };

  useEffect(() => {
    editProfile();
  }, []);

  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="img-avatar">
          <input
            name="image"
            type="file"
            accept="image/png, image/jpeg"
            ref={fileref}
            hidden
            onChange={(e) => onImageChange(e)}
          />
          <img
            onClick={() => fileref.current?.click()}
            src={previewImage ? previewImage : avatar}
            alt="avatar"
            className="img-user"
          />
        </div>
        <h2 className="form-title text-center">Profile</h2>
        <div className="form-grid">
          <div className="grid-item">
            <InputWrapper
              placeholder="Enter Your Name"
              type="text"
              importantLabel={true}
              align="right"
              control={control}
              name="name"
              className="form-input"
              onChange={() => setUpdate(true)}
            />
            {errors && errors?.name && (
              <p className="text text-danger">
                <>{errors?.name?.message}</>
              </p>
            )}
          </div>
          <div className="grid-item">
            <InputWrapper
              type="email"
              importantLabel={true}
              readOnly
              disabled={true}
              align="right"
              control={control}
              name="email"
              className="form-input"
            />
            {errors && errors?.email && (
              <p className="text text-danger">
                <>{errors?.email?.message}</>
              </p>
            )}
          </div>
          {change && (
            <>
              <div className="grid-item">
                <InputWrapper
                  placeholder="Enter old password"
                  type="password"
                  importantLabel={true}
                  align="right"
                  control={control}
                  name="oldPassword"
                  className="form-input"
                  onChange={() => setUpdate(true)}
                />
                {errors && errors?.oldPassword && (
                  <p className="text text-danger">
                    <>{errors?.oldPassword?.message}</>
                  </p>
                )}
              </div>
              <div className="grid-item">
                <InputWrapper
                  placeholder="Enter new password"
                  type="password"
                  importantLabel={true}
                  align="right"
                  control={control}
                  name="password"
                  className="form-input"
                  onChange={() => setUpdate(true)}
                />
                {errors && errors?.password && (
                  <p className="text text-danger">
                    <>{errors?.password?.message}</>
                  </p>
                )}
              </div>
            </>
          )}
          <div className="grid-item">
            <InputWrapper
              placeholder="Enter Phone number"
              type="number"
              importantLabel={true}
              align="right"
              control={control}
              name="phone"
              className="form-input"
              onChange={() => setUpdate(true)}
            />
            {errors && errors?.phone && (
              <p className="text text-danger">
                <>{errors?.phone?.message}</>
              </p>
            )}
          </div>
        </div>
        <div className="button-group">
          {update && (
            <CommonButton className="submit-btn" label="Update" type="submit" />
          )}
          <CommonButton
            className="cancel-btn"
            label="Cancel"
            onClick={() => {
              setChange(false);
              setUpdate(false);
            }}
            type="button"
          />
          {!change && (
            <CommonButton
              className="change-password-btn"
              label="Change Password"
              onClick={() => setChange(true)}
            />
          )}
        </div>
      </form>
    </div>
  );
}
