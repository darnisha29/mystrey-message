import mongoose from 'mongoose';
import 'dotenv/config';

type connectionObject = {
    isConnected? :number,
}

const connection: connectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("already connected to database ");
        return;
    }

    try{
       const db =  await mongoose.connect('mongodb+srv://darnisha2910:910DP%40291@cluster0.nbufvf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' || '',{})
       connection.isConnected = db.connections[0].readyState

       console.log("db connected successfully!!")
    }catch (err) {
        console.log("database connection failed",err);
        process.exit(1);
    }
}
export default dbConnect;


