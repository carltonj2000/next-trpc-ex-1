export const encode = (data: string) => {
  return Buffer.from(data, "utf-8").toString("base64url");
};

export const decode = (data: string) => {
  return Buffer.from(data, "base64url").toString("utf-8");
};
