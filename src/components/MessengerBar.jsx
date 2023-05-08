function MessengerBar() {
  return (
    <div className="messengerBar-container container">
      <div className="myUser ">
        <div className="messengerBar-containe-information messengerBar_separator">
          <div>
            <h2>My User</h2>
            <p className="user">asdfsadf</p>
          </div>
          <img src="../../public/ajuste.png" alt="" />{" "}
        </div>
      </div>
      <div className="separator">
        <div className="separator-container"></div>
      </div>
      <div className="information">
        <div className="messengerBar-containe-information messengerBar_separator">
          <h2>Information</h2>
          <img src="../../public/agregar.png" alt="agregar" />
        </div>
        <div className="information-container container-text">
          <img
            className="hashtag"
            src="../../public/picadillo.png"
            alt="hashtag"
          />
          <p className="messengerBar-text">Welcome</p>
        </div>
      </div>
      <div className="separator">
        <div className="separator-container"></div>
      </div>
      <div className="off-topic">
        <div className="messengerBar-containe-off-topic messengerBar_separator">
          <h2>Off-topic</h2>
          <img src="../../public/agregar.png" alt="agregar" />
        </div>
        <div className="Off-topic-container container-text">
          <img
            className="hashtag"
            src="../../public/picadillo.png"
            alt="hashtag"
          />
          <p className="messengerBar-text">asdfsadf</p>
        </div>
      </div>
      <div className="separator">
        <div className="separator-container"></div>
      </div>
      <div className="other Users">
        <h2>Other Users</h2>
        <p className="messengerBar-text">asdfsadf</p>
      </div>
    </div>
  );
}

export default MessengerBar;
