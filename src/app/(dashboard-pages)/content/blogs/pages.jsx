"use client";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "@/redux/features/blogs";
import { Add, Delete, EditSquare } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Page() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetBlogsQuery({ page });
  const [isDeleting, setIsDeleting] = useState(-1);
  const [deleteBlog] = useDeleteBlogMutation();

  async function handleDelete(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirm) return;

    setIsDeleting(id);
    try {
      await deleteBlog(id).unwrap();
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error(
        error.data?.message || error.message || "Internal server error"
      );
    } finally {
      setIsDeleting(-1);
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Blogs</Typography>

      <Card>
        <CardContent component={Stack} spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Blog Management</Typography>
            <Link href="/content/blogs/add">
              <Button variant="contained">
                <Add fontSize="small" /> Add Blog
              </Button>
            </Link>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell align="center" colSpan={5}>
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.data?.data?.length ? (
                  data?.data?.data?.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell align="left">{blog.title}</TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {blog.short_description}
                      </TableCell>
                      <TableCell>
                        <Chip label={blog.job_category.category_name} />
                      </TableCell>
                      <TableCell>
                        {new Date(blog.published_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <Link href={`/content/blogs/update/${blog.id}`}>
                            <Button
                              size="small"
                              color="info"
                              startIcon={<EditSquare fontSize="small" />}
                              variant="contained"
                            >
                              Edit
                            </Button>
                          </Link>
                          <Button
                            size="small"
                            startIcon={<Delete fontSize="small" />}
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(blog.id)}
                            loading={isDeleting === blog.id}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={5}>
                      No blogs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack alignItems="flex-end">
            <Pagination
              count={data?.data?.last_page}
              page={page}
              onChange={(_e, page) => setPage(page)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default Page;
