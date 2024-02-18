

const actiongetloginUser = (loginData) => {
    return {
      type: "get_loginData",
      loginData
    };
};
  
export default actiongetloginUser;