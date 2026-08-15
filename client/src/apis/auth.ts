

export const logout = async() =>{

  try {
    const logoutUser = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })

    console.log("successfully logout")

  } catch (error) {
    console.log("Error occured")
  }

}