import { ReadMenuFile } from "../utils/menu-helper.js";

export const GetMenuList =async ()=>{

    const menuList = await ReadMenuFile();
    console.log(menuList);
    return menuList;
};
