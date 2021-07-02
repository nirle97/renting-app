import { useRef, useEffect } from "react";
import "./likedUser.css";
import network from "../../utils/network";
import { IUser, IChatRoom } from "../../interfaces/interface";
import { userSelectors } from "../../store/userSlice";
import { useSelector } from "react-redux";

interface IProps {
  likedUser: IUser;
  currentId: string;
  index: number;
  aptId: string;
}
export default function LikedUser({
  likedUser,
  currentId,
  index,
  aptId,
}: IProps) {
  const { user } = useSelector(userSelectors);
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

  const openChat = async (e: any) => {
    const chatRoomConfig: IChatRoom = {
      aptId,
      participants: {
        ownerInfo: {
          id: user.id ? user.id : "",
          imgUrl: user.imgUrl,
          fullName: user.fullName,
        },
        userInfo: {
          id: likedUser.id ? user.id : "",
          imgUrl: likedUser.imgUrl,
          fullName: likedUser.fullName,
        },
      },
    };
    try {
      await network.post("/chatRoom/create-chat-room", chatRoomConfig);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        className="LikedUser-container"
        id={`user-${index}`}
        ref={focusedUser}
      >
        {/* <img className="LikedUser-img" alt="profile" src="./images/woman.jpg" /> */}
        <img className="LikedUser-img" alt="profile" src={likedUser.imgUrl} />
        <span>Name: {likedUser.fullName}</span>
        <span>Tel: {likedUser.phoneNumber}</span>
        <span>Email: {likedUser.email}</span>
        <span>Age: {likedUser.age}</span>
        <button className="btn btn-outline-success" onClick={openChat}>
          Open chat
        </button>
      </div>
    </>
  );
}
