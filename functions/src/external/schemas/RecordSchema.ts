import { z } from 'zod';

export const recordSchema = {
  body: z.object({
    name: z.string().min(3).max(150)
  }),
  params: z.object({
    id: z.string().base64()
  })
};
