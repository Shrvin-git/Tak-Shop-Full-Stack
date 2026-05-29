import ContactModel from "@/models/Contact-Us";
import connectToDB from "../../../../configs/db";

export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  const { fullName, email, phone, orderCode, message } = body;

  //! regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+98|0)?9\d{9}$/;

  //? empty validation
  if (!email || !fullName || !phone || !message) {
    return Response.json(
      { message: "All fields are required" },
      { status: 422 },
    );
  }

  //? email validation
  if (!emailRegex.test(email)) {
    return Response.json({ message: "Invalid email format" }, { status: 422 });
  }

  //? phone validation
  if (!phoneRegex.test(phone)) {
    return Response.json({ message: "Invalid phone number" }, { status: 422 });
  }

  await ContactModel.create({
    fullName,
    email,
    phone,
    message,
    orderCode,
  });

  return Response.json(
    { message: "Message sent successfully" },
    { status: 201 },
  );
}
