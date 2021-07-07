import { useRef, useEffect, useState } from "react";
import "./likedUser.css";
import { useHistory } from "react-router";
import network from "../../../utils/network";
import { IUser, IChatRoomTemplate } from "../../../interfaces/interface";
import { userSelectors } from "../../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";

interface IProps {
  likedUser: IUser;
  index: number;
  aptId: string;
}
export default function LikedUser({ likedUser, index, aptId }: IProps) {
  const history = useHistory();
  const { user } = useSelector(userSelectors);
  const startChatBtn = useRef<HTMLButtonElement>(null);
  const [isAlreadyInChat, setIsAlreadyInChat] = useState(false);
  const [isChatBtnClicked, setIsChatBtnClicked] = useState(false);

  useEffect(() => {
    if (likedUser.openChats) {
      setIsAlreadyInChat(likedUser.openChats.includes(user.id));
    }
  }, [isChatBtnClicked]);

  const openChat = async () => {
    const chatRoomConfig: IChatRoomTemplate = {
      aptId,
      participants: {
        ownerInfo: {
          id: user.id ? user.id : "",
          imgUrl: user.imgUrl,
          fullName: user.fullName,
        },
        userInfo: {
          id: likedUser._id ? likedUser._id : "",
          imgUrl: likedUser.imgUrl,
          fullName: likedUser.fullName,
        },
      },
    };
    try {
      await network.post(
        `${process.env.REACT_APP_BASE_URL}/chat-room/create-chat-room`,
        chatRoomConfig
      );
      setIsChatBtnClicked(true);
      alert(
        `Congratulations!🎉🎉 you and ${likedUser.fullName} can now talk in the chat room!`
      );
      moveToChatRoom();
    } catch (e) {
      console.error(e);
    }
  };

  const moveToChatRoom = () => {
    history.push(`/chat?user=${likedUser._id}`);
  };

  return (
    <>
      <div className="LikedUser-container" id={`user-${index}`}>
        <img className="LikedUser-img" alt="profile" src={likedUser.imgUrl} />
        <span>Name: {likedUser.fullName}</span>
        <span>Tel: {likedUser.phoneNumber}</span>
        <span>Email: {likedUser.email}</span>
        <span>Age: {likedUser.age}</span>
        {isAlreadyInChat ? (
          <button
            id="start-chat-btn"
            className="btn btn-outline-primary"
            onClick={moveToChatRoom}
            ref={startChatBtn}
          >
            Continue chatting
          </button>
        ) : (
          <button
            id="start-chat-btn"
            className="btn btn-outline-primary"
            onClick={openChat}
            ref={startChatBtn}
          >
            Start new chat
          </button>
        )}
      </div>
    </>
  );
}
