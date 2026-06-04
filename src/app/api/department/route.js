import DepartmentModel from "@/models/Department";
import connectToDB from "../../../../configs/db";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { title, isActive } = body;

    // Valid Title ✅

    await DepartmentModel.create({ title, isActive });

    return Response.json(
      { message: "Department created successfully :))" },
      { status: 200 },
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET() {
  connectToDB();
  const departments = await DepartmentModel.find({});
  return Response.json(departments);
}
