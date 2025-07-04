import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const submit = async (data) => {
        if (!userData || !userData.$id) {
            setError("You must be logged in to create a post.");
            return;
        }
        
        setError("");
        setLoading(true);
        
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    setError("Failed to update post. Please try again.");
                }
            } else {
                if (!data.image || !data.image[0]) {
                    setError("Please select an image for your post.");
                    return;
                }
                
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    
                    const dbPost = await appwriteService.createPost({ 
                        ...data, 
                        userId: userData.$id 
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        setError("Failed to create post. Please try again.");
                    }
                } else {
                    setError("Failed to upload image. Please try again.");
                }
            }
        } catch (error) {
            setError(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="space-y-8">
            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-red-700 font-medium">{error}</span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <Input
                            label="Post Title"
                            placeholder="Enter an engaging title for your post"
                            error={errors.title?.message}
                            {...register("title", { 
                                required: "Title is required",
                                minLength: { value: 3, message: "Title must be at least 3 characters" }
                            })}
                        />
                    </div>
                    
                    {/* Hidden slug field */}
                    <input type="hidden" {...register("slug")} value={watch("title") ? slugTransform(watch("title")) : ''} />
                    
                    <div>
                        <RTE 
                            label="Content" 
                            name="content" 
                            control={control} 
                            defaultValue={getValues("content")} 
                        />
                    </div>
                </div>

                {/* Sidebar Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Settings</h3>
                        
                        <div>
                            <Input
                                label="Featured Image"
                                type="file"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                error={errors.image?.message}
                                {...register("image", { 
                                    required: !post ? "Featured image is required" : false 
                                })}
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Upload a high-quality image to make your post stand out
                            </p>
                        </div>
                        
                        {post && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Current Image</label>
                                <div className="rounded-lg overflow-hidden border border-gray-200">
                                    <img
                                        src={appwriteService.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                            </div>
                        )}
                        
                        <div>
                            <Select
                                options={["active", "inactive"]}
                                label="Publication Status"
                                error={errors.status?.message}
                                {...register("status", { required: "Status is required" })}
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Active posts are visible to all users
                            </p>
                        </div>
                        
                        <Button 
                            type="submit" 
                            className="w-full py-3"
                            disabled={loading}
                            variant={post ? "success" : "primary"}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="spinner w-5 h-5 mr-2"></div>
                                    {post ? "Updating..." : "Publishing..."}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={post ? "M5 13l4 4L19 7" : "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"} />
                                    </svg>
                                    {post ? "Update Post" : "Publish Post"}
                                </div>
                            )}
                        </Button>
                    </div>

                    {/* Writing Tips */}
                    <div className="bg-blue-50 rounded-xl p-6">
                        <h4 className="font-semibold text-blue-900 mb-3">Writing Tips</h4>
                        <ul className="text-sm text-blue-800 space-y-2">
                            <li>• Keep your title clear and engaging</li>
                            <li>• Use high-quality, relevant images</li>
                            <li>• Write in a conversational tone</li>
                            <li>• Break up text with headings and lists</li>
                            <li>• Proofread before publishing</li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
}