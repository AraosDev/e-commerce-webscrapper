import { Socket } from "socket.io";
import { CatchError } from "../@types/Utils/socketErrorHandler";

const catchWebSocketAsync = (func: Function, websocket: Socket) => {
    const handleError = (err: CatchError) => {
        const error = {
            status: err.status || 500,
            message: err.message || 'UNKNOWN_ERROR',
            stack: err.stack || 'UNKNOWN_STACK',
            errors: err
        };
        console.error(error)
        websocket.send({
            status: error.status,
            message: error.message,
            stack: error.stack,
            errors: error.errors
        });
    }
    return (...args: unknown[]) => {
        try {
            const ret = func.apply(this, args);
            if (ret && typeof ret.catch === 'function') ret.catch(handleError)
        } catch (e) {
            handleError(e as Error);
        }
    }
}

export default catchWebSocketAsync;