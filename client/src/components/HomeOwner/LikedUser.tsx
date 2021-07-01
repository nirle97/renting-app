import { useRef, useEffect } from "react";
import "./likedUser.css";
import { IUser } from "../../interfaces/interface";
interface IProps {
  user: IUser;
  currentId: string;
  index: number;
}
export default function LikedUser({ user, currentId, index }: IProps) {
  const focusedUser = useRef<HTMLDivElement>(null);
  if (focusedUser.current && focusedUser.current.id === currentId) {
    focusedUser.current.style.opacity = "1";
  } else {
    if (focusedUser.current) {
      focusedUser.current.style.opacity = "0.5";
    }
  }
  useEffect(() => {
    if (focusedUser.current) {
      if (focusedUser.current.id === "user-0") {
        focusedUser.current.style.opacity = "1";
      } else {
        if (focusedUser.current) {
          focusedUser.current.style.opacity = "0.5";
        }
      }
    }
  }, []);
  return (
    <>
      <div
        className="LikedUser-container"
        id={`user-${index}`}
        ref={focusedUser}
      >
        {/* <img className="LikedUser-img" alt="profile" src="./images/woman.jpg" /> */}
        <img className="LikedUser-img" alt="profile" src={user.imgUrl} />
        <span>Name: {user.fullName}</span>
        <span>Tel: {user.phoneNumber}</span>
        <span>Email: {user.email}</span>
        <span>Age: {user.age}</span>
      </div>
    </>
  );
}
