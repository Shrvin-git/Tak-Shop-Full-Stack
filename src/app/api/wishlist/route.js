import { NextResponse } from "next/server";
import WishModel from "@/models/WishList";
import { authUser } from "@/utils/auth-server";
import connectToDB from "../../../../configs/db";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectToDB();

    const user = await authUser();

    const body = await req.json();
    const { product } = body;
    // ! Remove Favorite Product

    const isExist = await WishModel.findOne({
      user: user._id,
      product: product,
    });

    if (isExist) {
      await WishModel.findOneAndDelete({
        user: user._id,
        product: product,
      });

      return NextResponse.json(
        { message: "Removed from favorites" },
        { status: 200 },
      );
    }
    // ! Remove Favorite Product

    await WishModel.create({
      user: user._id,
      product: product,
    });

    return NextResponse.json(
      { message: "Added to favorites" },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();

    const user = await authUser();
    if (!user) {
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 401 },
      );
    }

    const favorites = await WishModel.find({ user: user._id })
      .populate({
        path: "product",
        populate: {
          path: "category",
        },
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(favorites, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: err?.message,
        stack: process.env.NODE_ENV === "development" ? err?.stack : undefined,
      },
      { status: 500 },
    );
  }
}
