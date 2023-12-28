import { z } from "zod";

export const looseOptional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (value: unknown) =>
      value === null || (typeof value === "string" && value === "")
        ? undefined
        : value,
    schema.optional()
  );
