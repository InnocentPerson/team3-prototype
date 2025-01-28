export function getUserData() {
    const data = localStorage.getItem("userData");
    if (!data) return null;
    const userData = JSON.parse(data);
    // Check expiry
    if (Date.now() > userData.expiry) {
      localStorage.removeItem("userData");
      return null;
    }
    return userData; // e.g. { email, role, token, expiry, stoken }
  }
  