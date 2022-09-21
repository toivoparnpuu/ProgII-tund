import express, { Request, Response, Express } from 'express';

const app: Express = express();
const port: number = 3000;
const users = [
    {
        firstName:"Juhan",
        lastName: "Juurikas",
        email: "juhan@juurikas.ee",
        password: "juhan"
    }
]


app.get('/api/v1/healt', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello world!',
  });
});

app.get('/api/v1/users', (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "list of users",
      users,
    });
  });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});