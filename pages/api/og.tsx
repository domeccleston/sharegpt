import { ImageResponse } from "@vercel/og";
import Image from "next/image";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const interMedium = fetch(
  new URL("../../styles/Inter-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const interBold = fetch(
  new URL("../../styles/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export default async function handler(req: NextRequest) {
  const [interMediumData, interBoldData] = await Promise.all([
    interMedium,
    interBold,
  ]);

  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "ShareGPT";
  const avatar = searchParams.get("avatar") || "https://avatar.vercel.sh/{";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem",
          backgroundColor: "white",
          backgroundImage:
            "linear-gradient(to right, #c5f9d7, #f7d486, #f27a7d)",
        }}
      >
        <div tw="flex p-10 rounded-lg bg-white/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt="avatar" tw="h-14 w-14 mr-5 mt-5" />
          <p
            style={{
              fontSize: "40px",
              fontFamily: "InterMedium",
              color: "#52525B",
              opacity: 0.9,
            }}
          >
            {truncate(title, 120)}
          </p>
        </div>
        <div tw="flex mt-5 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://shareg.pt/logo.png"
            alt="logo"
            tw="h-14 w-14 rounded-md mr-3"
          />
          <p
            style={{
              fontSize: "40px",
              fontFamily: "InterBold",
              color: "#52525B",
              opacity: 0.9,
            }}
          >
            shareg.pt
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "InterMedium",
          data: interMediumData,
        },
        {
          name: "InterBold",
          data: interBoldData,
        },
      ],
    }
  );
}
