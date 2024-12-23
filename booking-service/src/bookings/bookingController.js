import bookingService from "./bookingService.js";

export const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;

        const booking = await bookingService.createBooking(bookingData);

        res.status(201).json({
            message: "Booking successfully created",
            booking,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export const getBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const booking = await bookingService.getBookingById(bookingId);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const bookingData = req.body;

        const updatedBooking = await bookingService.updateBooking(bookingId, bookingData);

        if (!updatedBooking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        res.status(200).json({
            message: "Booking successfully updated",
            booking: updatedBooking,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const deletedBooking = await bookingService.deleteBooking(bookingId);

        if (!deletedBooking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        res.status(200).json({
            message: "Booking successfully deleted",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};