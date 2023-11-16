import React from "react";

const AdminDashBoard = () => {
  return (
    <>
      <div className="main-content">
        <div className="main-section">
          <div className="image-column">
            <div className="image-container">
              {/* <img src="fac.jpg" alt="Main Image" className="main-image"> */}
            </div>
          </div>
          <div className="text-column">
            <div className="text-container">
              <div className="text-section">
                <div className="title">Discover Our</div>
                <div className="subtitle">Delicious Menu</div>
                <div className="description">
                  Explore a variety of mouth-watering dishes crafted with care
                  and passion. From appetizers to desserts, we have something
                  for every palate.
                </div>
                <div className="cta-btn">View Menu</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="separator-line"></div>

      <div className="additional-section">
        <div className="additional-column">
          <div className="additional-box">
            <div className="additional-title">Item 1</div>
            <div className="additional-content"></div>
          </div>
        </div>
        <div className="additional-column">
          <div className="additional-box">
            <div className="additional-title">Item 2</div>
            <div className="additional-content"></div>
          </div>
        </div>
        <div className="additional-column">
          <div className="additional-box">
            <div className="additional-title">Item 3</div>
            <div className="additional-content"></div>
          </div>
        </div>
      </div>

      <div className="movie-showcase">
        <div className="movie-section">
          <div className="movie-column">
            <div className="movie-container">
              <div className="new-display-box">
                {/* <img src="123.jpg" alt="Movie 1" className="movie-image"> */}
              </div>
            </div>
          </div>
          <div className="movie-column">
            <div className="movie-container">
              <div className="new-display-box">
                {/* <img src="456.jpg" alt="Movie 2" className="movie-image"> */}
              </div>
            </div>
          </div>
          <div className="movie-column">
            <div className="movie-container">
              <div className="new-display-box">
                {/* <img src="789.jpg" alt="Movie 3" className="movie-image"> */}
              </div>
            </div>
          </div>
        </div>
        <div className="nav-arrow left">&#8249;</div>
        <div className="nav-arrow right">&#8250;</div>
        <div className="dot-container">
          <div className="dot" onclick="currentSlide(1)"></div>
          <div className="dot" onclick="currentSlide(2)"></div>
          <div className="dot" onclick="currentSlide(3)"></div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
