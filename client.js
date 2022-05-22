
const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./news.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;

const client = new NewsService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

  
client.getAllNews({}, (error, news) => {
   
      console.log(news);
});

client.addNews(
{
    id: 3,
    title: "Title news 3",
    body: "Body content 3",
    postImage: "Image URL here",
},
(error, news) => { 
    if(error) throw error;
    console.log(news);
    console.log("Sucessfully created a news.");
}
);

client.editNews(
    {
        id: 2,
        body: "Body content 2 edited",
        postImage: "Image Url edited",
        title: "Title for 2 edited",
    },
    (error, news) => {
        if(error) throw error;
        console.log(news);
        console.log("Successfully edited a news.");
    }
);
client.getNews(
    {
        id: 1,
    },
    (error, news) => {
        if(error) throw error;
        console.log(news);
        console.log("Successfully get a news.");
    }
);

client.deleteNews(
    {
        id: 1,
    },
    (error, news) => {
        if(error) throw error;
        console.log("Successfully delete a news.");
    }
);



client.getAllNews({}, (error, news) => {
   
    console.log(news);
});