import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import ProductModel from "@/models/Product";
import CategoryModel from "@/models/Category";
import connectToDB from "../../../../configs/db";

export async function POST(req) {
  try {
    await connectToDB();

    const data = await req.formData();

    // فیلدهای ساده
    const title = data.get("title");
    const slug = data.get("slug");
    const brand = data.get("brand");
    const price = data.get("price");
    const discountPrice = data.get("discountPrice");
    const stock = data.get("stock");
    const sku = data.get("sku");
    const shortDescription = data.get("shortDescription");
    const description = data.get("description");
    const status = data.get("status");
    const category = data.get("category");

    const isFeatured = data.get("isFeatured") === "true";

    // JSON fields
    const attributes = JSON.parse(data.get("attributes") || "[]");
    const variants = JSON.parse(data.get("variants") || "[]");
    const variant = JSON.parse(data.get("variant") || "{}");
    const dimensions = JSON.parse(data.get("dimensions") || "{}");
    const tags = JSON.parse(data.get("tags") || "[]");

    // تصاویر
    const imageFiles = data.getAll("images");

    const images = [];

    for (const file of imageFiles) {
      if (!file || !file.name) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = Date.now() + "-" + file.name;

      const filePath = path.join(
        process.cwd(),
        "public/uploads/products",
        fileName,
      );

      await writeFile(filePath, buffer);

      images.push("/uploads/products/" + fileName);
    }

    const product = await ProductModel.create({
      title,
      slug,
      brand,
      price,
      discountPrice,
      stock,
      sku,
      shortDescription,
      description,
      status,
      category,
      isFeatured,
      attributes,
      variants,
      variant,
      dimensions,
      tags,
      images,
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("PRODUCT CREATE ERROR:", error);

    return NextResponse.json(
      { message: "Failed to create product", error: error.message },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");

    let query = {};

    // filter by category
    if (category) {
      query.category = category;
    }

    const allProduct = await ProductModel.find(query)
      .populate("category")
      .lean();

    return Response.json({ allProduct }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to get products",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
