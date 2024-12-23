import axios from "axios";
import Booking from "./models/bookingModel.js";
import dotenv from "dotenv";
import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

dotenv.config();

const sqsClient = new SQSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const queueUrl = 'https://sqs.eu-north-1.amazonaws.com/340752822947/seat-booking-queue';

async function getScheduleById(scheduleId) {
    try {
        const response = await axios.get(
            `http://localhost:5000/schedule/${scheduleId}`,
        );
        return response;
    } catch (error) {
        throw new Error("Error fetching scheduleId: " + error.message);
    }
}

async function getBusById(busId) {
    console.log("busId", busId);
    try {
        const response = await axios.get(
            `http://localhost:5000/bus/${busId}`,
        );
        return response;
    } catch (error) {
        throw new Error("Error fetching scheduleId: " + error.message);
    }
}

export const createBooking = async (data) => {
    const { name, contact, NIC, scheduleId, seatsBooked } = data;

    const schedule = await getScheduleById(scheduleId);
    const fetchedScheduleId = schedule.data.scheduleId;
    const scheduledDateTime = schedule.data.startTime;

    const busDetails = await getBusById(schedule.data.busId);
    const seatCapacity = busDetails.data.seatCount;

    // Check if there are existing bookings for the same bus and date
    const existingBookings = await Booking.findAll({
        where: {
            scheduleId: fetchedScheduleId,
            dateBooked: scheduledDateTime,
        },
    });

    // Calculate the total seats booked for the bus on this date
    const totalBookedSeats = existingBookings.reduce((sum, booking) => sum + booking.seatsBooked, 0);

    // Check if the total seats booked + new booking exceeds bus capacity
    const totalSeatsAvailable = seatCapacity - totalBookedSeats;
    if (seatsBooked > totalSeatsAvailable) {
        throw new Error(`Not enough seats available. Only ${totalSeatsAvailable} seats left.`);
    }

    // Send a message to SQS to reserve the seats
    const params = {
        MessageBody: JSON.stringify({
            name,
            contact,
            NIC,
            scheduleId,
            seatsBooked,
            scheduledDateTime,
        }),
        QueueUrl: queueUrl,
    };

    await sqsClient.send(new SendMessageCommand(params));

    return { message: 'Booking request sent. Please wait for confirmation.' };
};

const processBooking = async () => {
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 20,
    };

    const data = await sqsClient.send(new ReceiveMessageCommand(params));
    if (!data.Messages) {
        console.log('No messages to process');
        return;
    }

    for (const message of data.Messages) {
        const bookingData = JSON.parse(message.Body);
        console.log('Processing booking:', bookingData);

        // Create a new booking record
        const booking = await Booking.create({
            name: bookingData.name,
            contact: bookingData.contact,
            NIC: bookingData.NIC,
            scheduleId: bookingData.scheduleId,
            seatsBooked: bookingData.seatsBooked,
            dateBooked: bookingData.scheduledDateTime,
        });

        console.log(`Booking created: ${booking.bookingId}`);

        // Delete the message from the queue
        const deleteParams = {
            QueueUrl: queueUrl,
            ReceiptHandle: message.ReceiptHandle,
        };
        await sqsClient.send(new DeleteMessageCommand(deleteParams));
    }
};

// Run the booking processor in a loop
setInterval(processBooking, 30000);

const getBookingById = async (bookingId) => {
    return await Booking.findById(bookingId);
};

const updateBooking = async (bookingId, bookingData) => {
    return await Booking.findByIdAndUpdate(bookingId, bookingData, { new: true });
};

const deleteBooking = async (bookingId) => {
    return await Booking.findByIdAndDelete(bookingId);
};

export default { createBooking, getBookingById, updateBooking, deleteBooking };