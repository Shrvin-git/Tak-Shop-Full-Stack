import connectToDB from "../../../../../configs/db";
import UserModel from "@/models/User";
import { writeFile } from "fs/promises";
import path from "path";

export async function PUT(req, { params }) {
  await connectToDB();

  try {
    const userID = params.id;

    // دریافت FormData
    const formData = await req.formData();

    // دریافت مقادیر متنی
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const postalCode = formData.get("postalCode");

    // دریافت فایل (اختیاری)
    const file = formData.get("image");
    let profileImageUrl;

    if (file && typeof file === "object") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = Date.now() + "-" + file.name;
      const uploadPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        filename,
      );

      await writeFile(uploadPath, buffer);

      // آدرسی که در دیتابیس ذخیره می‌شود
      profileImageUrl = `/uploads/${filename}`;
    }

    // ساخت آبجکت آپدیت
    const updateData = {
      firstName,
      lastName,
      email,
      phone,
      address,
      postalCode, // مقدار را بدون شرط ارسال کن
      ...(profileImageUrl && { profileImage: profileImageUrl }),
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      { $set: updateData },
      { new: true },
    );

    return Response.json(
      {
        message: "User updated successfully.",
        updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: "Server error!" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectToDB();

  try {
    const { id } = params;
    const userID = id;

    const deletedUser = await UserModel.findByIdAndDelete(userID);

    if (!deletedUser) {
      return Response.json({ message: "کاربر پیدا نشد" }, { status: 404 });
    }

    return Response.json(
      { message: "user deleted successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Delete Error:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
