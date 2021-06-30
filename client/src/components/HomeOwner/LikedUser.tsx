import { useState } from "react";
import "./likedUser.css";
import { IUser } from "../../interfaces/interface";
interface IProps {
  user: IUser;
}
export default function LikedUser({ user }: IProps) {
  return (
    <>
      <div className="LikedUser-container">
        <img className="LikedUser-img" alt="profile" src="./images/woman.jpg" />
        {/* <img className="LikedUser-img" alt="profile" src={user.imgUrl} /> */}
        <span>Name: {user.fullName}</span>
        <span>Tel: {user.phoneNumber}</span>
        <span>Email: {user.email}</span>
        <span>Age: {user.age}</span>
      </div>
    </>
  );
}
