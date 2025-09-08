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
                        <div className="letter-holder">
                        <div className="l-1 letter">L</div>
                        <div className="l-2 letter">o</div>
                        <div className="l-3 letter">a</div>
                        <div className="l-4 letter">d</div>
                        <div className="l-5 letter">i</div>
                        <div className="l-6 letter">n</div>
                        <div className="l-7 letter">g</div>
                        <div className="l-8 letter">.</div>
                        <div className="l-9 letter">.</div>
                        <div className="l-10 letter">.</div>
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
