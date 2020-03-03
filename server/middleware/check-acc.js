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
export const verifyStaff = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.token , process.env.JWT_KEY)
        if (decoded.acc_type == 'staff' || decoded.acc_type == 'admin') {
        next();
        } else {
            res.status(401).send({
                status : 401,
                error : 'authentication failed'
            })
        }
    } catch {
        res.status(401).send({
            status : 401,
            error : 'authentication failed'
        })
    }
}
export const verifyAdmin = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.token , process.env.JWT_KEY)
        if (decoded.acc_type == 'admin') {
        next();
        } else {
            res.status(401).send({
                status : 401,
                error : 'authentication failed'
            })  
        }
    } catch {
        res.status(401).send({
            status : 401,
            error : 'authentication failed'
        })
    }
}
