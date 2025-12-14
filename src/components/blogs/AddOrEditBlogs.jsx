"use client";

import { config } from "@/config/config";
import {
  useAddBlogMutation,
  useUpdateBlogMutation,
} from "@/redux/features/blogs";
import { useGetCategoriesQuery } from "@/redux/features/jobs";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import TiptapEditor from "../TiptapEditor";
import SelectKeyword from "./SelectKeyword";

const schema = yup.object().shape({
  title: yup
    .string()
    .max(150, "Title must be less than 150 character")
    .required("Title is required"),
  short_description: yup
    .string()
    .max(255, "Short description must be less than 255 character")
    .required("Short description is required"),
  content: yup
    .string()
    .required("Content is required")
    .test(
      "not-empty-html",
      "Content cannot be empty",
      (value) => value && value.trim() !== "<p></p>"
    ),
  thumbnail_image: yup
    .mixed()
    .required("Image is required")
    .test(
      "not-empty-string",
      "Image is required",
      (value) => value !== "" && value !== null && value !== undefined
    ),
  keywords: yup
    .array()
    .of(yup.string())
    .min(1, "At least one keyword is required"),
  job_category_id: yup.string().required("Job category is required"),
});

function AddOrEditBlogs({ data }) {
  const [addBlog, { isLoading: isAdding }] = useAddBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const { data: categories } = useGetCategoriesQuery();
  const navigation = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: data?.title || "",
      job_category_id: data?.job_category_id || "",
      short_description: data?.short_description || "",
      content: data?.content || "",
      thumbnail_image: data?.thumbnail_image || "",
      keywords: data?.keywords || [],
      tag_line: "",
    },
  });

  const thumbnailImage = watch("thumbnail_image");
  const selectedKeywords = watch("keywords");
  const jobCategory = watch("job_category_id");

  async function onSubmit(payload) {
    try {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (key === "keywords") {
          value.map((keyword) => formData.append("keywords[]", keyword));
        } else if (key === "thumbnail_image" && typeof value !== "string") {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value);
        }
      });

      if (data) {
        await updateBlog({ id: data.id, data: formData }).unwrap();
        toast.success("Blog updated successfully");
      } else {
        await addBlog(formData).unwrap();
        toast.success("Blog added successfully");
      }
      navigation.push("/content/blogs");
    } catch (error) {
      toast.error(
        error.message || error?.data?.message || "Internal Server Error"
      );
    }
  }

  return (
    <Card>
      <CardHeader title={data ? "Update The blog" : "Add New Blog Post"} />
      <Divider />
      <CardContent>
        <Stack spacing={1} component="form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Typography>Blog title</Typography>
            <OutlinedInput
              fullWidth
              placeholder="Enter title"
              {...register("title")}
              error={errors.title}
            />
            <FormHelperText error>{errors.title?.message}</FormHelperText>
          </div>

          <div>
            <Typography>Job category</Typography>
            <Select
              error={errors.job_category_id}
              value={jobCategory}
              onChange={(e) =>
                setValue("job_category_id", e.target.value, {
                  shouldValidate: true,
                })
              }
              fullWidth
              input={<OutlinedInput placeholder="Select Category" />}
              displayEmpty
              label=""
            >
              <MenuItem value="" disabled>
                Select category
              </MenuItem>
              {categories?.data?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>
              {errors.job_category_id?.message}
            </FormHelperText>
          </div>

          <div>
            <Typography>Short description</Typography>
            <OutlinedInput
              fullWidth
              multiline
              rows={4}
              placeholder="Enter short description"
              {...register("short_description")}
              error={errors.short_description}
            />
            <FormHelperText error>
              {errors.short_description?.message}
            </FormHelperText>
          </div>
          <div>
            <Typography>Content</Typography>
            <Controller
              name="content"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TiptapEditor
                  content={field.value}
                  onchange={(val) => field.onChange(val)}
                  error={errors.content}
                />
              )}
            />
            <FormHelperText error>{errors.content?.message}</FormHelperText>
          </div>

          <div>
            <Typography>Thumbnail image</Typography>
            <OutlinedInput
              type="file"
              inputProps={{ accept: "image/jpeg, image/png" }}
              {...register("thumbnail_image")}
              error={errors.thumbnail_image}
            />
            <FormHelperText error>
              {errors.thumbnail_image?.message}
            </FormHelperText>

            {thumbnailImage && (
              <Image
                src={
                  typeof thumbnailImage === "string"
                    ? config.fileBaseUrl + thumbnailImage
                    : URL.createObjectURL(thumbnailImage[0])
                }
                alt="thumbnail"
                width={600}
                height={200}
                style={{
                  maxWidth: 600,
                  width: "100%",
                  marginTop: 5,
                  borderRadius: 5,
                  objectFit: "contain",
                }}
              />
            )}
          </div>

          <SelectKeyword
            error={errors.keywords}
            selectedKeywords={selectedKeywords}
            setValue={setValue}
          />

          <Stack alignItems="flex-start">
            <Button
              loading={isAdding || isUpdating}
              type="submit"
              sx={{ mt: 2 }}
              variant="contained"
            >
              Save Blog
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AddOrEditBlogs;
