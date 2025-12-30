import { useEffect } from "react";
import { db } from "../Auth/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Timeline() {
  useEffect(() => {
    const LocalStorageData = JSON.parse(localStorage.getItem("user-info"));

    alert(LocalStorageData.userId);
  }, []);

  return <div> Timeline is Mounted </div>;
}
