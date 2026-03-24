const {Schema,model}=require('mongoose')


const book_schema=new Schema({
      title:{
        type:String,
        required:true
      },

      author:{
        type:String,
        required:true
      },
      genre:{
        type:String
      },
      publishedYear:{
        type:Date,
        required:true
      },

     pages:{
        type:Number
     },
     rating:{
        type:Number
     }

      
})

module.exports=model('Book',book_schema)

