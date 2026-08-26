import { Property } from "../Models/propertyModel.js";
import { Booking } from "../Models/bookingModel.js";

// createOrder: Booking any Property

const createOrder = async (req, res) => {
    const { price, propertyId, fromDate, toDate, guests } = req.body;

    // orderId = order_1234567

    const orderId = "order_" + Date.now();
    res.json({
        success: true,
        message: "Order created Successfully",
        orderId,
        price,
        propertyId,
        fromDate,
        toDate,
        guests
    })
}

// verifyPayment , 1. save the booking and
//  2. block the dates eg. 25, 26.

const verifyPayment = async (req, res) => {

    const { orderId, bookingDetails, forceStatus } = req.body;

    if (forceStatus === "success") {
        const paymentId = "pay_" + Date.now();

        //save Booking

        const newBooking = await Booking.create({
            user: req.user._id,
            property: bookingDetails.propertyId,
            price: bookingDetails.price,
            fromDate: bookingDetails.fromDate,
            toDate: bookingDetails.toDate,
            guests: bookingDetails.guests,
            numberOfnights: bookingDetails.numberOfnights,
            paid: true
        });

        // tell property those dates are taken

        const updatedProperty = await Property.findByIdAndUpdate(

            bookingDetails.propertyId, {

            $push: {
                currentBookings: {
                    bookingId: newBooking._id,
                    fromDate: bookingDetails.fromDate,
                    toDate: bookingDetails.toDate,
                    userId: req.user._id
                }
            }
        },
            { new: true }

        );

        res.json({
            success: true,
            message: "Payment Successful, booking confirmed!! ",
            paymentId,
            orderId,
            booking: newBooking
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Payment failed!",
            orderId
        })
    }
}

// get my Bookings

const getUserBookings = async (req, res) => {
    try {

        const bookings = await Booking.find({ user: req.user._id });

        res.status(200).json({
            status: "success",
            data: {
                bookings
            }
        })

    } catch (error) {

        res.status(401).json({
            status: "failed",
            message: error.message
        })

    }
}

//get one booking details
//  /:id
const getBookingDetails = async (req, res) => {

    try {

        const bookings = await Booking.findById(req.params.bookingId);

        res.status(200).json({
            status: "success",
            data: {
                bookings
            }
        })

    } catch (error) {

        res.status(401).json({
            status: "failed",
            message: error.message
        })

    }
}

export { getBookingDetails, getUserBookings, createOrder, verifyPayment }