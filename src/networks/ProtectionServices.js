const user = JSON.parse(localStorage.getItem("userData"));

function checkPermisions() {
    return user.role === "admin" ? true : false;
}

const ProtectionServices = {
    checkPermisions,
}

export default ProtectionServices;