const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const yup = require("yup");

// Yup validation schema
const userValidationSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must not exceed 50 characters")
        .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    
    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email address")
        .max(100, "Email must not exceed 100 characters"),
    
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must not exceed 100 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    
    role: yup
        .string()
        .oneOf(["student", "teacher", "admin"], "Role must be student, teacher, or admin")
        .default("student")
});

// Validation function
const validateUser = async (userData) => {
    try {
        const validatedData = await userValidationSchema.validate(userData, {
            abortEarly: false,
            stripUnknown: true
        });
        return { isValid: true, data: validatedData, errors: null };
    } catch (error) {
        const errors = {};
        error.inner.forEach((err) => {
            errors[err.path] = err.message;
        });
        return { isValid: false, data: null, errors };
    }
};


const userModel = mongoose.model("User", userSchema);
module.exports = { userModel, validateUser, userValidationSchema };