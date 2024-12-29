import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateServiceToken = () => {
    const token = jwt.sign(
        { service: process.env.TRUSTED_SERVICE_NAME }, // Add the service claim
        process.env.JWT_SECRET, // Use the shared secret key
        { expiresIn: "1h" } // Set an expiration time
    );
    return token;
}

export default { generateServiceToken };
