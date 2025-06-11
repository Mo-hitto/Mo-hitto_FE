import { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import styles from "./Account.module.css";

const Account = () => {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("토큰이 없습니다.");

        const formattedToken = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;

        const response = await fetch(
          "http://43.203.208.49:8080/mypage/userInfo",
          {
            method: "GET",
            headers: {
              Authorization: formattedToken,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user info");

        const resData = await response.json();
        setUserInfo({
          name: resData.data?.name ?? "",
          email: resData.data?.email ?? "",
        });
      } catch (err) {
        console.error("유저 정보 조회 실패:", err.message);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>나의 계정</h2>
      <div className={styles.profileImageWrapper}>
        <img src={profile} alt="profile" className={styles.profileImage} />
      </div>
      <div className={styles.card}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>이름</label>
          <input
            type="text"
            value={userInfo.name || ""}
            disabled
            className={styles.input}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>e-mail</label>
          <input
            type="email"
            value={userInfo.email || ""}
            disabled
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
