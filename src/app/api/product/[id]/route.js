import ProductModel from "@/models/Product";
import Product from "@/models/Product";
import CommentModel from "@/models/Comment";
import CategoryModel from "@/models/Category";
import connectToDB from "../../../../../configs/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const { id } = params;
    const formData = await req.formData();

    const updateData = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      brand: formData.get("brand"),
      price: Number(formData.get("price")),
      discountPrice: Number(formData.get("discountPrice")),
      stock: Number(formData.get("stock")),
      sku: formData.get("sku"),
      shortDescription: formData.get("shortDescription"),
      description: formData.get("description"),
      status: formData.get("status"),
      isFeatured: formData.get("isFeatured") === "true",
      category: formData.get("category"),

      attributes: JSON.parse(formData.get("attributes") || "[]"),
      variants: JSON.parse(formData.get("variants") || "[]"),
      variant: JSON.parse(formData.get("variant") || "{}"),
      dimensions: JSON.parse(formData.get("dimensions") || "{}"),
      tags: JSON.parse(formData.get("tags") || "[]"),
    };

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return Response.json(
        { message: "محصول مورد نظر یافت نشد" },
        { status: 404 },
      );
    }

    return Response.json(
      { message: "محصول با موفقیت به‌روزرسانی شد :)", product: updatedProduct },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update Error:", error);

    return Response.json(
      { message: "خطا در آپدیت محصول", error: error.message },
      { status: 500 },
    );
  }
}

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { id } = params;
    const product = await ProductModel.findById(id)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "firstName lastName profileImage",
        },
      })
      .populate("category")
      .lean();

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("PRODUCT GET ERROR:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
