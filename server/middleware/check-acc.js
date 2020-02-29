import jwt from "jsonwebtoken";
export const checkacc = (req , resp , next) => {
    try {
        const decoded = jwt.verify(req.headers.token , process.env.JWT_KEY)
        if(decoded){
            next();
        }
    } catch (error) {
        resp.status(401).send({
            status : 401,
            error : 'authentication failed'
        })
    }
}
