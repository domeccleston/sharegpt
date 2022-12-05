import { ImageResponse } from "@vercel/og";
import Image from "next/image";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const inter = fetch(
  new URL("../../styles/Inter-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export default async function handler(req: NextRequest) {
  const interData = await inter;

  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "ShareGPT";

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
          <p
            style={{
              fontSize: "50px",
              fontWeight: "bold",
              fontFamily: "Inter",
              color: "#52525B",
              opacity: 0.9,
              marginTop: "20px",
            }}
          >
            {truncate(title, 100)}
          </p>
        </div>
        <div tw="flex mt-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://shareg.pt/logo.png"
            alt="logo"
            tw="h-12 w-12 rounded-md mr-3"
          />
          <p className="text-gray-600 text-lg">Shared with ShareGPT</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Inter",
          data: interData,
        },
      ],
    }
  );
}
