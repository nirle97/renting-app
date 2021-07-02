import { useEffect, useState, useRef } from "react";
import network from "../../utils/network";
import { IUploadNewApt, IUser } from "../../interfaces/interface";
import "./homeOwner.css";
import ImageSlider from "../SliderImg/SliderImg";
import LikedUser from "./LikedUser";
import { useDispatch } from "react-redux";
import { setIsDataLoading } from "../../store/spinnerSlice";
export default function HomeOwner() {
  const [aptsArr, setAptsArr] = useState<IUploadNewApt[]>([]);
  const [selectedAptId, setSelectedAptId] = useState("");
  const [likedUser, setLikedUser] = useState<IUser[]>();
  const [index, setIndex] = useState(1);
  const focusedUserDiv = useRef<HTMLDivElement>(null);
  const [currentId, setCurrentId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    getOwnerApts();
  }, []);

  const getOwnerApts = async () => {
    try {
      dispatch(setIsDataLoading({ isDataLoading: true }));
      const {
        data: { data },
      } = await network.get("/apartment/owner-apts");
      setAptsArr(data);
      dispatch(setIsDataLoading({ isDataLoading: false }));
    } catch (e) {
      dispatch(setIsDataLoading({ isDataLoading: false }));
    }
  };

  const clickedHandler = (e: any) => {
    const currentAptId = e.currentTarget.id;
    setSelectedAptId(currentAptId);
    const currentApt: IUploadNewApt | undefined = aptsArr?.find(
      (apt) => apt._id === currentAptId
    );
    if (currentApt) {
      const users = currentApt.likedByUser as IUser[];
      if (users.length) {
        setLikedUser([
          ...users,
          {
            fullName: "ccc",
            phoneNumber: "453",
            email: "asd@asd.com",
            password: "asd",
            age: "12",
            imgUrl: "asdasd.asdads",
          },
          // {
          //   fullName: "dddddd",
          //   phoneNumber: "453",
          //   email: "asd@asd.com",
          //   password: "asd",
          //   age: "12",
          //   imgUrl: "asdasd.asdads",
          // },
          // {
          //   fullName: "eeee",
          //   phoneNumber: "453",
          //   email: "asd@asd.com",
          //   password: "asd",
          //   age: "12",
          //   imgUrl: "asdasd.asdads",
          // },
          // {
          //   fullName: "zzzz",
          //   phoneNumber: "453",
          //   email: "asd@asd.com",
          //   password: "asd",
          //   age: "12",
          //   imgUrl: "asdasd.asdads",
          // },
        ]);
      }
    }
  };
  function addStyle(index: number) {
    const applyedClasses = focusedUserDiv.current?.classList;
    if (applyedClasses) {
      applyedClasses.forEach(() => {
        if (
          focusedUserDiv.current?.classList.contains(`active-slide-${index}`)
        ) {
          setCurrentId(`user-${index}`);
        }
      });
    }
  }
  const nextUser = () => {
    if (likedUser && focusedUserDiv.current) {
      const newIndex = index + 1;
      if (newIndex > likedUser.length) return;
      setIndex(index + 1);
      addStyle(index);
    }
  };

  const prevUser = () => {
    if (likedUser) {
      const newIndex = index - 1;
      if (newIndex < -1) return;
      addStyle(index);
      setIndex(index - 1);
    }
  };

  return (
    <div className="HomeOwner-container">
      {!aptsArr?.length ? (
        <h1>Upload new apartment to see all of your assets!</h1>
      ) : (
        <>
          {aptsArr.map((apt, i) => (
            <div
              className="HomeOwner-apt"
              key={`HomeOwner-${i}`}
              id={apt._id}
              onClick={clickedHandler}
            >
              <div className="HomeOwner-apt-div">
                <div className="HomeOwner-img-div">
                  <ImageSlider size="small" sliderData={apt.imagesUrl} />
                  {/* <ImageSlider size="small" /> */}
                </div>
                <div className="HomeOwner-description-container">
                  <div className="HomeOwner-description-main">
                    <span id="title" className="description-text-span">
                      {apt.title}
                    </span>
                    <span className="description-text-span">{apt.address}</span>
                    <span className="HomeOwner-description-main-miniContainer">
                      <span className="description-text">
                        Size: {`${apt.size}m²`}
                      </span>
                      <span className="description-text"> | </span>
                      <span className="description-text">
                        Rooms: {apt.rooms}
                      </span>
                      <span className="description-text"> | </span>
                      <span className="description-text">
                        Floor: {apt.floor}
                      </span>
                    </span>
                    <span className="description-text-span">
                      {apt.pricePerMonth}₪/Per month
                    </span>
                    <span className="description-text-span">
                      Rental Type: {apt.rentalType}
                    </span>
                    <span className="description-text-span">
                      Entry Date: {new Date(apt.entryDate).toLocaleDateString()}
                    </span>
                    <span className="description-text-span">
                      CheckOut Date:{" "}
                      {new Date(apt.checkOutDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="HomeOwner-description-secondary">
                    <div className="HomeOwner-description-secondary-left">
                      <span className="description-secondary-text-span">
                        Parking:{" "}
                        {apt.parking ? (
                          <i className="fas fa-check description-check"></i>
                        ) : (
                          <i className="fas fa-times description-un-check"></i>
                        )}
                      </span>
                      <span className="description-secondary-text-span">
                        Porch:{" "}
                        {apt.porch ? (
                          <i className="fas fa-check description-check"></i>
                        ) : (
                          <i className="fas fa-times description-un-check "></i>
                        )}
                      </span>
                      <span className="description-secondary-text-span">
                        Garden:{" "}
                        {apt.garden ? (
                          <i className="fas fa-check description-check"></i>
                        ) : (
                          <i className="fas fa-times description-un-check"></i>
                        )}
                      </span>
                      <span className="description-secondary-text-span">
                        Furnished:{" "}
                        {apt.furnished ? (
                          <i className="fas fa-check description-check"></i>
                        ) : (
                          <i className="fas fa-times description-un-check"></i>
                        )}
                      </span>
                    </div>
                    <div className="HomeOwner-description-secondary-right">
                      <span className="description-secondary-text-span">
                        Elevator:{" "}
                        {apt.elevator ? (
                          <i className="fas fa-check description-check"></i>
                        ) : (
                          <i className="fas fa-times description-un-check"></i>
                        )}
                      </span>
                      <span className="description-secondary-text-span">
                        Pets Allowed:{" "}
                        {apt.petsAllowed ? (
                          <i className="fas fa-check description-check"></i>
                        ) : (
                          <i className="fas fa-times description-un-check"></i>
                        )}
                      </span>
                      <span className="description-secondary-text-span">
                        Smoke Allowed:{" "}
                        {apt.smokeAllowed ? (
                          <i className="fas fa-check description-check"></i>
                        ) : (
                          <i className="fas fa-times description-un-check"></i>
                        )}
                      </span>
                      <span className="description-secondary-text-span">
                        Handicap Accessible:{" "}
                        {apt.handicapAccessible ? (
                          <i className="fas fa-check description-check"></i>
                        ) : (
                          <i className="fas fa-times description-un-check"></i>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {selectedAptId === apt._id && (
                <div className="HomeOwner-apt-container">
                  <span className="HomeOwner-left-arrow" onClick={prevUser}>
                    <i
                      id="HomeOwner-arrow-i1"
                      className="fas fa-arrow-left"
                    ></i>
                  </span>

                  <div
                    ref={focusedUserDiv}
                    className={`HomeOwner-likes-slider active-slide-${index}`}
                  >
                    <div
                      className="HomeOwner-likes-wrapper"
                      style={
                        index > 1
                          ? {
                              transform: `translateX(-${
                                likedUser && index * (90 / 5)
                              }%)`,
                            }
                          : {}
                      }
                    >
                      {!likedUser?.length && (
                        <h3 id="no-likes-h3">
                          No One Liked This Apartment Yet :(
                        </h3>
                      )}
                      {likedUser?.map((user, i) => (
                        <LikedUser
                          key={i}
                          likedUser={user}
                          index={i}
                          currentId={currentId}
                          aptId={apt._id ? apt._id : ""}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="HomeOwner-right-arrow" onClick={nextUser}>
                    <i
                      id="HomeOwner-arrow-i2"
                      className="fas fa-arrow-right"
                    ></i>
                  </span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
