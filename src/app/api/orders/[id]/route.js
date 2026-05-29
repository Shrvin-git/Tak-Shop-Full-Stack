import Order from "@/models/Order";
import connectToDB from "../../../../../configs/db";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { id } = params;

    const orders = await Order.find({ user: id }).populate({
      path: "items.product",
      populate: {
        path: "category",
        select: "slug",
      },
    });

    return Response.json({ orders }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
