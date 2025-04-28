/** @type {import("drizzle-kit").Config } */
export default{
  schema: "./utils/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_rWsRz1Lqh8mg@ep-square-base-a59y0opl.us-east-2.aws.neon.tech/Ai-Content-Generator?sslmode=require',
  }
};
