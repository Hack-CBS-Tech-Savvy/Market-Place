const serverUrl = "https://inhypuaqxp0j.usemoralis.com:2053/server";
const appId = "FHGI7OXyotnDEj1g19rgrl2gjmj1Lkl9gqBYsbRc";
Moralis.start({ serverUrl, appId });

// LOG IN WITH METAMASK
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate();
  }
  console.log("logged in user:", user);
  alert(`Logged in Succesfully!`);
}

// LOG OUT
async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  alert(`Logged out Succesfully!`);
}

document.getElementById("login_button").onclick = login;
document.getElementById("logout_button").onclick = logOut;
