export interface IUpdateUserDetail{
  user_id:string,
  image:string,
  name:string,
  oldPassword?:string,
  password?:string,
  email:string,
  phone:string
}

export interface ICart{
  user_id:string,
  _id:string
}