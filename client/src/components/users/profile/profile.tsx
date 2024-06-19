import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputWrapper from "../../utilities/formElements/InputWrapper";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import "./profile.css";
import CommonButton from "../../utilities/formElements/commonButton";
import { ToastContainer } from "react-toastify";
import avatar from "../../../assets/image/avatar.jpg";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../utilities/commonTostify";
import { updateUser } from "../../../services/user";
import { updateProfileAction } from "../../../state_management/actions/AuthActions";
import Loading from "../../loader/Loader";

export default function Profile() {
  const [isButtonDisabled1, setButtonDisabled1] = useState<boolean>(false);
  const [btnLoading,setBtnLoading]=useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [update, setUpdate] = useState(false);
  const [change, setChange] = useState(false);
  const fileref = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>();
  const [previewImage, setPreviewImage] = useState<string>();
  const dispatch = useDispatch();
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
    setBtnLoading(true)
    setButtonDisabled1(true);
    if (!image) {
      data.image = userDetails.image;
    } else {
      data.image = previewImage;
    }
    const res = await updateUser(data);
    if (res?.success) {
      const { _id, image, name, email, phone } = res.data;
      dispatch(updateProfileAction({ _id, image, name, email, phone }));
      toastMessageSuccess(res.message);
    } else {
      toastMessageError(res.message);
    }
    setBtnLoading(false)
    setButtonDisabled1(false);
  };

  const editProfile = async () => {
    setLoading(true);
    Object.entries(userDetails).forEach(([key, value]) => {
      setValue(key, value);
      setValue("oldPassword", "");
      setValue("password", "");
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files?.[0]?.size / 1024 / 1024 < 5.006307601928711) {
      const Extension = files[0]?.type?.split("/")[1];
      if (Extension === "jpeg" || Extension === "jpg" || Extension === "png") {
        setPreviewImage(URL.createObjectURL(files[0]));
        setImage(files[0]);
      } else {
        toastMessageError("Invalid image format");
      }
    } else {
      toastMessageError("Invalid size format");
    }
  };

  useEffect(() => {
    editProfile();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="profile-form">
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <div className="img-avatar">
              <input
                name="image"
                type="file"
                accept="image/png, image/jpeg"
                ref={fileref}
                hidden
                onChange={(e) => {
                  onImageChange(e);
                  setUpdate(true);
                }}
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
                <CommonButton
                  className="submit-btn"
                  label="Update"
                  type="submit"
                  disabled={isButtonDisabled1}
                  loading={btnLoading}
                />
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
      ) : (
        <Loading />
      )}
      <ToastContainer />
    </>
  );
}
