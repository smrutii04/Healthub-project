import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const RoomPage = ({ roomId }) => {

  
  const myMeeting = async (Element) => {
    const appID =Number(import.meta.env.VITE_REACT_APP_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_REACT_APP_ZEGO_SERVER_SECRET;
    const kitTokan = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "rakesh"
    );
    const zc = ZegoUIKitPrebuilt.create(kitTokan);

    zc.joinRoom({
      container: Element,
      sharedLinks: [
        {
          name: "copy Link",
          URL: `http://localhost:3000/room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };
  return (
    <div>
      <div ref={myMeeting} />
    </div>
  );
};

export default RoomPage;
