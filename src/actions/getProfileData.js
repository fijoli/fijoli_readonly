
const getregisteredInfo = (whatsapp_number, isloggedIn = false) => {
    return {
      type: "get_registeredInfo",
      data: {"whatsapp_number": whatsapp_number, "isloggedIn": isloggedIn}
    };
  };
  
export default getregisteredInfo;