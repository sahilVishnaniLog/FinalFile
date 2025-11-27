import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig.js";

export const handleSignOut = async () => {
    console.log("sign out 213 is atleast connecting to its handler funnction");
    try {
        await signOut(auth);
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user-info");

        window.location.href = "/";
    } catch (error) {
        console.log("Error signing out:", error);
    }
};
// } {
//     console.log("sign out 213 is working ");
//     signOut(auth).then(() => {
//         redirect(");
//         localStorage.clear("auth-token");
//         localStorage.clear("user-info");
//         window.location.reload();
//     });
// }
