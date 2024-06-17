import { useForm } from "react-hook-form";
import InputWrapper from "../../utilities/formElements/InputWrapper";
import { addCategory } from "../../../services/admin";
import { useState } from "react";
import React from "react";

function AddCategory() {
  const [isButtonDisabled1, setButtonDisabled1] = useState<boolean>(false);
  const {control , handleSubmit, formState: { errors }} = useForm<any>();

  const onSubmit = async (data: any) => {
    setButtonDisabled1(true);
    try {
      const response = await addCategory(data);
      if (response?.status === 200) {
        alert("Category added successfully");
      }
      else if(response?.status === 400){
        alert("Category already exist")
      }
      console.log(response);
    } catch (error) {
      console.log("Error in adding product: ", error);
    }
    setButtonDisabled1(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          padding: "20%",
          width: "100vw",
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Add Category</h2>
        <br/>
        <div className="form-group">
          <InputWrapper
            control={control}
            type="text"
            placeholder="Enter Category Name"
            name="category_name"
            className="form-control beautiful-input"
          />
          <div className="message error">
            {errors && errors?.category_name && (
              <p>
                <>{errors?.category_name?.message}</>
              </p>
            )}
          </div>
        </div>
        <br/>
        <button type="submit" className="btn btn-primary" disabled={isButtonDisabled1}>Add Category</button>
      </form>
    </div>
  );
}

export default AddCategory;
