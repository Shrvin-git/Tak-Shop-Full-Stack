import TicketModel from "@/models/Ticket";
import DepartmentModel from "@/models/Department";
import UserModel from "@/models/User";
import connectToDB from "../../../../../configs/db";
import { authUser } from "@/utils/auth-server";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const user = await authUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { ticketId } = params;

    if (!mongoose.isValidObjectId(ticketId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const query = { _id: ticketId };

    if (user.role !== "ADMIN") {
      query.user = user._id;
    }

    const ticket = await TicketModel.findOne(query)
      .populate("department", "title slug")
      .populate("user", "userName email phone role");

    if (!ticket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(ticket, { status: 200 });
  } catch (err) {
    console.log("GET TICKET ERROR =>", err);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const user = await authUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { ticketId } = params;

    if (!mongoose.isValidObjectId(ticketId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const query = { _id: ticketId };

    if (user.role !== "ADMIN") {
      query.user = user._id;
    }

    const deletedTicket = await TicketModel.findOneAndDelete(query);

    if (!deletedTicket) {
      return NextResponse.json(
        { message: "Ticket not found or access denied" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Ticket deleted successfully",
        ticket: deletedTicket,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("DELETE TICKET ERROR =>", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req, { params }) {
  await connectToDB();

  const user = await authUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { ticketId } = params;
  if (!mongoose.isValidObjectId(ticketId))
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

  const query = { _id: ticketId };
  if (user.role !== "ADMIN") query.user = user._id;

  const updated = await TicketModel.findOneAndUpdate(
    query,
    { status: "closed" },
    { new: true },
  );

  if (!updated)
    return NextResponse.json(
      { message: "Ticket not found or access denied" },
      { status: 404 },
    );

  return NextResponse.json(updated, { status: 200 });
}
