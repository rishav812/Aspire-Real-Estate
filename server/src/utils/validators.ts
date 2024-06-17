const validate = (data: object, schema:any): Promise<object> =>
    new Promise((resolve, reject) => {
      const options = { abortEarly: false };
      const { error, value } = schema.validate(data, options);
  
      if (error) {
        reject(error);
        return;
      }
      resolve(value);
    });
  export default validate;