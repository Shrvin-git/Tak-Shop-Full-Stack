import Order from "@/models/Order";
import Product from "@/models/Product";
import connectToDB from "../../../../configs/db";
import { authUser } from "@/utils/auth-server";

export async function POST(req) {
  try {
    await connectToDB();

    const user = await authUser();
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const items = body.items.map((item) => ({
      product: item.product,
      count: item.count,
    }));

    const order = await Order.create({
      user: user._id,
      items,
      totalPrice: body.totalPrice,
      discount: body.discount,
      shipping: body.shipping,
      payable: body.payable,
      paymentMethod: body.paymentMethod,
      shippingAddress: body.shippingAddress,
      status: "paid",
    });

    // اضافه کردن عملیات populate روی سند ایجاد شده
    await order.populate([
      {
        path: "items.product",
        populate: {
          path: "category",
          select: "slug",
        },
      },
      {
        path: "user",
        select: "firstName lastName email userName",
      },
    ]);

    return Response.json({ order }, { status: 201 });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();

    const user = await authUser();

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const orders = await Order.find({})
      .populate("user", "name phone email")
      .populate("items.product");

    return Response.json({ orders });
  } catch (err) {
    console.error("GET ORDERS ERROR:", err);

    return Response.json({ message: err.message }, { status: 500 });
  }
}

