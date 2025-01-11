import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNotificationStore } from "@/lib/store/notifications-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTeamMember } from "@/app/actions/teams";
import { TeamMember } from "@/lib/types/team";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";
import { uploadFile } from "@/app/actions/file";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

const ImageUploadPreview = ({
  imagePreview,
  onImageChange,
  onRemoveImage,
}: {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        {imagePreview ? (
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={imagePreview}
                alt="Preview"
                className="object-cover"
              />
              <AvatarFallback>
                <ImagePlus className="h-10 w-10 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={onRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <label
              htmlFor="picture"
              className="relative flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/25 bg-muted/25 hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Upload
                  </span>
                </div>
              </div>
              <input
                id="picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageChange}
              />
            </label>
            <span className="text-xs text-muted-foreground">
              JPG, PNG or WebP (max. 5MB)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const formSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  description: z.string().min(1, "Description is required"),
  linkedin: z.string().url("Must be a valid LinkedIn URL").optional(),
  image: z.any(),
});

interface AddTeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMember | null;
}

export default function AddTeamMemberDialog({
  open,
  member,
  onOpenChange,
}: AddTeamMemberDialogProps) {
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const [imagePreview, setImagePreview] = useState<string | null>(
    member?.image || null
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const defaultValues = {
    id: member?.id || "",
    name: member?.name || "",
    email: member?.email || "",
    role: member?.role || "",
    description: member?.description || "",
    linkedin: member?.linkedin || "",
    status: member?.status || "Active",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
      setImagePreview(member?.image || null);
    }
  }, [open, member]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        form.setError("image", {
          type: "manual",
          message: "Image size must be less than 5MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setUploadedFile(file);

        form.clearErrors("image");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setUploadedFile(null);
    form.setValue("image", null);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form values:", values);
    try {
      setIsUploading(true);
      let imageUrl = member?.image; // Keep existing image URL if no new upload

      // Upload new image if one was selected
      if (uploadedFile) {
        imageUrl = await uploadFile(uploadedFile, "teams");
        if (!imageUrl) {
          throw new Error("Failed to upload image");
        }
      }
      console.log("Image URL:", imageUrl);
      const {id, ...data} = values
      const payload = id ? {id, ...data} : data
      await createTeamMember({
       ...payload,
        image: imageUrl,
      } as TeamMember);

      addNotification({
        title: "Success",
        message: member
          ? "Team member updated successfully"
          : "Team member added successfully",
        type: "success",
      });
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      addNotification({
        title: "Error",
        message: member
          ? "Failed to update team member"
          : "Failed to add team member",
        type: "error",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{member ? "Edit" : "Add"} Team Member</DialogTitle>
        </DialogHeader>
        <ScrollArea >

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload Section */}
            <ImageUploadPreview
              imagePreview={imagePreview}
              onImageChange={handleImageChange}
              onRemoveImage={handleRemoveImage}
            />

            {/* Rest of the form fields remain the same */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter team member name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter team member description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="LinkedIn profile URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : member ? (
                "Save Changes"
              ) : (
                "Add Team Member"
              )}
            </Button>
          </form>
        </Form>
        </ScrollArea>

      </DialogContent>
    </Dialog>
  );
}
