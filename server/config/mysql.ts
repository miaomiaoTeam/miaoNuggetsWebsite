export default {
  host: process.env.MYSQL_HOST!,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER!,
  password: process.env.MYSQL_PASSWORD!,
  database: 'miaoNuggetsWebsiteDataBase',
}
