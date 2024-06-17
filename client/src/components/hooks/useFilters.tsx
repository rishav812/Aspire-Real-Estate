import { useState } from "react";

let globalFilter={
    filter:{
        category:{label:"",value:""}
    }
}

const setGlobalFilter = (data: any) => {
   globalFilter = data;
};

export const useFilter = () => {
  return [globalFilter, setGlobalFilter] as const;
};
