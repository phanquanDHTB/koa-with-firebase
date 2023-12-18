const listStatusErr = [400, 401, 403, 404, 409, 498, 500];

const baseResponse = (ctx, status, data, message) => {
    status = status || 200;
    data = data || "";
    message = message || "";
    ctx.status = status;
    if (listStatusErr.includes(status)) {
        ctx.body = {
            success: false,
            error: message,
        };
    }
    ctx.body = {
        data: data,
        message: message,
    };
};

const success = ({ ctx, content, message = "OK" }) => {
    return baseResponse(ctx, 200, content, message);
};

const created = ({ ctx, content, message = "OK" }) => {
    return baseResponse(ctx, 201, content, message);
};

const notFound = ({ ctx, content, message = "Not found" }) => {
    return baseResponse(ctx, 404, content, message);
};

const invalidData = ({ ctx, content, message = "Invalid data" }) => {
    return baseResponse(ctx, 400, content, message);
};

const serverInternal = ({ ctx, content, message = "Server internal error" }) => {
    return baseResponse(ctx, 500, content, message);
};

const conflict = ({ ctx, content, message = "Conflict" }) => {
    return baseResponse(ctx, 409, content, message);
};

const forbidden = ({ ctx, content, message = "Forbidden" }) => {
    return baseResponse(ctx, 403, content, message);
};

const unauthorized = ({ ctx, content, message = "Unauthorized" }) => {
    return baseResponse(ctx, 401, content, message);
};

const invalidToken = ({ ctx, content, message = "Invalid Token" }) => {
    return baseResponse(ctx, 498, content, message);
};

export { success, notFound, invalidData, serverInternal, conflict, forbidden, unauthorized, invalidToken, created };
