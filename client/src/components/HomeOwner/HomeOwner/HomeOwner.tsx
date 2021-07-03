import { useEffect, useState, useRef } from "react";
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
      } = await network.get("/apartment/owner-apts");
      setAptsArr(data);
      dispatch(setIsDataLoading({ isDataLoading: false }));
    } catch (e) {
      dispatch(setIsDataLoading({ isDataLoading: false }));
    }
  };
  return (
    <div className="HomeOwner-container">
      {!aptsArr?.length ? (
        <h1>Upload new apartment to see all of your assets!</h1>
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
