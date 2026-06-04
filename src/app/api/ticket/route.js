import { NextResponse } from "next/server";
import mongoose from "mongoose";
import TicketModel from "@/models/Ticket";
import DepartmentModel from "@/models/Department";
import TicketMessageModel from "@/models/TicketMessage";
import connectToDB from "../../../../configs/db";
import { authUser } from "@/utils/auth-server";

export async function POST(req) {
  try {
    await connectToDB();

    const user = await authUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, priority = 1, department, body } = await req.json();

    if (!title?.trim()) {
      return NextResponse.json(
        { message: "title is required" },
        { status: 400 },
      );
    }

    if (!body?.trim()) {
      return NextResponse.json(
        { message: "body is required" },
        { status: 400 },
      );
    }

    const pr = Number(priority);

    if (![1, 2, 3].includes(pr)) {
      return NextResponse.json(
        { message: "priority must be 1,2,3" },
        { status: 400 },
      );
    }

    if (department && !mongoose.isValidObjectId(department)) {
      return NextResponse.json(
        { message: "department is invalid" },
        { status: 400 },
      );
    }

    const ticket = await TicketModel.create({
      user: user._id,
      title: title.trim(),
      priority: pr,
      department: department || undefined,
      lastMessageAt: new Date(),
      lastMessageBy: "user",
      status: "pending",
    });

    const message = await TicketMessageModel.create({
      ticket: ticket._id,
      senderType: "user",
      sender: user._id,
      body: body.trim(),
    });

    await TicketModel.updateOne(
      { _id: ticket._id },
      {
        $set: {
          lastMessageAt: message.createdAt || new Date(),
          lastMessageBy: "user",
        },
      },
    );

    return NextResponse.json(
      { message: "Ticket created", ticketId: ticket._id },
      { status: 201 },
    );
  } catch (err) {
    console.log("CREATE TICKET ERROR =>", err);

    return NextResponse.json(
      { message: err?.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectToDB();

    const user = await authUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const query = {};

    if (user.role !== "ADMIN") {
      query.user = user._id;
    }

    const tickets = await TicketModel.find(query)
      .populate({
        path: "user",
        select: "userName email phone role",
      })
      .populate({
        path: "department",
        select: "title slug",
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (err) {
    console.error("GET TICKETS ERROR:", err);

    return NextResponse.json(
      { message: err?.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
