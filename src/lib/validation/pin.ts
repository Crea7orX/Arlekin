import z from "zod";

export const pinCreateSchema = z.object({
  title: z.string().min(1).max(100),
  url: z
    .string()
    .url()
    .refine(
      (url) =>
        !!/(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/.exec(
          url,
        ),
      "Invalid YouTube video URL",
    ),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export type PinCreate = z.infer<typeof pinCreateSchema>;

export const pinResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  latitude: z.number(),
  longitude: z.number(),
  userId: z.string(),
  userName: z.string(),
  createdAt: z.number(),
});

export type PinResponse = z.infer<typeof pinResponseSchema>;
