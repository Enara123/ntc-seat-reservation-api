import { User, Role } from "../models/index.js";

export const checkRole = (...roles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id; // Access user ID from decoded token
      const user = await User.findByPk(userId, {
        include: Role, // Include roles associated with the user
      });

      // Check if the user has at least one of the required roles
      const userRoles = user.Roles.map((role) => role.name);
      const hasRole = roles.some((role) => userRoles.includes(role));

      if (!hasRole) {
        return res.status(403).json({ error: "Forbidden. You do not have the required role." });
      }

      next(); // User has the role, proceed to the next route handler
    } catch (error) {
      res.status(500).json({ error: "Error checking user roles" });
    }
  };
};
