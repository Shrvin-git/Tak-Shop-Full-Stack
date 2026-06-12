import Product from "@/models/Product";
import Article from "@/models/Article";
import Category from "@/models/Category";
import connectToDB from "../../../../configs/db";

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q || q.trim().length < 2) {
      return Response.json([]);
    }

    const regex = new RegExp(q.trim(), "i");

    const [products, articles, categories] = await Promise.all([
      Product.find({
        $or: [
          { title: regex },
          { shortDescription: regex },
          { brand: regex },
          { tags: regex },
        ],
      })
        .select("title slug images price")
        .limit(5)
        .lean(),

      Article.find({
        $or: [{ title: regex }, { excerpt: regex }, { tags: regex }],
      })
        .select("title slug coverImage")
        .limit(5)
        .lean(),

      Category.find({
        title: regex,
      })
        .select("title slug image")
        .limit(5)
        .lean(),
    ]);

    return Response.json({
      products,
      articles,
      categories,
    });
  } catch (err) {
    console.log(err);

    return Response.json({ message: "server error" }, { status: 500 });
  }
}
