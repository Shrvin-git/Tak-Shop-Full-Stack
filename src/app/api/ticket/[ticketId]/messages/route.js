import TicketMessageModel from "@/models/TicketMessage";
import TicketModel from "@/models/Ticket";
import { authUser } from "@/utils/auth-server";
import connectToDB from "../../../../../../configs/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req, { params }) {
  try {
    await connectToDB();

    const user = await authUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { ticketId } = params;
    const { body } = await req.json();

    if (!mongoose.isValidObjectId(ticketId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    if (!body?.trim()) {
      return NextResponse.json(
        { message: "body is required" },
        { status: 400 },
      );
    }

    const query = { _id: ticketId };

    if (user.role !== "ADMIN") {
      query.user = user._id;
    }

    const ticket = await TicketModel.findOne(query);

    if (!ticket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 },
      );
    }

    const senderType = user.role === "ADMIN" ? "admin" : "user";

    const message = await TicketMessageModel.create({
      ticket: ticketId,
      senderType,
      sender: user._id,
      body: body.trim(),
    });

    await TicketModel.updateOne(
      { _id: ticketId },
      {
        $set: {
          lastMessageAt: message.createdAt || new Date(),
          lastMessageBy: senderType,
          status: user.role === "ADMIN" ? "answered" : "pending",
        },
      },
    );

    return NextResponse.json(
      { message: "Reply sent", message },
      { status: 201 },
    );
  } catch (err) {
    console.log("POST TICKET MESSAGE ERROR =>", err);

    return NextResponse.json(
      { message: err?.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

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

    const ticket = await TicketModel.findOne(query);

    if (!ticket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 },
      );
    }

    const messages = await TicketMessageModel.find({ ticket: ticketId }).sort({
      createdAt: 1,
    });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (err) {
    console.log("GET TICKET MESSAGES ERROR =>", err);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
