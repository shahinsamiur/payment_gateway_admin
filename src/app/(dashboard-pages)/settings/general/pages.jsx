"use client";

import LoadingIndicator from "@/components/common/LoadingIndicator";
import Switch from "@/components/common/Switch";
import { config } from "@/config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  useGetGenarelSettingQuery,
  useUpdateSettingsMutation,
} from "../../../../redux/features/ganeral";

const schema = yup.object().shape({
  site_name: yup.string().required("Site name is required"),
  site_email: yup.string().email("Invalid email").required("Email is required"),
  site_address: yup.string().required("Address is required"),
  site_logo_light: yup.mixed().nullable(),
  site_logo_dark: yup.mixed().nullable(),
  site_favicon: yup.mixed().nullable(),
  site_description: yup.string().required("Description is required"),
  site_maintenance_mode: yup.boolean(),
  site_maintenance_message: yup.string(),
  referral_enabled: yup.boolean(),
  referral_program_description: yup.string(),
  social_links: yup.object(),
  site_phone: yup.object(),
  mail_mailer: yup.string(),
  mail_host: yup.string(),
  mail_port: yup.string(),
  mail_username: yup.string(),
  mail_password: yup.string(),
  mail_encryption: yup.string(),
  mail_from_address: yup.string(),
  mail_from_name: yup.string(),
});

export default function SettingsPage() {
  const { data, isLoading } = useGetGenarelSettingQuery();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  const {
    control,
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      site_name: "",
      site_email: "",
      site_address: "",
      site_logo_light: null,
      site_logo_dark: null,
      site_favicon: null,
      site_description: "",
      site_maintenance_mode: false,
      site_maintenance_message: "",
      referral_enabled: false,
      referral_program_description: "",
      social_links: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
      },
      site_phone: {
        cell: "",
        whatsapp: "",
        telegram: "",
      },
      mail_mailer: "",
      mail_host: "",
      mail_port: "",
      mail_username: "",
      mail_password: "",
      mail_encryption: "",
      mail_from_address: "",
      mail_from_name: "",
      job_minimum_worker: 0,
      job_minimum_estimated_day: 0,
      job_maximum_estimated_day: 0,
    },
  });

  const siteLogoLight = watch("site_logo_light");
  const siteLogoDark = watch("site_logo_dark");
  const siteFavicon = watch("site_favicon");

  useEffect(() => {
    if (data) {
      reset({
        site_name: data.site_name || "",
        site_email: data.site_email || "",
        site_address: data.site_address || "",
        site_description: data.site_description || "",
        site_maintenance_mode: data.site_maintenance_mode,
        site_maintenance_message: data.site_maintenance_message || "",
        referral_enabled: data.referral_enabled || false,
        referral_program_description: data.referral_program_description || "",
        social_links: {
          facebook: data.social_links.facebook || "",
          twitter: data.social_links.twitter || "",
          instagram: data.social_links.instagram || "",
          linkedin: data.social_links.linkedin || "",
        },
        site_phone: {
          cell: data.site_phone.cell || "",
          whatsapp: data.site_phone.whatsapp || "",
          telegram: data.site_phone.telegram || "",
        },
        site_logo_light: data.site_logo_light || null,
        site_logo_dark: data.site_logo_dark || null,
        site_favicon: data.site_favicon || null,
        mail_mailer: data.mail_mailer || "",
        mail_host: data.mail_host || "",
        mail_port: data.mail_port || "",
        mail_username: data.mail_username || "",
        mail_password: data.mail_password || "",
        mail_encryption: data.mail_encryption || "",
        mail_from_address: data.mail_from_address || "",
        mail_from_name: data.mail_from_name || "",
        job_minimum_worker: data.job_minimum_worker || 0,
        job_minimum_estimated_day: data.job_minimum_estimated_day || 0,
        job_maximum_estimated_day: data.job_maximum_estimated_day || 0,
      });
    }
  }, [data, reset]);

  const onSubmit = async (payload) => {
    try {
      payload.site_maintenance_mode = payload.site_maintenance_mode ? 1 : 0;
      payload.referral_enabled = payload.referral_enabled ? 1 : 0;

      const formData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        if (value instanceof FileList) {
          formData.append(key, value[0]);
        } else if (typeof value === "object") {
          Object.entries(value).forEach(([childkey, childvalue]) => {
            if (childvalue) {
              formData.append(`${key}[${childkey}]`, childvalue);
            }
          });
        } else {
          formData.append(key, value);
        }
      });

      await updateSettings(formData).unwrap();
      toast.success("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Something went wrong.");
    }
  };

  if (isLoading) return <LoadingIndicator />;

  return (
    <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Site setting</Typography>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </Stack>

      {/* General Information */}
      <Card>
        <CardHeader title="General Information" />
        <Divider />
        <CardContent>
          <Stack spacing={2.5}>
            <Stack direction="row" gap={2} flexWrap="wrap">
              <div style={{ flexGrow: 1 }}>
                <Typography variant="body1">Site Name</Typography>
                <OutlinedInput
                  error={errors.site_name}
                  placeholder="Site Name"
                  fullWidth
                  {...register("site_name")}
                />
                <Typography variant="body1" color="error">
                  {errors.site_name?.message}
                </Typography>
              </div>
              <div style={{ flexGrow: 1 }}>
                <Typography variant="body1">Site Name</Typography>
                <OutlinedInput
                  error={errors.site_email}
                  placeholder="Site Email"
                  fullWidth
                  {...register("site_email")}
                />
                <Typography variant="body1" color="error">
                  {errors.site_email?.message}
                </Typography>
              </div>
            </Stack>

            <Stack direction="row" gap={2} flexWrap="wrap">
              <div style={{ flexGrow: 1 }}>
                <Typography variant="body1">Site Phone</Typography>
                <OutlinedInput
                  placeholder="Site Phone"
                  fullWidth
                  {...register("site_phone.cell")}
                  error={errors.site_phone?.cell}
                />
                <Typography variant="body1" color="error">
                  {errors.site_phone?.cell?.message}
                </Typography>
              </div>
              <div style={{ flexGrow: 1 }}>
                <Typography variant="body1">WhatsApp</Typography>
                <OutlinedInput
                  placeholder="WhatsApp Number"
                  fullWidth
                  {...register("site_phone.whatsapp")}
                  error={errors.site_phone?.whatsapp}
                />
                <Typography variant="body1" color="error">
                  {errors.site_phone?.whatsapp?.message}
                </Typography>
              </div>
              <div style={{ flexGrow: 1 }}>
                <Typography variant="body1">Telegram</Typography>
                <OutlinedInput
                  placeholder="Telegram Number"
                  fullWidth
                  {...register("site_phone.telegram")}
                  error={errors.telegram?.cell}
                />
                <Typography variant="body1" color="error">
                  {errors.site_phone?.telegram?.message}
                </Typography>
              </div>
            </Stack>

            <div>
              <Typography variant="body1">Site Address</Typography>
              <OutlinedInput
                placeholder="Site Address"
                {...register("site_address")}
                fullWidth
                multiline
                rows={3}
                error={errors.site_address}
              />
              <Typography variant="body1" color="error">
                {errors.site_address?.message}
              </Typography>
            </div>
            <div>
              <Typography variant="body1">Site Description</Typography>
              <OutlinedInput
                placeholder="Site Description"
                {...register("site_description")}
                fullWidth
                multiline
                rows={4}
                error={errors.site_description}
              />
              <Typography variant="body1" color="error">
                {errors.site_description?.message}
              </Typography>
            </div>
          </Stack>
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card>
        <CardHeader title="Social Media" />
        <Divider />
        <CardContent component={Stack} direction="row" flexWrap="wrap" gap={2}>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="body1">Facebook</Typography>
            <OutlinedInput
              placeholder="Facebook URL"
              {...register("social_links.facebook")}
              fullWidth
              error={errors.social_links?.facebook}
            />
            <Typography variant="body1" color="error">
              {errors.social_links?.facebook?.message}
            </Typography>
          </div>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="body1">LinkedIn</Typography>
            <OutlinedInput
              placeholder="LinkedIn URL"
              {...register("social_links.linkedin")}
              fullWidth
              error={errors.social_links?.linkedin}
            />
            <Typography variant="body1" color="error">
              {errors.social_links?.linkedin?.message}
            </Typography>
          </div>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="body1">Twitter</Typography>
            <OutlinedInput
              placeholder="Twitter URL"
              {...register("social_links.twitter")}
              fullWidth
              error={errors.social_links?.twitter}
            />
            <Typography variant="body1" color="error">
              {errors.social_links?.twitter?.message}
            </Typography>
          </div>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="body1">Instagram</Typography>
            <OutlinedInput
              placeholder="Instagram URL"
              {...register("social_links.instagram")}
              fullWidth
              error={errors.social_links?.instagram}
            />
            <Typography variant="body1" color="error">
              {errors.social_links?.instagram?.message}
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Appearance" />
        <Divider />
        <CardContent component={Stack} gap={2}>
          <Stack
            direction="row"
            gap={1}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "start",
              alignItems: "start",
            }}
            alignItems="center"
          >
            <div>
              <Typography variant="body1">Site Logo (Light Mode)</Typography>
              <OutlinedInput
                type="file"
                {...register("site_logo_light")}
                error={errors.site_logo_light}
              />
              <Typography variant="body1" color="error">
                {errors.site_logo_light?.message}
              </Typography>
            </div>
            <Avatar
              variant="square"
              src={
                siteLogoLight instanceof FileList && siteLogoLight.length > 0
                  ? URL.createObjectURL(siteLogoLight[0])
                  : siteLogoLight
                  ? config.fileBaseUrl + siteLogoLight
                  : ""
              }
              alt="Site Logo"
              sx={{ width: 200, height: 50, objectFit: "contain" }}
            />
          </Stack>
          <Stack
            direction="row"
            gap={1}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "start",
              alignItems: "start",
            }}
            alignItems="center"
          >
            <div>
              <Typography variant="body1">Site Logo (Dark Mode)</Typography>
              <OutlinedInput
                type="file"
                {...register("site_logo_dark")}
                error={errors.site_logo_dark}
              />
              <Typography variant="body1" color="error">
                {errors.site_logo_dark?.message}
              </Typography>
            </div>
            <Avatar
              variant="square"
              src={
                siteLogoDark instanceof FileList && siteLogoDark.length > 0
                  ? URL.createObjectURL(siteLogoDark[0])
                  : siteLogoDark
                  ? config.fileBaseUrl + siteLogoDark
                  : ""
              }
              alt="Site Logo"
              sx={{ width: 200, height: 50, objectFit: "contain" }}
            />
          </Stack>
          <Stack
            direction="row"
            gap={1}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "start",
              alignItems: "start",
            }}
            alignItems="center"
          >
            <div>
              <Typography variant="body1">Site Favicon</Typography>
              <OutlinedInput
                type="file"
                {...register("site_favicon")}
                error={errors.site_favicon}
              />
              <Typography variant="body1" color="error">
                {errors.site_favicon?.message}
              </Typography>
            </div>
            <Avatar
              variant="square"
              src={
                siteFavicon instanceof FileList && siteFavicon.length > 0
                  ? URL.createObjectURL(siteFavicon[0])
                  : siteFavicon
                  ? config.fileBaseUrl + siteFavicon
                  : ""
              }
              alt="Site Logo"
              sx={{ width: 50, height: 50, objectFit: "contain" }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Job Configaration */}
      <Card>
        <CardHeader title="Job Configuration" />
        <Divider />
        <CardContent component={Stack} gap={2}>
          <div>
            <Typography variant="body1">
              Job Application Minimum Worker
            </Typography>
            <OutlinedInput
              fullWidth
              {...register("job_minimum_worker")}
              placeholder="Enter job minimum worker"
              error={errors.job_minimum_worker}
            />
            <Typography variant="body1" color="error">
              {errors.job_minimum_worker?.message}
            </Typography>
          </div>
          <div>
            <Typography variant="body1">
              Job Application Minimum Estimated Day
            </Typography>
            <OutlinedInput
              fullWidth
              {...register("job_minimum_estimated_day")}
              placeholder="Enter job minimum estimated day"
              error={errors.job_minimum_estimated_day}
            />
            <Typography variant="body1" color="error">
              {errors.job_minimum_estimated_day?.message}
            </Typography>
          </div>
          <div>
            <Typography variant="body1">
              Job Application Maximum Estimated Day
            </Typography>
            <OutlinedInput
              fullWidth
              {...register("job_maximum_estimated_day")}
              placeholder="Enter job maximum estimated day"
              error={errors.job_maximum_estimated_day}
            />
            <Typography variant="body1" color="error">
              {errors.job_maximum_estimated_day?.message}
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Email configation */}
      <Card>
        <CardHeader title="Email Configuration" />
        <Divider />
        <CardContent component={Stack} gap={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
          >
            <div style={{ flexGrow: 1 }}>
              <Typography variant="body1">Mail Mailer</Typography>
              <OutlinedInput
                type="text"
                {...register("mail_mailer")}
                placeholder="Enter mail mailer"
                fullWidth
                error={errors.mail_mailer}
              />
              <FormHelperText error={errors.mail_mailer}>
                {errors.mail_mailer?.message}
              </FormHelperText>
            </div>
            <div style={{ flexGrow: 1 }}>
              <Typography variant="body1">Mail Host</Typography>
              <OutlinedInput
                fullWidth
                {...register("mail_host")}
                placeholder="Enter mail host"
                error={errors.mail_host}
              />
              <FormHelperText error={errors.mail_host}>
                {errors.mail_host?.message}
              </FormHelperText>
            </div>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
          >
            <div style={{ flexGrow: 1 }}>
              <Typography variant="body1">Mail Port</Typography>
              <OutlinedInput
                type="text"
                {...register("mail_port")}
                placeholder="Enter mail port"
                fullWidth
                error={errors.mail_port}
              />
              <FormHelperText error={errors.mail_port}>
                {errors.mail_port?.message}
              </FormHelperText>
            </div>
            <div style={{ flexGrow: 1 }}>
              <Typography variant="body1">Email username</Typography>
              <OutlinedInput
                fullWidth
                {...register("mail_username")}
                placeholder="Enter mail username"
                error={errors.mail_username}
              />
              <FormHelperText error={errors.mail_username}>
                {errors.mail_username?.message}
              </FormHelperText>
            </div>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
          >
            <div style={{ flexGrow: 1 }}>
              <Typography variant="body1">Mail password</Typography>
              <OutlinedInput
                type="text"
                {...register("mail_password")}
                placeholder="Enter mail password"
                fullWidth
                error={errors.mail_password}
              />
              <FormHelperText error={errors.mail_password}>
                {errors.mail_password?.message}
              </FormHelperText>
            </div>
            <div style={{ flexGrow: 1 }}>
              <Typography variant="body1">Mail encryption</Typography>
              <OutlinedInput
                fullWidth
                {...register("mail_encryption")}
                placeholder="Enter mail enncryption"
                error={errors.mail_encryption}
              />
              <FormHelperText error={errors.mail_encryption}>
                {errors.mail_encryption?.message}
              </FormHelperText>
            </div>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
          >
            <div style={{ flexGrow: 1 }}>
              <Typography variant="body1">Mail from address</Typography>
              <OutlinedInput
                type="text"
                {...register("mail_from_address")}
                placeholder="Enter mail from address"
                fullWidth
                error={errors.mail_from_address}
              />
              <FormHelperText error={errors.mail_from_address}>
                {errors.mail_from_address?.message}
              </FormHelperText>
            </div>
            <div style={{ flexGrow: 1 }}>
              <Typography variant="body1">Mail from name</Typography>
              <OutlinedInput
                fullWidth
                {...register("mail_from_name")}
                placeholder="Enter mail from name"
                error={errors.mail_from_name}
              />
              <FormHelperText error={errors.mail_from_name}>
                {errors.mail_from_name?.message}
              </FormHelperText>
            </div>
          </Stack>
        </CardContent>
      </Card>

      {/* System settings */}
      <Card sx={{ mb: 3 }}>
        <CardHeader title="System Settings" />
        <Divider />
        <CardContent component={Stack} gap={2}>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            style={{ flexGrow: 1 }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <Controller
              name="site_maintenance_mode"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!value}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  }
                  label="Maintenance Mode"
                  sx={{ whiteSpace: "nowrap" }}
                />
              )}
            />
            <OutlinedInput
              placeholder="Site Maintenance Mode Message"
              {...register("site_maintenance_message")}
              fullWidth
              multiline
              error={errors.site_maintenance_message}
            />
            <Typography variant="body1" color="error">
              {errors.site_maintenance_message?.message}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            style={{ flexGrow: 1 }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <Controller
              name="referral_enabled"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!value}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  }
                  label="Referral Enabled"
                  sx={{ whiteSpace: "nowrap" }}
                />
              )}
            />
            <OutlinedInput
              placeholder="Referral Description"
              {...register("referral_program_description")}
              fullWidth
              multiline
              error={errors.referral_program_description}
            />
            <Typography variant="body1" color="error">
              {errors.referral_program_description?.message}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
