import React, { ChangeEvent, useEffect, useState } from "react";
import "./AddListing.css";
import InputWrapper from "../../utilities/formElements/InputWrapper";
import CommonTextArea from "../../utilities/formElements/commonTextArea/CommonTextArea";
import { useForm } from "react-hook-form";
import CommonMultiSelect from "../../utilities/formElements/CommonMultiSelect/commonMultiSelect";
import property_type from "../../../assets/json/property_type.json";
import property_status from "../../../assets/json/property_status.json";
import { MdDelete } from "react-icons/md";
import CommonButton from "../../utilities/formElements/commonButton";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../firebase";
import { createListing } from "../../../services/user";
import { RootStateOrAny, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../utilities/commonTostify";
import Loading from "../../loader/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import { listingValidationSchema } from "../../utilities/validationSchema/userAuth";

function AddListing() {
  const [isButtonDisabled1, setButtonDisabled1] = useState<boolean>(false);
  const [isButtonDisabled2, setButtonDisabled2] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [btn2Loading, setBtn2Loading] = useState<boolean>(false);
  const [reload, setReload] = useState(false);
  const [files, setFiles] = useState([]);
  const [ImageUrls, setImageUrls] = useState<string[]>();
  const [propertyFilter, setPropertyFilter] = useState<any>();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(listingValidationSchema),
  });
  const userDetails = useSelector(
    (state: RootStateOrAny) => state.AuthReducer.authData
  );

  const handleImageSubmit = async () => {
    setBtn2Loading(true);
    setButtonDisabled2(true);
    if (files.length > 0) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setImageUrls(urls as string[]);
        setBtn2Loading(false);
        setButtonDisabled2(false);
      });
    }
  };

  const storeImage = async (file: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const onSubmit = async (data: any) => {
    setBtnLoading(true);
    setButtonDisabled1(true);
    const property_data = {
      userId: userDetails.user_id,
      name: data.name,
      description: data.description,
      address: data.address,
      property_type: data.property_type.map(
        (item: { label: string; value: string }) => item.value
      ),
      property_status: data.property_status.value,
      beds: +data.beds,
      baths: +data.baths,
      regular_price: +data.regular_price,
      discounted_price: +data.discounted_price,
      images: ImageUrls,
    };
    // console.log("property_data", property_data);
    const resp = await createListing(property_data);
    if (resp.success) {
      reset({});
      toastMessageSuccess(resp.message);
    } else {
      toastMessageError(resp.message);
    }
    setBtnLoading(false);
    setButtonDisabled1(false);
  };

  const handleRemoveImage = (i: number) => {
    const updatedState = ImageUrls?.filter((image, index) => i != index);
    setImageUrls(updatedState);
  };

  //   useEffect(() => {
  //      const temp={
  //         ...propertyFilter,
  //         {
  //             ...propertyFilter
  //         }
  //      }
  //   },[reload]);

  return (
    <>
      <div className="container">
        <h2 className="form-title">Create a Listing</h2>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data as any))}
          className="mt-5 form"
        >
          <div className="split-1">
            <div className="input-wrapper">
              <InputWrapper
                placeholder="Name"
                type="text"
                importantLabel={true}
                align="right"
                control={control}
                name="name"
                className="form-group"
              />
              {errors && errors?.name && (
                <p className="text text-danger">
                  <>{errors?.name?.message}</>
                </p>
              )}
            </div>
            <div className="input-desc">
              <CommonTextArea
                className="form-group"
                aria-label="With textarea"
                name="description"
                placeHolder="Description"
                type="text"
                control={control}
              />
              {errors && errors?.description && (
                <p className="text text-danger">
                  <>{errors?.description?.message}</>
                </p>
              )}
            </div>
            <div className="input-wrapper">
              <InputWrapper
                placeholder="Address"
                type="text"
                importantLabel={true}
                align="right"
                control={control}
                name="address"
                className="form-group"
              />
              {errors && errors?.address && (
                <p className="text text-danger">
                  <>{errors?.address?.message}</>
                </p>
              )}
            </div>
            <div className="filter-group">
              <div className="checkbox-group">
                <label className="select-box-label">Property Type</label>
                <div className="CommonMultiSelect">
                  <CommonMultiSelect
                    options={property_type}
                    placeholder="Select Type"
                    name="property_type"
                    isClearable={false}
                    control={control}
                    isMulti={true}
                    onchange={() => setReload(!reload)}
                  />
                  {errors && errors?.property_type && (
                    <p className="text text-danger">
                      <>{errors?.property_type?.message}</>
                    </p>
                  )}
                </div>
              </div>

              <div className="checkbox-group">
                <label className="select-box-label">Property Status</label>
                <div className="CommonMultiSelect">
                  <CommonMultiSelect
                    options={property_status}
                    placeholder="Select Status"
                    name="property_status"
                    isClearable={false}
                    isMulti={false}
                    control={control}
                  />
                  {errors && errors?.property_status && (
                    <p className="text text-danger">
                      <>{errors?.property_status?.message}</>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="input-wrapper-num-type">
              <div className="div-box">
                <label className="checkbox-filter">Beds</label>
                <InputWrapper
                  type="number"
                  importantLabel={true}
                  align="right"
                  control={control}
                  name="beds"
                  className="form-num-group"
                />
                {errors && errors?.beds && (
                  <p className="text text-danger">
                    <>{errors?.beds?.message}</>
                  </p>
                )}
              </div>
              <div className="div-box">
                <label className="checkbox-filter">Bath</label>
                <InputWrapper
                  type="number"
                  importantLabel={true}
                  align="right"
                  control={control}
                  name="baths"
                  className="form-num-group"
                />
                {errors && errors?.baths && (
                  <p className="text text-danger">
                    <>{errors?.baths?.message}</>
                  </p>
                )}
              </div>
              <div className="div-box">
                <label className="checkbox-filter-price">
                  Regular Price($/month)
                </label>
                <InputWrapper
                  type="number"
                  importantLabel={true}
                  align="right"
                  control={control}
                  name="regular_price"
                  className="form-num-group"
                />
                {errors && errors?.regular_price && (
                  <p className="text text-danger">
                    <>{errors?.regular_price?.message}</>
                  </p>
                )}
              </div>
              <div className="div-box">
                <label className="checkbox-filter-dis-price">
                  Discount Price($/month)
                </label>
                <InputWrapper
                  type="number"
                  importantLabel={true}
                  align="right"
                  control={control}
                  name="discounted_price"
                  className="form-num-group"
                />
                {errors && errors?.discounted_price && (
                  <p className="text text-danger">
                    <>{errors?.discounted_price?.message}</>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="split-2">
            <div className="mt-3">
              <p className="font-semibold">
                Images:
                <span className="font-normal text-gray-600 ml-2">
                  The first image will be the cover (max 6)
                </span>
              </p>
              <div className="image-upload">
                <input
                  name="image"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  className="file-input-img"
                  onChange={(e: any) => setFiles(e.target.files)}
                />
                {errors && errors?.image && (
                  <p className="text text-danger">
                    <>{errors?.image?.message}</>
                  </p>
                )}
                <CommonButton
                  className="submit-btn mt-1"
                  label="Upload"
                  type="button"
                  disabled={isButtonDisabled2}
                  loading={btn2Loading}
                  onClick={handleImageSubmit}
                />
              </div>
            </div>
            <div
              className={
                ImageUrls && ImageUrls.length > 0
                  ? "listing-img"
                  : "non-listing-img"
              }
            >
              {ImageUrls &&
                ImageUrls.length > 0 &&
                ImageUrls.map((url, index) => (
                  <div className="img-div" key={url}>
                    <img src={url} alt="listing image" className="img-class" />
                    <MdDelete
                      onClick={() => handleRemoveImage(index)}
                      className="delete-icon"
                    />
                  </div>
                ))}
            </div>
            <div className="submit-button-wrapper">
              <CommonButton
                className="create-listing-btn"
                label="Create Listing"
                type="submit"
                disabled={isButtonDisabled1}
                loading={btnLoading}
              />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddListing;
