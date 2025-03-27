import react from "react";
import { Management } from "../Management/Management";
import { Outlet } from "react-router-dom";
import { ContentManagement } from "../Management/ContentManagement";

export function Rootlayout(){
    return(
       <>
       <Management/>

       <Outlet/>
       {/* <ContentManagement/> */}
       </>
    )
}