import React from "react";

import { AppContext } from "../../context/AppContext";
import { useContext } from "react";


const BodyLoader = () => {
  const { bodyLoaderShow } = useContext(AppContext);
return (
    <>
        <div className={`my-loader ${bodyLoaderShow?'active':''}`}>
            <div>
                <div className="load-wrapp">
                    <div className="load-6">
                        <img src="/assets/img/logo.png" className="img-fluid" alt="Logo" />
                        <div className="letter-holder">
                        <div className="l-1 letter"></div>
                        <div className="l-2 letter"></div>
                        <div className="l-3 letter"></div>
                        <div className="l-4 letter"></div>
                        <div className="l-5 letter"></div>
                        <div className="l-6 letter"></div>
                        <div className="l-7 letter"></div>
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                {/* <div className="progress-div">
                    <div id="progressWrapper" style={{ width: "100%", background: "#eee", borderRadius: "20px" }}>
                        <div
                        id="progressBar"
                        style={{
                            width: `${progress}%`,
                            height: "20px",
                            backgroundColor: "green",
                            borderRadius: "20px",
                            transition: "width 0.3s ease"
                        }}
                        ></div>
                    </div>
                    <div id="progressText">{progress}%</div>
                </div> */}
            </div>
        </div>
    </>

  );
};

export default BodyLoader;
