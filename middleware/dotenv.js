import * as dotenv from 'dotenv'

export default (() => {
    if(process.env.NODE_ENV !== 'production'){
        const result = dotenv.config();
        if (result.error) {
            throw result.error
        }
    
        return result.parsed;
    }
})()
