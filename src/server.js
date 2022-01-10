
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
// unlencoded >> middleware 실행전에!
app.use(express.urlencoded({extended: true}));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    // store 부분을 생성하지 않으면 세션 정보는 서버의 메모리에 저장되서, 서버가 재시작할때마다 메모리 정보가 지워짐
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL
    })
  })
);
// localMiddleware는 sessionMiddleware 다음에!
app.use(localsMiddleware);
app.use('uploads', express.static('uploads'));
app.use('/', rootRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

export default app;