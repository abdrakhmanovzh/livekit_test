import "@livekit/components-styles";
import {
    LiveKitRoom,
    VideoConference,
    GridLayout,
    ParticipantTile,
    RoomAudioRenderer,
    ControlBar,
    useTracks,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import { Track } from "livekit-client";
import { useRouter } from "next/router";
import Head from "next/head";

export default function RoomPage() {
    const router = useRouter();
    const room = "quickstart-room";
    const { username } = router.query;
    const [token, setToken] = useState("");

    useEffect(() => {
        (async () => {
            const resp = await fetch(
                `/api/get_lk_token?room=${room}&username=${username}`
            );
            const data = await resp.json();
            setToken(data.token);
        })();
    }, [username]);

    if (token === "") {
        return <div>Getting token...</div>;
    }

    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <LiveKitRoom
                video={true}
                audio={true}
                token={token}
                connectOptions={{ autoSubscribe: false }}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
                data-lk-theme="default"
                style={{ height: "100dvh" }}
            >
                {/* Your custom component with basic video conferencing functionality. */}
                <MyVideoConference />
                {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
                <RoomAudioRenderer />
                {/* Controls for the user to start/stop audio, video, and screen 
      share tracks and to leave the room. */}
                <ControlBar />
            </LiveKitRoom>
        </>
    );
}

function MyVideoConference() {
    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false }
    );
    return (
        <GridLayout
            tracks={tracks}
            style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
        >
            {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
            <ParticipantTile />
        </GridLayout>
    );
}
