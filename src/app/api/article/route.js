import { NextResponse } from "next/server";
import ArticleModel from "@/models/Article";
import connectToDB from "../../../../configs/db";

export async function GET() {
  try {
    await connectToDB();
    const articles = await ArticleModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
