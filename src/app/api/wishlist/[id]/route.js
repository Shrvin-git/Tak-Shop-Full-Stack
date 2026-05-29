import Product from "@/models/Product";
import WishListModel from "@/models/WishList";
import connectToDB from "../../../../../configs/db";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const productID = params.id;
    const product = await WishListModel.findByIdAndDelete(productID);
    if (!product) {
      return Response.json({ message: "product not found" }, { status: 404 });
    }

    return Response.json(
      { message: "product removed successfully :)" },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
