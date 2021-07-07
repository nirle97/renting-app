import { useEffect, useState } from "react";
import network from "../../../utils/network";
import { IUploadNewApt } from "../../../interfaces/interface";
import "./homeOwner.css";
import { useDispatch } from "react-redux";
import { setIsDataLoading } from "../../../store/spinnerSlice";
import OwnerApts from "../OwnerApts/OwnerApts";

export default function HomeOwner() {
  const [aptsArr, setAptsArr] = useState<IUploadNewApt[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getOwnerApts();
  }, []);

  const getOwnerApts = async () => {
    try {
      dispatch(setIsDataLoading({ isDataLoading: true }));
      const {
        data: { data },
      } = await network.get(
        `${process.env.REACT_APP_BASE_URL}/apartment/owner-apts`
      );
      setAptsArr(data);
      dispatch(setIsDataLoading({ isDataLoading: false }));
    } catch (e) {
      dispatch(setIsDataLoading({ isDataLoading: false }));
    }
  };
  return (
    <div className="HomeOwner-container">
      {!aptsArr?.length ? (
        <div>
          <h1>Click the button below to upload a new apartment</h1>
          <img
            className="HomeOwner-arrow-gif"
            src="./images/arrow-shape-right-down.png"
            alt="arrow-gif"
          />
        </div>
      ) : (
        <>
          {aptsArr.map((apt, i) => (
            <OwnerApts key={i} apt={apt} aptsArr={aptsArr} />
          ))}
        </>
      )}
    </div>
  );
}
