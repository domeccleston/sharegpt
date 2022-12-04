import { NextRequest, NextResponse } from "next/server";

const request = (req: NextRequest) => {
  return NextResponse.rewrite("http://localhost:3000/");
};

export const config = {
  runtime: "experimental-edge",
};

export default request;
